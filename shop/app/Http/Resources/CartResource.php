<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id, // The ID from the 'carts' table
            'quantity' => $this->pivot->quantity, // Accessing quantity from the pivot table
            // Reuse your CardResource to keep card data consistent
            'card' => new CardResource($this),
            
        ];
    }
}
