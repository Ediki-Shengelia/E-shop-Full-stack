<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CartResource;
use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'card_id' => 'required|exists:cards,id',
            'quantity' => 'integer|min:1'
        ]);

        $user = $request->user();
        $cardId = $request->card_id;
        $addQuantity = $request->quantity ?? 1;

        $existingCard = $user->cardsInCart()->where('card_id', $cardId)->first();

        if ($existingCard) {
            $newQuantity = $existingCard->pivot->quantity + $addQuantity; // Fixed typo
            $user->cardsInCart()->updateExistingPivot($cardId, [
                'quantity' => $newQuantity
            ]);
        } else {
            $user->cardsInCart()->attach($cardId, ['quantity' => $addQuantity]);
        }

        // Return the full cart with quantities
        $updatedCart = $user->cardsInCart()->withPivot('quantity')->get();

        return response()->json([
            'message' => "Cart updated",
            'total_items_count' => $updatedCart->sum('pivot.quantity'),
            'cart' => CartResource::collection($updatedCart)
        ]);
    }
    public function fetchEverting(Request $request)
    {
        $user = $request->user();
        $items = $user->cardsInCart()->withPivot('quantity')->get();

        return response()->json([
            'total_quantity' => $items->sum('pivot.quantity'), // The total count
            'data' => CartResource::collection($items)         // The actual list
        ]);
    }
    
 
}
