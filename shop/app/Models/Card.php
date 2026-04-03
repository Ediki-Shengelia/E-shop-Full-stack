<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Notifications\Notifiable;

class Card extends Model
{
    use Notifiable;
    protected $fillable = [
        'card_image',
        'title',
        'description',
        'old_price',
        'user_id',
        'new_price'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function likes()
    {
        return $this->hasMany(Like::class);
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function scopeTitle(Builder $query, string $title): Builder|QueryBuilder
    {
        return $query->where('title', 'LIKE', '%' . $title . '%');
    }
}
