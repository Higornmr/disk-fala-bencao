import { createRouter, createWebHistory } from 'vue-router'
import LayoutDefault from '../layouts/LayoutDefault.vue'
import LayoutEmpty from '../layouts/LayoutEmpty.vue'

const Example = () => import('../views/ExampleView/index.vue')
const Home = () => import('../views/Home/index.vue')

export const routes = [
    {
        path: '/exemplo',
        name: 'example',
        component: Example,
        meta: {
            layout: LayoutDefault
        }
    },
    {
        path: '/',
        name: 'home',
        component: Home,
        redirect: '/exemplo',
        meta: {
            layout: LayoutEmpty
        }
    }
]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export default router

