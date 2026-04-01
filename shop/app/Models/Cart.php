<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $fillable = ['user_id', 'card_id', 'quantity'];
    public function cartCards()
    {
        // This allows you to call $user->cartCards
        return $this->belongsToMany(Card::class, 'cart')->withPivot('quantity');
    }
}
