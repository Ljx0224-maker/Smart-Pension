<script>
import { ElMessage } from 'element-plus';
import md5 from 'md5';
import { loginFn } from '@/api/user';
import { mapState, mapMutations } from 'vuex';
import logo from "../assets/logo.png";
import logo1 from "../assets/logo1.png";

export default {
  data() {
    return {
      staffId: '', // 用户名
      password: '', // 密码
      url: logo,
      url1: logo1,
    };
  },
  methods: {
    async submitForm() {console.log(this.staffId, md5(this.password));
      if (!this.staffId || !this.password) {
        
        
        ElMessage.error('账号和密码不能为空');
        return;
      }
    
      try {
        const res = await loginFn(this.staffId, this.password); // 确保传递正确的参数
        if (res.code === 200) {
          ElMessage.success(res.message);
          localStorage.setItem('token', res.data.token); // 保存 token
          localStorage.setItem('userInfo', JSON.stringify(res.data)); // 保存用户信息
          this.$store.commit('updateUserInfo', res.data); // 更新 Vuex 的 userInfo
          this.$router.push('/home/worktable'); // 跳转到工作台
        } else {
          ElMessage.error(res.message);
        }
      } catch (error) {
        console.error(error);
        ElMessage.error('登录失败，请稍后重试');
      }
    },
  },
};

</script>

<template>
  <div class="login-container">
    <div class="left-section">
      <h1 style="margin-left: 300px">颐康云护</h1>
      <p style="margin-left: 250px">智慧养老管理系统后台端</p>
      <el-image style="width: 400px; height: auto;margin-left:160px;" :src="url1" :fit="fit" />
    </div>
    <div class="right-section">
      <div class="form-wrap">
        <el-image style="width: 100px; height: auto; margin-left: 125px;" :src="url" :fit="fit" />
        <h2>欢迎登录</h2>
        <el-input v-model="staffId" placeholder="请输入账号" />
        <el-input
          class="psw"
          v-model="password"
          @keyup.enter="submitForm"
          placeholder="请输入密码"
          show-password
        />
        <el-button type="primary" round @click="submitForm" style="margin-top: 20px;">登录</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  height: 100vh;
  background-color: white;

  .left-section {
    flex: 1;
    padding: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background:linear-gradient(to right, #407BFD, #F2F6FF);

    h1 {
      font-size: 28px;
      color: #333;
      margin-bottom: 20px;
    }

    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 40px;
      line-height: 1.5;
    }

    img {
      width: 80%;
      max-width: 400px;
    }
  }

  .right-section {
    flex: 1;
    display: flex;
    
    align-items: center;
    background: linear-gradient(to right, #F2F6FF, #FFFFFF); // 渐变背景
 
    .form-wrap {
      width: 360px;
      padding: 50px;
      border-radius: 25px;
      align-items: center;
      background-color: white;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
 
 
      h2 {
        font-size: 24px;
        color: #333;
        margin-bottom: 20px;
        text-align: center;
 
      }
 
      .el-input {
        margin-top: 10px;
        margin-bottom: 20px;
        width: 100%;
      }
      .psw {
        margin-bottom: 10px;
      }

      .el-checkbox {
        margin-bottom: 20px;
        text-align: left;
        font-size: 14px;
        color: #666;
      }

      .el-button {
        width: 100%;
        margin-bottom: 10px;
        background-color: #4fc3f7;
        border-color: #4fc3f7;
      }

      .forgot-password {
        display: block;
        margin-top: 10px;
        font-size: 14px;
        color: #999;
        text-decoration: none;
      }

      .forgot-password:hover {
        color: #666;
      }
    }
  }
}
</style>
