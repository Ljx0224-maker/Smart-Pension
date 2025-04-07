
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// 导入首页组件
import BoardView from "@/views/home/BoardView.vue";
import HomeIndexView from "@/views/home/HomeIndexView.vue";
import WorkTableView from "@/views/home/WorkTableView.vue";

// 导入管理员和用户的组件
import ManagerIndexView from "@/views/manager/ManagerIndexView.vue";
import ManagerListView from "@/views/manager/ManagerListView.vue";
import UserListView from "@/views/manager/UserListView.vue";

// 导入营销管理相关组件
import MarketingIndexView from '@/views/marketing/MarketingIndexView.vue';
import CouponView from '@/views/marketing/CouponView.vue';
import PointsView from '@/views/marketing/PointsView.vue';

// 导入消息管理相关组件
import MessageIndexView from '@/views/message/MessageIndexView.vue';
import ConversationView from '@/views/message/ConversationView.vue';
import MessageView from '@/views/message/MessageView.vue';

// 导入交易相关组件
import OrderIndexView from '@/views/order/OrderIndexView.vue';
import OrderAfterView from '@/views/order/OrderAfterView.vue';
import OrderListView from '@/views/order/OrderListView.vue';
import OrderRefundView from '@/views/order/OrderRefundView.vue';
import OrderSettingView from '@/views/order/OrderSettingView.vue';
import OrderMoneyView from '@/views/order/OrderMoneyView.vue';
import OrderManageIndexView from '@/views/order/OrderManageIndexView.vue';
import SettingsIndexView from '@/views/order/SettingsIndexView.vue';

// 导入运营相关组件
import OperationIndexView from '@/views/operation/OperationIndexView.vue'
import CommentsListView from '@/views/operation/CommentsListView.vue';
import DiseaseListView from '@/views/operation/DiseaseListView.vue'
import DishListView from '@/views/operation/DishListView.vue'
import HealthInfoListView from '@/views/operation/HealthInfoListView.vue'
import InstitutionListVIew from '@/views/operation/InstitutionListVIew.vue'
import MediaListView from '@/views/operation/MediaListView.vue'
import NewsLIstView from '@/views/operation/NewsLIstView.vue'
  // 导入轮播图管理相关组件
import BannerIndexView from '@/views/operation/banner/BannerIndexView.vue';
import BannerListView from '@/views/operation/banner/BannerListView.vue';
import AddBannerView from '@/views/operation/banner/AddBannerView.vue';
  // 导入老年活动相关组件
import EventsIndexView from '@/views/operation/events/EventsIndexView.vue';
import EventsListView from '@/views/operation/events/EventsListView.vue';
import RigisterInfoView from '@/views/operation/events/RigisterInfoView.vue';



// 路由规则配置
export const routes=[
  {
    path: '/',
    name: 'main',
    label:'主页面',
    component: HomeView,
    // 路由嵌套，配置二级路由
    children:[
      {
        path:'home',
        name:'home',
        label:'首页',
        component:HomeIndexView,
        children:[
          {
            path:'board',
            name:'board',
            label:'工作台',
            component:BoardView,
          },
          {
            path:'worktable',
            name:'worktable',
            label:'预约看板',
            component:WorkTableView,
          }
        ]
      },
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
        path:'marketing',
        name:'marketing',
        label:'营销管理',
        component:MarketingIndexView,
        children:[
          {
            path:'couponlist',
            name:'couponlist',
            label:'优惠券',
            component:CouponView,
          },
          {
            path:'points',
            name:'points',
            label:'积分',
            component:PointsView,
          }
        ]
      },
      {
        path:'message',
        name:'message',
        label:'消息管理',
        component:MessageIndexView,
        children:[
          {
            path:'messagesort',
            name:'messagesort',
            label:'消息群发',
            component:MessageView,
          },
          {
            path:'conversation',
            name:'conversation',
            label:'会话',
            component:ConversationView,
          }
        ]
      },
      {
        path:'order',
        name:'order',
        label:'交易管理',
        component:OrderIndexView,
        children:[
          {
            path:'ordermanage',
            name:'ordermanage',
            label:'订单管理',
            component:OrderManageIndexView,
            children:[
              {
                path:'orderlist',
                name:'orderlist',
                label:'订单列表',
                component:OrderListView,
              },
              {
                path:'orderafter',
                name:'orderafter',
                label:'售后状态',
                component:OrderAfterView,
              }
            ]
          },
          {
            path:'settings',
            name:'settings',
            label:'设置',
            component:SettingsIndexView,
            children:[
              {
                path:'oderrefund',
                name:'oderrefund',
                label:'退款原因设置',
                component:OrderRefundView,
              },
              {
                path:'ordersetting',
                name:'ordersetting',
                label:'通用设置',
                component:OrderSettingView,
              }
            ]
          },
          {
            path:'ordermoney',
            name:'ordermoney',
            label:'收支明细',
            component:OrderMoneyView,
          }
        ]
      },
      {
        path:'operation',
        name:'operation',
        label:'运营管理',
        component:OperationIndexView,
        children:[
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
              }
            ]
          },
          {
            path:'events',
            name:'events',
            label:'老年活动',
            component:EventsIndexView,
            children:[
              {
                path:'eventslist',
                name:'eventslist',
                label:'活动管理',
                component:EventsListView,
              },
              {
                path:'rigisterinfo',
                name:'rigisterinfo',
                label:'报名信息管理',
                component:RigisterInfoView,
              }
            ]
          },
          {
            path:'newslist',
            name:'newslist',
            label:'动态管理',
            component:NewsLIstView,
          },
          {
            path:'dishlist',
            name:'dishlist',
            label:'食谱管理',
            component:DishListView,
          },
          {
            path:'healthinfo',
            name:'healthinfo',
            label:'健康资讯管理',
            component:HealthInfoListView,
          },
          {
            path:'diseaselist',
            name:'diseaselist',
            label:'疾病宝典管理',
            component:DiseaseListView,
          },
          {
            path:'institutionlist',
            name:'institutionlist',
            label:'养老机构列表',
            component:InstitutionListVIew,
          },
          {
            path:'medialist',
            name:'medialist',
            label:'视频列表',
            component:MediaListView,
          }
          ,
          {
            path:'commentslist',
            name:'commentslist',
            label:'评论管理',
            component:CommentsListView,
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
