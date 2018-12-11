<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = ['message'];

    /** Связь сообщения с пользователем */
    public function user()
    {
    	return $this->belongsTo(User::class);
    }
}
