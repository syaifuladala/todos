<?php

use App\Models\Todo;

it('can get a list of todos', function () {
    $response = $this->postJson('/api/todo', ['status' => true]);
    $response->assertStatus(200);
});

it('can get a todo detail', function () {
    $todo = Todo::factory()->create();

    $response = $this->getJson("/api/todo/{$todo->id}");

    $response->assertStatus(200);
});

it('can update a todo detail', function () {
    $todo = Todo::factory()->create();

    $response = $this->postJson("/api/todo/update/{$todo->id}", [
        'title' => 'Updated Title',
        'description' => 'Updated Description',
        'status' => false,
    ]);

    $response->assertStatus(200);

    $this->assertDatabaseHas('todos', [
        'id' => $todo->id,
        'title' => 'Updated Title',
        'description' => 'Updated Description',
        'status' => false,
    ]);
});

it('can add a new todo', function () {
    $response = $this->postJson("/api/todo/add", [
        'title' => 'New Todo',
        'description' => 'Description for the new todo',
        'status' => true,
    ]);

    $response->assertStatus(200);
});

it('can delete a todo', function () {
    $todo = Todo::factory()->create();

    $response = $this->deleteJson("/api/todo/{$todo->id}");

    $response->assertStatus(200);

    $this->assertDatabaseMissing('todos', [
        'id' => $todo->id,
    ]);
});
