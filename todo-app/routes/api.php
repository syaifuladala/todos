<?php

use App\Http\Controllers\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('todo')->group(function() {
    Route::post('', [TodoController::class, 'getTodoList']);
    Route::get('{id}', [TodoController::class, 'getTodoDetail']);
    Route::post('update/{id}', [TodoController::class, 'updateTodoDetail']);
    Route::post('add', [TodoController::class, 'addTodo']);
    Route::delete('{id}', [TodoController::class, 'deleteTodo']);
});
