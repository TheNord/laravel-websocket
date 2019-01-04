# Laravel WebSockets 

https://docs.beyondco.de/laravel-websockets/

## Процесс изменений:

1. Установка пакета
    `composer require beyondcode/laravel-websockets`
2. Извлечение миграций
    `php artisan vendor:publish --provider="BeyondCode\LaravelWebSockets\WebSocketsServiceProvider" --tag="migrations"`
3. Извлечение конфигурации
    `php artisan vendor:publish --provider="BeyondCode\LaravelWebSockets\WebSocketsServiceProvider" --tag="config"`
4. Установка npm 
    `npm install`
5. Установка laravel echo 
    `npm install --save laravel-echo pusher-js`
6. Изменение env
    - BROADCAST_DRIVER=pusher
    - PUSHER_APP_ID=testapp
    - PUSHER_APP_KEY=websocketkey
    - PUSHER_APP_SECRET=somethingsecret
7. Изменение конфигурации:
- config/app: убрать комментарий App\Providers\BroadcastServiceProvider::class
- config/broadcasting:

    'options' => [
        'cluster' => env('PUSHER_APP_CLUSTER'),
        'encrypted' => true,
        'host' => '127.0.0.1',
        'port' => 6001,
        'scheme' => 'http'
     ],
- resources/js/boostrap.js:

    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: process.env.MIX_PUSHER_APP_KEY,
        wsHost: window.location.hostname,
        wsPort: 6001,
        disableStats: true
    });

8. Добавление роутов в route/web
9. Добавление канала в route/channels
10. Создание моделей и миграций Message и User
11. Создание события Enets/MessageSent
12. Создание контроллера ChatsController
13. Добавление внешнего вида chat.blade.php
14. Добавление обработчиков событий resources/js/app.js
15. Добавление стилей для чата
16. Запуск обработки стилей и скриптов npm
    `npm run dev`
17. Запуск сервера отслеживания
    `php artisan websockets:serve`
