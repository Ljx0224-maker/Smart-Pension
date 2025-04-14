<template>
    <div class="reset-password-view">
      <el-card class="box-card" shadow="hover">
        <div class="page-header">
          <span>重置密码</span>
        </div>
        <el-form :model="passwordForm" label-width="120px">
          <el-form-item label="旧密码" required>
            <el-input v-model="passwordForm.oldPassword" placeholder="请输入" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" required>
            <el-input v-model="passwordForm.newPassword" placeholder="请输入" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" required>
            <el-input v-model="passwordForm.confirmPassword" placeholder="请输入" type="password"></el-input>
          </el-form-item>
        </el-form>
        <div class="button-container">
          <el-button type="primary" @click="resetPassword">保存</el-button>
        </div>
      </el-card>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        passwordForm: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        }
      };
    },
    methods: {
      resetPassword() {
        // 验证新密码和确认密码是否一致
        if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
          this.$message.error('新密码和确认密码不一致');
          return;
        }
        // 调用API进行密码重置
        console.log('Resetting password:', this.passwordForm);
        // 添加您的密码重置逻辑
      }
    }
  };
  </script>
  
  <style scoped>
  .reset-password-view {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
  }
  
  .box-card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  
  .page-header {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }
  
  .page-header::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 24px;
    background-color: #4fc3f7;
    margin-right: 15px;
    border-radius: 2px;
  }
  
  .page-header span {
    font-size: 24px;
    font-weight: bold;
  }
  
  .el-form-item__label {
    font-size: 16px;
  }
  
  .el-input__inner {
    font-size: 16px;
  }
  
  .button-container {
    text-align: left;
    margin-top: 30px;
  }
  
  .el-button {
    font-size: 16px;
    padding: 12px 30px;
  }
  </style>