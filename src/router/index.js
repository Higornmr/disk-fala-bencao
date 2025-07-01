import { createRouter, createWebHistory } from 'vue-router'
import LayoutEmpty from '../layouts/LayoutEmpty.vue'

const Home = () => import('../views/Home/index.vue')

export const routes = [

    {
        path: '/',
        name: 'home',
        component: Home,
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

