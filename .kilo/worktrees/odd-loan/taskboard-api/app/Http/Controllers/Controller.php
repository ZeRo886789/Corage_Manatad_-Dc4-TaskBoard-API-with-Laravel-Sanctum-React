<?php

namespace App\Http\Controllers;
use App\Http\Resources\UserResource;

abstract class Controller
{
	protected function userResource($user): UserResource
	{
		return new UserResource($user);
	}

	protected function userResourceCollection($users)
	{
		return UserResource::collection($users);
	}
}
