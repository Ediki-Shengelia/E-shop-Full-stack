<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Like extends Model
{
    use Notifiable;
    protected $fillable = ['card_id', 'user_id'];
}
