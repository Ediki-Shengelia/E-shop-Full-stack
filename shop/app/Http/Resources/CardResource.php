<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'card_image' => $this->card_image ? asset('storage/' . $this->card_image) : null,
            'description' => $this->description,
            'old_price' => $this->old_price,
            'new_price' => $this->new_price,
            'user_id' => $this->user->id,
        ];
    }
}
