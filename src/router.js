import {createRouter, createWebHistory} from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import About from '@/components/about.vue'
import Igre from '@/components/igre.vue'
import Igra from '@/components/igra.vue'
import igra_edit from '@/components/igra_edit.vue'
import igra_new from '@/components/igra_new.vue'

const routes = [
    { path: '/', component: HelloWorld, name:'home' },
    { path: '/about', component: About },
    { path: '/igre', component: Igre },
    { path: '/igra', component: Igra },
    { path: '/igra_edit/:id', component: igra_edit, name:'igra_edit', props:true  },
    { path: '/igra_new', component: igra_new, name:'igra_new' },
    { path: '/hello', component: HelloWorld,  name:'hello2' },
    { path: '/hello/:msg', component: HelloWorld,  name:'hello', props:true },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router