
import {createRouter,createWebHistory} from 'vue-router';
// 引入自定義元件
import Home from '../views/Home.vue'

// 啟用 VueRouter 元件
const routes=[
    {
        path:'/',
        name:'Home',
        component:Home,
    },
    {
        path:'/UserLogin',
        name:'UserLogin',
        component:()=>import('../views/UserLogin.vue').catch((err)=>{
            console.error("failed to load",err);
        }),
    },
    {
        path:'/UserRegister',
        name:'UserRegister',
        component:()=>import('../views/UserRegister.vue').catch((err)=>{
            console.error("failed to load",err);
        }),
    },
    {
        path:'/Cart',
        name:'Cart',
        component:()=>import('../views/Cart.vue').catch((err)=>{
            console.error("failed to load",err);
        }),
    },
    {
        path:'/OrderView',
        name:'/OrderView',
        component:()=>import('../views/OrderView.vue').catch((err)=>{
            console.error("failed to load",err);
        }),
    },
    {
        path:'/OrderDetail',
        name:'/OrderDetail',
        component:()=>import('../views/OrderDetail.vue').catch((err)=>{
            console.error("failed to load",err);
        }),
    },
    {
        path:'/SearchProduct',
        name:'/SearchProduct',
        component:()=>import('../views/SearchProduct.vue').catch((err)=>{
            console.error("failed to load",err);
        }),
    },
];
const router=createRouter({
    history: createWebHistory(),
    routes,
});
// 將 router 導出
export default router;