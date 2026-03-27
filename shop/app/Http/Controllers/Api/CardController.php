<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CardRequest;
use App\Http\Resources\CardResource;
use App\Models\Card;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cards = Card::query()->latest()->get();

        return CardResource::collection($cards);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CardRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();
        if ($request->hasFile('card_image')) {
            // Stores in storage/app/public/cards
            $path = $request->file('card_image')->store('cards', 'public');
            $data['card_image'] = $path;
        }

        // 3. Create the record
        $card = Card::create($data);
        return response()->json([
            'message' => 'Card created successfully',
            'data' => new CardResource($card)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Card $card)
    {
        return new CardResource($card->load('comments.user'));
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, Card $card)
    // {
    //     $this->authorize('update', $card);
    //     $data = $request->validate();
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Card $card)
    {
        $this->authorize('delete', $card);
        if ($card->card_image) {
            Storage::disk('public')->delete($card->card_image);
        }
        $card->delete();
        return response()->json([
            'message' => "card deleted successfully"
        ]);
    }
}
