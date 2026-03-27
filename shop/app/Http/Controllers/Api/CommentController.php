<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Models\Card;
use App\Notifications\CommentNotification;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Card $card)
    {
        $data = $request->validate([
            'comment' => 'required'
        ]);
        $comment = $card->comments()->create([
            'comment' => $data['comment'],
            'user_id' => auth()->id()
        ]);
        if ($card->user_id !== auth()->id()) {
            $card->user->notify(new CommentNotification($comment, $card, auth()->user()));
        }
        return new CommentResource($comment->load('user'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
