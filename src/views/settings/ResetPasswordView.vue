<template>
  <div class="reset-password-view">
    <el-card class="box-card" shadow="hover">
      <div class="page-header">
        <span>重置密码</span>
      </div>
      <el-form :model="passwordForm" label-width="120px">
        <!-- 手动输入员工 ID -->
        <el-form-item label="员工 ID" required>
          <el-input v-model="passwordForm.staff_id" placeholder="请输入员工 ID"></el-input>
        </el-form-item>
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
import { getStaffList, updatePassword } from '@/api/setting';

export default {
  data() {
    return {
      passwordForm: {
        staff_id: '', // 员工ID
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      staffList: [] // 员工列表
    };
  },
  methods: {
    resetPassword() {
  if (!this.passwordForm.staff_id) {
    this.$message.error('请输入员工 ID');
    return;
  }

  const newPassword = this.passwordForm.newPassword;
  if (newPassword.length < 6 || newPassword.length > 20) {
    this.$message.error('密码长度需在6 - 20个字符之间');
    return;
  }

  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasLowerCase = /[a-z]/.test(newPassword);
  const hasNumber = /\d/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

  const conditionCount = [hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar].filter(Boolean).length;
  if (conditionCount < 2) {
    this.$message.error('密码必须包含大小写字母、数字和特殊字符中的两种');
    return;
  }

  if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
    this.$message.error('新密码和确认密码不一致');
    return;
  }

  console.log('Password form:', this.passwordForm);

  // 调用密码重置 API
  updatePassword(
    this.passwordForm.staff_id,   // 员工 ID
    this.passwordForm.oldPassword, // 旧密码
    this.passwordForm.newPassword  // 新密码
  )
    .then(response => {
      if (response.code === 200) {
        console.log('Password reset response:', response);
        this.$message.success('密码修改成功');

        // 更新员工列表中的密码信息
        this.updateStaffListPassword(this.passwordForm.staff_id, this.passwordForm.newPassword);

        // 自动登出并跳转到登录页面
        this.$store.dispatch('logout');
        this.$router.push('/login');
      } else {
        console.error('Password reset failed:', response);
        this.$message.error('密码修改失败: ' + response.message);
      }
    })
    .catch(error => {
      console.error('Password reset error:', error);
      this.$message.error('密码修改失败，请重试');
    });

      console.log('Password form:', this.passwordForm);

      // 调用密码重置 API
      updatePassword(
        this.passwordForm.staff_id,   // 员工 ID
        this.passwordForm.oldPassword, // 旧密码
        this.passwordForm.newPassword  // 新密码
      )
        .then(response => {
          if (response.code === 200) {
            console.log('Password reset response:', response);
            this.$message.success('密码修改成功');

            // 更新员工列表中的密码信息
            this.updateStaffListPassword(this.passwordForm.staff_id, this.passwordForm.newPassword);

            // 自动登出并跳转到登录页面
            this.$store.dispatch('logout');
            this.$router.push('/login');
          } else {
            console.error('Password reset failed:', response);
            this.$message.error('密码修改失败: ' + response.message);
          }
        })
        .catch(error => {
          console.error('Password reset error:', error);
          this.$message.error('密码修改失败，请重试');
        });
    },
    // 更新员工列表中的密码信息
    updateStaffListPassword(staffId, newPassword) {
      // 获取最新的员工列表
      getStaffList()
        .then(response => {
          if (response.code === 200) {
            this.staffList = response.data || [];

            // 查找对应的员工并更新密码
            const staffIndex = this.staffList.findIndex(staff => staff.id === staffId);
            if (staffIndex !== -1) {
              this.staffList[staffIndex].password = newPassword; // 假设员工对象中有 password 字段
              console.log('员工列表已更新:', this.staffList);
            } else {
              console.error('未找到员工 ID:', staffId);
            }
          } else {
            console.error('获取员工列表失败:', response.message);
          }
        })
        .catch(error => {
          console.error('获取员工列表错误:', error);
        });
    }
  }
};
</script>




<style scoped>
/* 样式部分保持不变 */
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