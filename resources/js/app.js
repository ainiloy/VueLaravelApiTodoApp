import './bootstrap';

import { createApp } from 'vue'

import Todo from './components/Todo.vue'

createApp(Todo)
.mount('#app')
.use(router)
