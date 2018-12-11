<?php

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

// регистрируем канал и возвращаем текущего пользователя
Broadcast::channel('chat', function ($user) {
	return $user;
}); 