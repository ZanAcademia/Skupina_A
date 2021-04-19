import {createRouter, createWebHistory} from 'vue-router'
import Igre from '@/components/igre.vue'
import Registracija from '@/components/registracija.vue'

const routes = [
    { path: '/', component: Igre, name:'home' },
    { path: '/registracija', component: Registracija },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router