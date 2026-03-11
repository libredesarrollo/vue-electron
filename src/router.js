import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

import ListComponent from "./pages/ListComponent.vue"
import ContactComponent from "./pages/ContactComponent.vue"
import RegisterComponent from "./pages/user/RegisterComponent.vue"
import LoginComponent from "./pages/user/LoginComponent.vue"

const routes = [
    {
        name:'list',
        path:'/',
        component:ListComponent
    },
    {
        name:'contact',
        path:'/contact',
        component:ContactComponent
    },
    {
        name:'user-register',
        path:'/user/register',
        component:RegisterComponent
    },
    {
        name:'user-login',
        path:'/user/login',
        component:LoginComponent
    }
]

const router = createRouter({
    history: window.require ? createWebHashHistory() : createWebHistory(),
    routes:routes
})

export default router