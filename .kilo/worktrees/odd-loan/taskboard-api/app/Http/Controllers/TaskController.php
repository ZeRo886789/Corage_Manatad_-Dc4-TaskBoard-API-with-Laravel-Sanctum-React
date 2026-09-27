<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Resources\TaskResource;

class TaskController extends Controller
{
    /**
     * Display a listing of the tasks for a project.
     */
    public function index(Request $request, Project $project)
    {
        abort_unless($project->user()->is($request->user()), 403);

        return TaskResource::collection($project->tasks);
    }

    /**
     * Store a newly created task.
     */
    public function store(Request $request, Project $project)
    {
        abort_unless($project->user()->is($request->user()), 403);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'due_date' => 'nullable|date',
        ]);

        $task = $project->tasks()->create($data);

        return (new TaskResource($task))
            ->response()->setStatusCode(201);
    }

    /**
     * Display the specified task.
     */
    public function show(Request $request, Task $task)
    {
        abort_unless($task->project->user()->is($request->user()), 403);

        return new TaskResource($task);
    }

    /**
     * Update the specified task.
     */
    public function update(Request $request, Task $task)
    {
        abort_unless($task->project->user()->is($request->user()), 403);

        $data = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'due_date' => 'nullable|date',
            'is_done' => 'sometimes|boolean',
        ]);

        $task->update($data);

        return new TaskResource($task);
    }

    /**
     * Remove the specified task.
     */
    public function destroy(Request $request, Task $task)
    {
        abort_unless($task->project->user()->is($request->user()), 403);
        $task->delete();
        return response()->noContent(); // 204
    }
}