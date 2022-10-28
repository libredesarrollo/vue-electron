import { createRouter, createWebHistory } from "vue-router";

import ListComponent from "./pages/ListComponent"
import ContactComponent from "./pages/ContactComponent"
import RegisterComponent from "./pages/user/RegisterComponent"
import LoginComponent from "./pages/user/LoginComponent"

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
    history: createWebHistory(),
    routes:routes
})

export default router