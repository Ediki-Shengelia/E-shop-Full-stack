<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    public function cartCards()
    {
        // This allows you to call $user->cartCards
        return $this->belongsToMany(Card::class, 'cart')->withPivot('quantity');
    }
}
