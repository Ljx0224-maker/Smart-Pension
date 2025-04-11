<script>
import { Avatar,House,UserFilled,User,Star,Guide,Collection,DataAnalysis,DocumentCopy,
  Postcard,Tickets,Service,ChatLineRound,ChatDotSquare,Document,Bicycle,CopyDocument,
  CreditCard,ShoppingCart,ShoppingCartFull,ShoppingTrolley,Setting,DataBoard,
  EditPen,Edit,Monitor,VideoPause,VideoCamera,Picture,PictureRounded,DocumentAdd,
  Plus,Reading,Dish,ChatRound,Drizzling,PartlyCloudy,Pointer,Coordinate,CollectionTag,
  Discount,OfficeBuilding,Notification,View,Goods,SoldOut,School,DataLine,PriceTag
} from '@element-plus/icons-vue'
import { mapState } from 'vuex';


export default{
    data() {
        return{

        }
    },
    computed:{
      ...mapState(['currentPath','userInfo'])
    },
    //接收为一个数字
    props:['collapse'],
    components:{
        Avatar,SoldOut,
        House,School,Coordinate,
        UserFilled,
        User,DataBoard,
        Star,Bicycle,
        Postcard,Collection,
        Tickets,DataAnalysis,
        Service,DataLine,
        ChatLineRound,CopyDocument,
        ChatDotSquare,
        Document,PriceTag,
        CreditCard,CollectionTag,
        ShoppingCart,
        ShoppingCartFull,Guide,
        ShoppingTrolley,
        Setting,DocumentAdd,
        Edit,Goods,DocumentCopy,
        EditPen,Monitor,VideoPause,VideoCamera,Picture,PictureRounded,Plus,Reading,Dish,
        ChatRound,Drizzling,PartlyCloudy,Pointer,Discount,OfficeBuilding,Notification,View
    },
    mounted(){
      console.log(this.userInfo);
      
    }
}
</script>


