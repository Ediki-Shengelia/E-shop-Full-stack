<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Card;
use App\Notifications\LikeNotification;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function like(Card $card)
    {
        $card->likes()->firstOrCreate([
            'user_id' => auth()->id()
        ]);
      
        // Change this line in your like() function:
        if ($card->user_id != auth()->id()) {
            // REMOVE the () after user
            $card->user->notify(new LikeNotification($card, auth()->user()));
        }
        return response()->json([
            'liked_by_me' => true,
            'likes_count' => $card->likes()->count()
        ]);
    }
    public function unlike(Card $card)
    {
        $card->likes()->where('user_id', auth()->id())->delete();
        return response()->json([
            'liked_by_me' => false,
            'likes_count' => $card->likes()->count()
        ]);
    }
}
