<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::latest()->paginate(5);
        return inertia('Posts/Home', ['posts' => $posts]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Posts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        sleep(2);
        /* with StorePostRequest automatically returns errors without calling it */
        $post = Post::create($request->validated()); /* $request->validated() - this is called only to return all the fields that validated then save it */

        return redirect()->route('posts.index')
            ->with('status', 'Post created successfully!')
            ->with('post', $post);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        // dd($post);
        if (request()->wantsJson()) {
            return response()->json(['post' => $post]);
        }
        
        return inertia('Posts/Home', [
            'post' => $post,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return redirect('/posts')->with('response', [
            'error' => false,
            'message' => 'Post deleted successfully!'
        ]);
    }
}
