import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// 导入管理员和用户的组件
import ManagerIndexView from "@/views/manager/ManagerIndexView.vue";
import ManagerListView from "@/views/manager/ManagerListView.vue";
import UserListView from "@/views/user/UserListView.vue";

// 导入轮播图管理相关组件
import BannerIndexView from '@/views/banner/BannerIndexView.vue';
import BannerListView from '@/views/banner/BannerListView.vue';
import AddBannerView from '@/views/banner/AddBannerView.vue';

// 路由规则配置
export const routes=[
  {
    path: '/',
    name: 'home',
    label:'首页',
    component: HomeView,
    // 路由嵌套，配置二级路由
    children:[
      {
        path:'manager',//不用加‘/’，他会自动加上
        name:'manager',
        label:'账号管理',
        component:ManagerIndexView,
        // 配置三级路由
        children:[
          {
            path:'managerlist',
            name:'managerlist',
            label:'管理员列表',
            component:ManagerListView,
          },
          {
            path:'userlist',
            name:'userlist',
            label:'用户列表',
            component:UserListView,
          }
        ]
      },
      {
        path:'banner',
        neme:'banner',
        label:'轮播图管理',
        component:BannerIndexView,
        children:[
          {
            path:'bannerlist',
            name:'bannerlist',
            label:'轮播图列表',
            component:BannerListView,
          },
          {
            path:'addbanner',
            name:'addbanner',
            label:'添加轮播图',
            component:AddBannerView,
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/LoginView.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
