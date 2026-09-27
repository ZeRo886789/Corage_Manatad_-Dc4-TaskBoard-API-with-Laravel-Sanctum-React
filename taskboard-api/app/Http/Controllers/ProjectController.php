<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $projectList = $request->user()->projects()
            ->withCount('tasks')
            ->latest()
            ->get();

        return ProjectResource::collection($projectList);
    }

    public function store(Request $request)
    {
        $payload = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'nullable|string',
        ]);

        $project = $request->user()->projects()->create($payload);

        return (new ProjectResource($project))
            ->response()
            ->setStatusCode(201);
    }

    public function show(Request $request, Project $project)
    {
        abort_unless(
            $project->user_id == $request->user()->getAuthIdentifier(),
            403
        );

        return new ProjectResource(
            $project->load(['user', 'tasks'])
        );
    }

    public function update(Request $request, Project $project)
    {
        abort_unless(
            $project->user_id == $request->user()->getAuthIdentifier(),
            403
        );

        $payload = $request->validate([
            'name' => 'sometimes|required|string|max:100',
            'description' => 'nullable|string',
        ]);

        $project->update($payload);

        return new ProjectResource($project);
    }

    public function destroy(Request $request, Project $project)
    {
        abort_unless(
            $project->user_id == $request->user()->getAuthIdentifier(),
            403
        );

        $project->delete();

        return response()->noContent();
    }
}
