<?php

namespace App\Events;

use App\User;
use App\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

     /**
     * Пользователь отправивший сообщение
     *
     * @var \App\User
     */
     public $user;

     /**
     * Детали сообщения
     *
     * @var \App\Message
     */
     public $message;

     /**
     * Получаем данные
     *
     * @return void
     */
     public function __construct(User $user, Message $message)
     {
        $this->user = $user;
        $this->message = $message;
    }

     /**
     * Получаем канал в который будем вести трансляцию
     *
     * @return Channel|array
     */
     public function broadcastOn()
     {
        return new PresenceChannel('chat');
    }
}