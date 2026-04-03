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

            // FIX: Access the column directly to save database performance
            'user_id' => $this->user_id,

            'comments' => CommentResource::collection($this->whenLoaded('comments')),

            // These are correctly mapped from your withCount/withExists in the controller
            'likes_count' => (int) ($this->likes_count ?? 0),
            'liked_by_me' => (bool) ($this->liked_by_me ?? false),
        ];
    }
}
