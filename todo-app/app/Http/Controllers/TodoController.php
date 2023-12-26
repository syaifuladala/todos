<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use KodePandai\ApiResponse\ApiResponse;

class TodoController extends Controller
{
    public function getTodoList(Request $request)
    {
        try {
            $constant = config('constants');
            $data = new Todo;

            if ($request->status ==  true) {
                $data = $data->where('status', true);
            } else {
                $data = $data->where('status', false);
            }

            if ($request->sort_by != null && $request->sort_type != null) {
                $data = $data->orderBy($constant['sort_by'][$request->sort_by], $constant['sort_type'][$request->sort_type]);
            } else {
                $data = $data->orderBy('updated_at', 'DESC');
            }

            $data = $data->paginate(10);
            return ApiResponse::success($data)->message('Success to get Todo list.');
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function getTodoDetail($id)
    {
        try {
            $isExist = $this->checkDataExist($id);
            if (!$isExist->isSuccess) {
                return $isExist;
            }

            $data = $isExist->data;
            return ApiResponse::success($data)->message('Success to get Todo detail.');
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function updateTodoDetail(Request $request, $id)
    {
        try {
            DB::beginTransaction();
            $validator = $this->validateRequest($request, $id);
            if (!$validator->isSuccess) {
                return $validator;
            }

            $data = Todo::find($id);
            $data->title = $request->title;
            $data->description = $request->description;
            $data->status = $request->status;
            $data->save();

            DB::commit();
            return ApiResponse::success($data)->message('Success to update Todo detail.');
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function addTodo(Request $request)
    {
        try {
            DB::beginTransaction();
            $validator = $this->validateRequest($request, null);
            if (!$validator->isSuccess) {
                return $validator;
            }

            $data = Todo::create([
                'title' => $request->title,
                'description' => $request->description,
                'status' => $request->status,
            ]);

            DB::commit();
            return ApiResponse::success($data)->message('Success to create Todo.');
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function deleteTodo($id)
    {
        try {
            DB::beginTransaction();
            $isExist = $this->checkDataExist($id);
            if (!$isExist->isSuccess) {
                return $isExist;
            }

            Todo::destroy($id);

            DB::commit();
            return ApiResponse::success(['id' => $id])->message('Success to delete Todo.');
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function validateRequest(Request $request, $id): ApiResponse
    {
        if ($id != null) {
            $isExist = $this->checkDataExist($id);
            if (!$isExist->isSuccess) {
                return $isExist;
            }
        }

        $validator = validator()->make($request->all(), [
            'title' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            $message = [];
            foreach ($validator->errors()->getMessages() as $messages) {
                foreach ($messages as $value) {
                    array_push($message, $value);
                }
            }

            return ApiResponse::error()
                ->message(implode("\n", $message))
                ->statusCode(Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return ApiResponse::success();
    }

    public function checkDataExist($id): ApiResponse
    {
        $data = Todo::find($id);
        if (! $data) {
            return ApiResponse::error()
                ->message('Todo doesnt exist.')
                ->data(['id' => $id])
                ->statusCode(Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return ApiResponse::success($data);
    }
}
