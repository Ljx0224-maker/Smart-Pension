<script>
import { ElMessage } from 'element-plus'
import md5 from "md5";

import axios from 'axios';
// 导入数据请求的方法
import {loginFn} from '@/api/user'

import {mapState,mapMutations} from 'vuex'

export default{
  name:'LoginView',
  //data为什么要写成函数，因为要让每个组件都有自身独立的数据
  data() {
    return{
        adminname:'',
        password:''

    }
  },
  computed:{
    ...mapState(['count'])
  },
  methods:{
    ...mapMutations(['updateUserInfo']),
    //表单验证
    submitForm(){
      /*console.log('被调用了',this.adminname, this.password);

      if(this.adminname.length < 5){
        //长度不够
        ElMessage.error('管理员账号要大于五位')

        //让代码不再执行
        return
      }

      if(!console.log(/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/.test(this.password)))
      ElMessage.error('密码一定要包含数字、大写字母和小写字母')

      console.log(md5('123456'))

      /*axios.get('http://121.89.205.189:3000/api/pro/list')
      .then(res =>{
        console.log(res);
      })
        .catch(err =>{console.log(err);

      })*/

      loginFn({
        adminname:this.adminname,
        password:this.password
      }).then(res => {
        console.log(res);
        if(res.code == '10005'){
          // 未注册
          ElMessage.error(res.message)
          return
        }else if(res.code == '10003'){
          // 密码错误
          ElMessage.error(res.message)
          return
        }else{
          // 存数据，第一种修改数据的方法
          //this.$store.commit('updateUserInfo',res.data)
          // 第二种修改数据的方法
          this.updateUserInfo(res.data)

          //将对应的token存到本地
          localStorage.setItem('token',res.data.token)

          //this.$router 是我们的路由对象
          //.push 需要进入到哪个路由中
          this.$router.push('/')
          //console.log(this.$router);
        }
        })
    }
  }
}
</script>



<template>
  <div class="login-container">

    <div class="form-wrap">
      <h2 class=header>颐康云护</h2>
      <el-input v-model="adminname" placeholder="请输入管理员账号" />
      <el-input class=psw v-model="password" @keyup.enter="submitForm" placeholder="请输入密码" show-password />
      <el-button type="primary" round @click="submitForm">登录</el-button>
    </div>
    

  </div>
</template>

<style lang="scss" scoped>

.login-container{
  height: 100%;
  background-color: #e8eaf6;

  .form-wrap{
    position: absolute;
    left:50%;
    top:50%;
    width:360px;
    transform: translate(-50%,-50%);
    background-color: white;
    border-radius: 15px;
    padding: 32px 32px 20px;
    .header{
      text-align: center;
      margin-bottom: 32px;
    }
    .psw{
      margin-top: 10px;
    }
    .el-button{
      width:100%;
      margin-top: 20px;
    }
  }
}
</style>


