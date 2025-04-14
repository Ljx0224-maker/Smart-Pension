<script>
import { ElMessage } from 'element-plus';
import md5 from 'md5';
import axios from 'axios';
import { loginFn } from '@/api/user';
import { mapState, mapMutations } from 'vuex';
import logo from "../assets/logo.png";
import WorkTableView from '@/views/home/WorkTableView.vue';


export default {
  name: 'LoginView',
  data() {
    return {
      url:logo,
      adminname: '',
      password: '',
    };
  },
  computed: {
    ...mapState(['count']),
  },
  methods: {
    ...mapMutations(['updateUserInfo']),
    submitForm() {
      loginFn({
        adminname: this.adminname,
        password: this.password,
      }).then((res) => {
        console.log(res);
        if (res.code == '10005') {
          ElMessage.error(res.message);
          return;
        } else if (res.code == '10003') {
          ElMessage.error(res.message);
          return;
        } else {
          this.updateUserInfo(res.data);
          localStorage.setItem('token', res.data.token);
          this.$router.push('/home/worktable');
        }
      });
    },
  },
};
</script>

<template>
  <div class="login-container">
    <div class="left-section">
      <h1 style="margin-left: 250px">颐康云护</h1>
      <p style="margin-left: 200px">智慧养老后台管理系统后台端</p>
    </div>
    <div class="right-section">
      <div class="form-wrap">
        <el-image style="width: 100px; height: 100px" :src="url" :fit="fit" />
        <h2>欢迎登录</h2>
        <el-input v-model="adminname" placeholder="请输入用户名" />
        <el-input
          class="psw"
          v-model="password"
          @keyup.enter="submitForm"
          placeholder="请输入密码"
          show-password
        />
        <el-checkbox>我已阅读并同意《用户隐私政策》</el-checkbox>
        <el-button type="primary" round @click="submitForm">登录</el-button>
        <a href="#" class="forgot-password">忘记密码请联系系统管理员</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  height: 100vh;
  background-color: #f5f7fa;

  .left-section {
    flex: 1;
    padding: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background: linear-gradient(to right, #bde5f4, #ffffff);

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
    justify-content: center;
    align-items: center;
    background-color: white;

    .form-wrap {
      width: 360px;
      padding: 32px;
      border-radius: 8px;
      background-color: white;
      text-align: center;

      h2 {
        font-size: 24px;
        color: #333;
        margin-bottom: 20px;
      }

      .el-input {
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
