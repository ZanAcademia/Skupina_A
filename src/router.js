import {createRouter, createWebHistory} from 'vue-router'
import Igre from '@/components/igre.vue'
import Login from '@/components/login.vue'
import Registracija from '@/components/registracija.vue'
import Kosarica from '@/components/kosarica.vue'
import Odjava from '@/components/odjava.vue'

const routes = [
    { path: '/igre', component: Igre },
    { path: '/', component: Igre, name:'home' },
    { path: '/login', component: Login, name:'login' },
    { path: '/registracija', component: Registracija, name:'register' },
    { path: '/kosarica', component: Kosarica, name:'kosarica' },
    { path: '/odjava', component: Odjava, name:'odjava' },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router