<template>
    <!--menu绑定collapse属性-->
    <el-menu :default-active="currentPath" :collapse="collapse" router
        class="el-menu-vertical-demo">

        <el-sub-menu index="/home">
            <template #title>
            <el-icon>
                <House />
            </el-icon>
            <span>首页</span>
            </template>
            <!--跟路由配置有关-->
            <el-menu-item index="/home/worktable"><el-icon><Notification /></el-icon>工作台</el-menu-item>
            <el-menu-item index="/home/board"><el-icon><View /></el-icon>预约看板</el-menu-item>
        </el-sub-menu>
        

        <!-- <el-sub-menu v-for="item in userInfo.checkedKeys" :key="item.path" :index="item.path">
            <template #title>
            <el-icon>
                <Avatar />
            </el-icon>
            <span>{{inputTagEmits.label}}</span>
            </template>
            <el-menu-item v-for="child in item.children" :key="child.path" :index="`/${item.path}/${child.path}`"><el-icon><UserFilled /></el-icon>{{child.label}}</el-menu-item>
        </el-sub-menu> -->


        <el-sub-menu index="/marketing">
            <template #title>
            <el-icon>
                <Postcard />
            </el-icon>
            <span>营销管理</span>
            </template>
            <!--跟路由配置有关-->
            <el-menu-item index="/marketing/couponlist"><el-icon><Tickets /></el-icon>优惠券</el-menu-item>
            <el-menu-item index="/marketing/points"><el-icon><Star /></el-icon>积分</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="/message">
            <template #title>
            <el-icon>
                <ChatLineRound />
            </el-icon>
            <span>消息管理</span>
            </template>
            <!--跟路由配置有关-->
            <el-menu-item index="/message/messagesort"><el-icon><ChatDotSquare /></el-icon>消息群发</el-menu-item>
            <el-menu-item index="/message/conversation"><el-icon><Service /></el-icon>会话</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="/order">
            <template #title>
            <el-icon>
                <CreditCard />
            </el-icon>
            <span>交易管理</span>
            </template>
            <!--跟路由配置有关-->
            <el-sub-menu index="/order/ordermanage">
              <template #title>
              <el-icon>
                <ShoppingCart />
              </el-icon>
              <span>订单管理</span>
              </template>
              <el-menu-item index="/order/ordermanage/orderlist"><el-icon><ShoppingCartFull /></el-icon>订单列表</el-menu-item>
              <el-menu-item index="/order/ordermanage/orderafter"><el-icon><ShoppingTrolley /></el-icon>售后状态</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="/order/setting">
              <template #title>
              <el-icon>
                <Setting />
              </el-icon>
              <span>设置</span>
              </template>
              <el-menu-item index="/order/setting/orderrefund"><el-icon><Edit /></el-icon>退款原因设置</el-menu-item>
              <el-menu-item index="/order/setting/ordersetting"><el-icon><EditPen /></el-icon>通用设置</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/order/ordermoney"><el-icon><Document /></el-icon>收支明细</el-menu-item>
        </el-sub-menu>


        <el-sub-menu index="/operation">
            <template #title>
            <el-icon>
                <Monitor />
            </el-icon>
            <span>运营管理</span>
            </template>
            <!--跟路由配置有关-->
            <el-sub-menu index="/operation/banner">
              <template #title>
              <el-icon>
                <Picture />
              </el-icon>
              <span>生活圈管理</span>
              </template>
              <el-menu-item index="/operation/social/bannerlist"><el-icon><PictureRounded /></el-icon>轮播图管理</el-menu-item>
              <el-menu-item index="/operation/social/newslist"><el-icon><VideoPause /></el-icon>动态管理</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="/operation/events">
              <template #title>
              <el-icon>
                <Reading />
              </el-icon>
              <span>老年活动</span>
              </template>
              <el-menu-item index="/operation/events/eventslist"><el-icon><Discount /></el-icon>活动管理</el-menu-item>
              <el-menu-item index="/operation/events/rigisterinfo"><el-icon><Pointer /></el-icon>报名信息管理</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/operation/dishlist"><el-icon><Dish /></el-icon>食谱管理</el-menu-item>
            <el-menu-item index="/operation/healthinfo"><el-icon><PartlyCloudy /></el-icon>健康资讯管理</el-menu-item>
            <el-menu-item index="/operation/diseaselist"><el-icon><Drizzling /></el-icon>疾病宝典管理</el-menu-item>
            <el-menu-item index="/operation/institutionlist"><el-icon><OfficeBuilding /></el-icon>养老机构管理</el-menu-item>
            <el-menu-item index="/operation/medialist"><el-icon><VideoCamera /></el-icon>视频管理</el-menu-item>
            <el-menu-item index="/operation/commentslist"><el-icon><ChatRound /></el-icon>评论管理</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="/user">
            <template #title>
            <el-icon>
                <User />
            </el-icon>
            <span>用户管理</span>
            </template>
            <!--跟路由配置有关-->
            <el-menu-item index="/user/userlist"><el-icon><Document /></el-icon>用户列表</el-menu-item>
            <el-menu-item index="/user/usertag"><el-icon><CollectionTag /></el-icon>用户标签</el-menu-item>
            <el-menu-item index="/user/adduser"><el-icon><DocumentAdd /></el-icon>添加用户</el-menu-item>
            <el-menu-item index="/user/addtag"><el-icon><PriceTag /></el-icon>添加标签</el-menu-item>
        </el-sub-menu>


        <el-sub-menu index="/service">
            <template #title>
            <el-icon>
                <Goods />
            </el-icon>
            <span>商品服务管理</span>
            </template>
            <el-menu-item index="/service/servicelist"><el-icon><Guide /></el-icon>分类管理</el-menu-item>
            <el-menu-item index="/service/addservice"><el-icon><Plus /></el-icon>新增商品信息</el-menu-item>
    

            <el-sub-menu index="/service/management">

              <template #title>
      
              <span><el-icon><SoldOut /></el-icon>商品列表</span>
              </template>
            <!--跟路由配置有关-->
        
            <el-menu-item index="/service/management/jiazhenghuli"><el-icon><School /></el-icon>家政护理</el-menu-item>
            <el-menu-item index="/service/management/shangmentiyan"><el-icon><Coordinate /></el-icon>上门体验</el-menu-item>
            <el-menu-item index="/service/management/kangfuliliao"><el-icon><Bicycle /></el-icon>康复理疗</el-menu-item>
        </el-sub-menu></el-sub-menu>

        <el-sub-menu index="/staff">
            <template #title>
            <el-icon>
                <User />
            </el-icon>
            <span>服务人员管理</span>
            </template>
            <!--跟路由配置有关-->
            <el-menu-item index="/staff/stafflist"><el-icon><DocumentCopy /></el-icon>全部服务人员列表</el-menu-item>
            <el-menu-item index="/staff/addstaff"><el-icon><CopyDocument /></el-icon>新增服务人员</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="/data">
            <template #title>
            <el-icon>
                <DataAnalysis />
            </el-icon>
            <span>数据中心</span>
            </template>
            <el-menu-item index="/data/users"><el-icon><User /></el-icon>用户概况</el-menu-item>
            <el-menu-item index="/data/transaction"><el-icon><DataBoard /></el-icon>交易概况</el-menu-item>
            <el-menu-item index="/data/serviceworkorder"><el-icon><DataLine /></el-icon>服务工单分析</el-menu-item>
          </el-sub-menu>

        <el-sub-menu index="/settings">
            <template #title>
            <el-icon>
                <Setting />
            </el-icon>
            <span>系统设置</span>
            </template>
            <!--跟路由配置有关-->
            <el-menu-item index="/settings/pepolelist"><el-icon><User /></el-icon>员工管理</el-menu-item>
            <el-menu-item index="/settings/protocol"><el-icon><Collection /></el-icon>协议管理</el-menu-item>
        </el-sub-menu>



        <!--<el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>-->
      </el-menu>
</template>
