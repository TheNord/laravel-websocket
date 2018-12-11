<?php
namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Message;
use Illuminate\Http\Request;

class ChatsController extends Controller
{
	/** Ограничиваем доступ для авторизованных пользователей */
	public function __construct()
	{
		$this->middleware('auth');
	}

	/** Отображаем страницу с чатом */
	public function index()
	{
		return view('chat');
	}

	/** Получаем все сообщения текущего пользователя */
	public function fetchMessages()
	{
		return Message::with('user')->get();
	}

	/** Отправка сообщения в базу и добавление события */
	public function sendMessage(Request $request)
	{
		$message = auth()->user()->messages()->create([
			'message' => $request->message
		]);

		broadcast(new MessageSent(auth()->user(), $message))->toOthers();
		
		return ['status' => 'Message Sent!'];
	}
}