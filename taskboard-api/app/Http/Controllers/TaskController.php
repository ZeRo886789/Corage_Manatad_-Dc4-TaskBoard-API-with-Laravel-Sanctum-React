<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request, Project $project)
    {
        abort_unless(
            $project->user_id == $request->user()->getAuthIdentifier(),
            403
        );

        return TaskResource::collection($project->tasks);
    }

    public function store(Request $request, Project $project)
    {
        abort_unless(
            $project->user_id == $request->user()->getAuthIdentifier(),
            403
        );

        $payload = $request->validate([
            'title' => 'required|string|max:255',
            'due_date' => 'nullable|date',
        ]);

        $task = $project->tasks()->create($payload);

        return (new TaskResource($task))
            ->response()
            ->setStatusCode(201);
    }

    public function show(Request $request, Task $task)
    {
        abort_unless(
            $task->project->user_id == $request->user()->getAuthIdentifier(),
            403
        );

        return new TaskResource($task);
    }

    public function update(Request $request, Task $task)
    {
        abort_unless(
            $task->project->user_id == $request->user()->getAuthIdentifier(),
            403
        );

        $payload = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'due_date' => 'nullable|date',
            'is_done' => 'sometimes|boolean',
        ]);

        $task->update($payload);

        return new TaskResource($task);
    }

    public function destroy(Request $request, Task $task)
    {
        abort_unless(
            $task->project->user_id == $request->user()->getAuthIdentifier(),
            403
        );

        $task->delete();

        return response()->noContent();
    }
}
