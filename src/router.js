import {createRouter, createWebHistory} from 'vue-router'
import Igre from '@/components/igre.vue'
import Login from '@/components/login.vue'
import Registracija from '@/components/registracija.vue'
import Kosarica from '@/components/kosarica.vue'
import AdminPanel from '@/components/adminPanel.vue'
import Izposoje from '@/components/izposoje.vue'

const routes = [
    { path: '/igre', component: Igre },
    { path: '/', component: Igre, name:'home' },
    { path: '/login', component: Login, name:'login' },
    { path: '/registracija', component: Registracija, name:'register' },
    { path: '/kosarica', component: Kosarica, name:'kosarica' },
    { path: '/adminPanel', component: AdminPanel, name:'adminPanel' },
    {path: '/izposoje', component: Izposoje, name:'izposoje' }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router