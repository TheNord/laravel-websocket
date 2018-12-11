
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// подключаем все компоненты
const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key)))

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',

    // собираем данные сообщений и пользователей
    data: {
        messages: [],
        users: [],
    },

    created() {
        // обращаемся к методу fetchMessages (получаем сообщения) 
        this.fetchMessages();

        // отслеживаем события - chat
        Echo.join('chat')
            // получить информацию о пользователе для других пользователях подписанных на канал
            .here(users => {
                this.users = users;
            })
            // подключение пользователя к каналу
            .joining(user => {
                this.users.push(user);
            })
            // выход пользователя с канала
            .leaving(user => {
                this.users = this.users.filter(u => u.id !== user.id);
            })
            // прослушивание клиентских событий
            .listenForWhisper('typing', ({id, name}) => {
                this.users.forEach((user, index) => {
                    if (user.id === id) {
                        user.typing = true;
                        this.$set(this.users, index, user);
                    }
                });
            })
            // отслеживание отправки сообщения
            .listen('MessageSent', (e) => {
                // добавляем в массив сообщение и пользователя
                this.messages.push({
                    message: e.message.message,
                    user: e.user
                });
                // проходим циклом по пользователю
                this.users.forEach((user, index) => {
                    if (user.id === e.user.id) {
                        user.typing = false;
                        this.$set(this.users, index, user);
                    }
                });
            });
    },
    // добавляем методы
    methods: {
        // получение сообщений
        fetchMessages() {
            // отправляем get запрос на /message
            axios.get('/messages').then(response => {
                // ответ добавляем в массив сообщений
                this.messages = response.data;
            });
        },
        // добавление нового сообщения
        addMessage(message) {
            // пушим новое сообщение в массив
            this.messages.push(message);
            // отправляем post запрос на /message для добавления в базу
            axios.post('/messages', message).then(response => {
                console.log(response.data);
            });
        }
    }
});