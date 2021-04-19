import {createRouter, createWebHistory} from 'vue-router'
import Igre from '@/components/igre.vue'
import Login from '@/components/login.vue'
import Registracija from '@/components/registracija.vue'

const routes = [
    { path: '/', component: Igre, name:'home' },
    { path: '/login', component: Login, name:'login' },
    { path: '/registracija', component: Registracija, name:'register' },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router