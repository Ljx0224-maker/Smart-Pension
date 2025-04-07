<script>
import { Avatar,HomeFilled,UserFilled,User } from '@element-plus/icons-vue'
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
        Avatar,
        HomeFilled,
        UserFilled,
        User
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
      <template #title><el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </template>
      <el-menu-item index="/workbench">工作台</el-menu-item> <!-- 新增工作台 -->
      <el-menu-item index="/reservation">预约看板</el-menu-item> <!-- 新增预约看板 -->
    </el-sub-menu>

        <el-sub-menu v-for="item in userInfo.checkedKeys" :key="item.path" :index="item.path">
            <template #title>
            <el-icon>
                <Avatar />
            </el-icon>
            <span>{{inputTagEmits.label}}</span>
            </template>
            <el-menu-item v-for="child in item.children" :key="child.path" :index="`/${item.path}/${child.path}`"><el-icon><UserFilled /></el-icon>{{child.label}}</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="/manager">
            <template #title>
            <el-icon>
                <Avatar />
            </el-icon>
            <span>账号管理</span>
            </template>
            <!--跟路由配置有关-->
            <el-menu-item index="/manager/managerlist"><el-icon><User /></el-icon>管理员列表</el-menu-item>
            <el-menu-item index="/manager/userlist"><el-icon><UserFilled /></el-icon>用户列表</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="/banner">
            <template #title>
            <el-icon>
                <Avatar />
            </el-icon>
            <span>轮播图管理</span>
            </template>
            <!--跟路由配置有关-->
            <el-menu-item index="/banner/bannerlist"><el-icon><User /></el-icon>轮播图列表</el-menu-item>
            <el-menu-item index="/banner/addbanner"><el-icon><UserFilled /></el-icon>添加轮播图</el-menu-item>
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
