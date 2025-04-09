
<script>
//在项目中万物皆模块
import logo from "../assets/logo.png";

import {DArrowRight,DArrowLeft} from "@element-plus/icons-vue";
//@代表src
import AsideCom from "@/components/AsideCom.vue";

import BreadCrumbCom from "@/components/BreadCrumbCom.vue";

export default{
  data(){
    return{
      url:logo,
      collapse:false
    }
  },
  mounted(){
    console.log(this.$store.state.userInfo.adminname);
    if(!this.$store.state.userInfo.adminname){
      // 用户没有登录
      this.$router.push('/login')
    }
  },
  computed:{
    headerLeft(){
      return this.collapse ? 'DArrowRight':'DArrowLeft'
    },
    asideWidth(){
      return this.collapse ? '54px':'200px'
    }
  },
  components:{
    DArrowRight,
    DArrowLeft,
    AsideCom,
    BreadCrumbCom
  },
  methods:{
    setCount(){
      console.log(this.$store);
      // .commit是用来执行同步操作用的，也就是用来执行mutations中的方法的
      // this.$store.commit('add')
      // 通过异步来修改数据
      // dispatch是用来执行Actions中的方法
      // this.$store.dispatch('addActions')

      // 同步传参
      // this.$store.commit('addnum',8)

      // 异步传参
      this.$store.dispatch('addnumActions',5)
    },
  logout(){
    localStorage.clear()
    this.$store.commit('updateUserInfo',{})
    this.$router.push('/login')
  }
  }
}
</script>

<template>
  <div class="common-layout">
    <el-container>

      <!--左侧侧边栏-->
      <el-aside>
        <div class="logo-box">
          <el-image style="width:50px;height:auto" :src="url"></el-image>
          <h2 class="manager-title" v-show="!collapse">颐康云护</h2>
        </div>

        <!--使用自定义组件-->
        <!--collapse 用来判断是否收起侧边栏的值-->
        <AsideCom :collapse="collapse"></AsideCom>
        
        </el-aside>


      <!--右侧内容-->
      <el-container>

        <!--头部-->
        <el-header>
          <el-icon size="30" @click="collapse =!collapse">
            <component :is="headerLeft"></component>
          </el-icon>
          
          <span>  {{ $store.state.userInfo.adminname }} <el-button @click="logout" plain>退出</el-button></span>

        </el-header>

        <!--主体内容-->
        <el-main>
          <BreadCrumbCom></BreadCrumbCom>
          <!--{{$store.state.userInfo}}
          <br>
          Main

          {{$store.state.count}}
          <button @click="setCount">修改全局状态的方法</button>-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style lang="scss" scoped>
.el-container{
  background:white;

  .el-aside{
    background:white;
    /*直接将计算属性的值拿过来*/
    width: v-bind(asideWidth);
    transition: all 0.2s;

    .logo-box {
      height: 60px;
      display: flex;
      align-items: center;
      padding: 0 5px;
      box-sizing: border-box;
    }

    .el-image{
      margin-right: 10px;
      margin-left: 15px;
    }

    .manager-title{
      font-size: 20px;
    }
    
  }

}

.el-header{
  background:white;
  display: flex;
  justify-content: space-between;
  height:35px
}
.el-main{
  background:#f7f8fa;
  justify-content: space-between;
  align-items: center;
}
</style>

