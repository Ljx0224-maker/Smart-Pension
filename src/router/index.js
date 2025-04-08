
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// 用户的组件
import TagView from '@/views/user/TagView.vue';
import UserListView from "@/views/user/UserListView.vue";
import UserIndexView from "@/views/user/UserIndexView.vue";

// 导入轮播图管理相关组件
import BannerIndexView from '@/views/banner/BannerIndexView.vue';
import BannerListView from '@/views/banner/BannerListView.vue';
import AddBannerView from '@/views/banner/AddBannerView.vue';

//导入服务管理
import ServiceIndexView from '@/views/service/ServiceIndexView.vue';
import ServiceListView from '@/views/service/ServiceListView.vue';
import JiaZhengHuLiView from '@/views/service/JiaZhengHuLiView.vue';
import ShangMenTiYanView from '@/views/service/ShangMenTiYanView.vue';
import KangFuLiLiaoView from '@/views/service/KangFuLiLiaoView.vue';
import CategoryManagementIndexView from '@/views/service/CategoryManagementIndexView.vue';


//导入工作台&预约看板
import HomeIndexView from '@/views/home/HomeIndexView.vue';
import BoardView from '@/views/home/BoardView.vue';
import WorkTableView from '@/views/home/WorkTableView.vue';

//导入服务人员管理
import StaffIndexView from '@/views/staff/StaffIndexView.vue';
import StaffListView from '@/views/staff/StaffListView.vue';


//导入数据中心DataIndexView
import DataIndexView from '@/views/data/DataIndexView.vue';
import ServiceWorkOrderView from '@/views/data/ServiceWorkOrderView.vue';
import TransactionView from '@/views/data/TransactionView.vue';
import UserView from '@/views/data/UserView.vue';

//导入系统设置
import ProtocolView from '@/views/settings/ProtocolView.vue';
import SettingIndexView from '@/views/settings/SettingIndexView.vue';
import PepoleListView from '@/views/settings/PepoleListView.vue';
// import DataIndexView from '@/views/data/DataIndexView.vue';

// 路由规则配置
export const routes=[
  {
    path: '/',
    name: 'master',
    label:'首页',
    component: HomeView,
    // 路由嵌套，配置二级路由
    
    children:[
      {
      path:'home',//不用加‘/’，他会自动加上
      name:'home',
      label:'首页',
      component:HomeIndexView,
    

       children:[
          {
            path:'boardview',
            name:'boardview',
            label:'预约看板',
            component:WorkTableView,
            },

     {
      path:'worktable',
      name:'worktable',
      label:'工作台',
      component:BoardView,
    }
        ]
      }
    ],
  

    children:[
      {
        
        path:'user',
        name:'user',
        label:'用户管理',
        component:UserIndexView,
        
        children:[
          {
            path:'userlist',
            name:'userlist',
            label:'用户列表',
            component:UserListView,
          },

          {
            path:'usertag',
            name:'usertag',
            label:'用户标签',
            component:TagView,
          },
        ]
      },
      {
        path:'banner',
        name:'banner',
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
          },
        ]
      },



      {
        path: 'service',
        name: 'service',
        label: '服务管理',
        component: ServiceIndexView,
        children: [
          {
            path: 'servicelist',
            name: 'servicelist',
            label: '全部商品列表',
            component: ServiceListView,
          },
          {
            path: 'management',
            name: 'management',
            label: '分类管理',
            component: CategoryManagementIndexView,
            children: [
              {
                path: 'jiazhenghuli',
                name: 'jiazhenghuli',
                label: '家政护理',
                component: JiaZhengHuLiView,
              },
              {
                path: 'kangfuliliao',
                name: 'kangfuliliao',
                label: '康复理疗',
                component: KangFuLiLiaoView,
              },
              {
                path: 'shangmentiyan',
                name: 'shangmentiyan',
                label: '上门体验',
                component: ShangMenTiYanView,
              }
            ]
          }
        ]
      },
      


      {
         
        path:'staff',
        name:'staff',
        label:'服务人员管理',
        component:StaffIndexView,
        children:[
          {
            path:'stafflist',
            name:'stafflist',
            label:'全部服务人员列表',
            component:StaffListView,
          },
        
        ]
      },



      {
        path:'data',
        name:'data',
        label:'数据中心',
        component:DataIndexView,
        children:[
          {
            path:'serviceworkorder',
            name:'serviceworkorder',
            label:'服务工单分析',
            component:ServiceWorkOrderView,
          },
          {
            path:'transaction',
            name:'transaction',
            label:'交易概况',
            component:TransactionView,
            
          },
          {
            path:'users',
            name:'users',
            label:'用户概况',
            component:UserView,
          },
        ]
      },


      
      {
        path:'settings',
        name:'settings',
        label:'系统设置',
        component:SettingIndexView,
        children:[
          {
            path:'pepolelist',
            name:'pepolelist',
            label:'员工管理',
            component:PepoleListView,
          },
          {
            path:'protocol',
            name:'protocol',
            label:'系统设置',
            component:ProtocolView,
          }
        ]
      },

    ],
   
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
