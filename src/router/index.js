
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// 导入首页组件
import BoardView from "@/views/home/BoardView.vue";
import HomeIndexView from "@/views/home/HomeIndexView.vue";
import WorkTableView from "@/views/home/WorkTableView.vue";

// 用户的组件
import TagView from '@/views/user/TagView.vue';
import UserListView from "@/views/user/UserListView.vue";
import UserIndexView from "@/views/user/UserIndexView.vue";
import AddUserView from "@/views/user/AddUserView.vue";
import AddTagView from "@/views/user/AddTagView.vue";

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
import InstitutionListView from '@/views/operation/InstitutionListView.vue'
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


//导入服务管理
import ServiceIndexView from '@/views/service/ServiceIndexView.vue';
import ServiceListView from '@/views/service/ServiceListView.vue';
import JiaZhengHuLiView from '@/views/service/JiaZhengHuLiView.vue';
import ShangMenTiYanView from '@/views/service/ShangMenTiYanView.vue';
import KangFuLiLiaoView from '@/views/service/KangFuLiLiaoView.vue';
import CategoryManagementIndexView from '@/views/service/CategoryManagementIndexView.vue';
import AddServiceView from '@/views/service/AddServiceView.vue';


//导入服务人员管理
import StaffIndexView from '@/views/staff/StaffIndexView.vue';
import StaffListView from '@/views/staff/StaffListView.vue';
import AddStaffView from '@/views/staff/AddStaffView.vue';

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
          {
            path:'adduser',
            name:'adduser',
            label:'添加用户',
            component:AddUserView,
          },
          {
            path:'addtag',
            name:'addtag',
            label:'添加标签',
            component:AddTagView,
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
            path:'setting',
            name:'setting',
            label:'设置',
            component:SettingsIndexView,
            children:[
              {
                path:'orderrefund',
                name:'orderrefund',
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
            component:InstitutionListView,
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
          },
        ]
      },



      {
        path: 'service',
        name: 'service',
        label: '商品服务管理',
        component: ServiceIndexView,
        children: [
          {
            path: 'servicelist',
            name: 'servicelist',
            label: '全部商品列表',
            component: ServiceListView,
          },
          { 
            path: 'addservice',
            name: 'addservice',
            label: '新增商品信息',
            component: AddServiceView,

          },
          {
            path: 'management',
            name: 'management',
            label: '服务分类管理',
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
          {
            path:'addstaff',
            name:'addstaff',
            label:'新增人员',
            component:AddStaffView,
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
