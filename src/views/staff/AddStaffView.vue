<template>
    <div class="add-staff-view">
      <el-form :model="staffForm" label-width="120px">
        <el-form-item label="姓名" required>
          <el-input v-model="staffForm.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="ID" required>
          <el-input v-model="staffForm.id" placeholder="自动生成" readonly></el-input>
        </el-form-item>
        <el-form-item label="服务类型" required>
          <el-select v-model="staffForm.serviceType" placeholder="请选择">
            <el-option label="家政护工" value="domestic"></el-option>
            <!-- Add more service types as needed -->
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码" required>
          <el-input v-model="staffForm.phone" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="服务区域">
          <el-select v-model="staffForm.region" placeholder="请选择">
            <!-- Add options as needed -->
          </el-select>
        </el-form-item>
      
        <el-form-item label="头像">
          <el-upload
            action="#"
            :on-success="handleAvatarSuccess"
            class="upload-component"
          >
            <el-button  size="small" type="primary">+ 点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="staffForm.description" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="staffForm.idNumber" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号">
          <el-input v-model="staffForm.bankCardNumber" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="开户行">
          <el-input v-model="staffForm.bankBranch" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="staffForm.status"></el-switch>
        </el-form-item>
        <el-form-item label="用户打赏">
          <el-switch v-model="staffForm.userReward"></el-switch>
        </el-form-item>
        <el-form-item label="工作时间">
          <el-checkbox-group v-model="staffForm.workHours">
            <el-checkbox label="早上 9:00-12:00"></el-checkbox>
            <el-checkbox label="下午 14:00-17:00"></el-checkbox>
            <!-- Add more work hours as needed -->
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input
            v-model="staffForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交审核</el-button>
          <el-button @click="resetForm">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import { getStaffDetail, addOrUpdateStaff } from '@/api/staff'; // 假设有获取员工详情的接口

  export default {
    data() {
      return {
        staffForm: {
          name: '',
          id: '',
          serviceType: '',
          phone: '',
          region: '',
          description: '',
          idNumber: '',
          bankCardNumber: '',
          bankBranch: '',
          status: true,
          userReward: false,
          workHours: [],
          password: '', // 添加密码字段
        },
      };
    },
    methods: {
      handleAvatarSuccess(response, file, fileList) {
        // Handle avatar upload success
      },
      submitForm() {
        console.log('Submitting form:', this.staffForm);

        // 转换 status 为数据库支持的值
        const formData = {
          ...this.staffForm,
          status: this.staffForm.status ? '启用' : '禁用', // 转换布尔值为字符串
        };

        // 调用接口提交表单数据
        addOrUpdateStaff(formData).then((res) => {
          if (res.code === 200) {
            this.$message.success('提交成功');
            this.$router.push('/staff/stafflist'); // 跳转到服务人员列表页面
          } else {
            this.$message.error('提交失败: ' + res.message);
          }
        }).catch((err) => {
          console.error('提交失败:', err);
          this.$message.error('提交失败，请稍后重试');
        });
      },
      resetForm() {
        this.$router.push('/staff/stafflist'); // 返回员工列表页面
      },
      async loadStaffDetail() {
        const staffId = this.$route.query.staffId; // 从路由参数中获取 staffId
        if (!staffId) {
          this.$message.error('员工ID不存在');
          return;
        }
        try {
          const res = await getStaffDetail(staffId);
          console.log('接口返回数据:', res); // 打印接口返回的数据
          if (res.code === 200) {
            // 从返回的数组中找到匹配的员工
            const staff = res.data.find((item) => item.staffId === staffId);
            if (staff) {
  this.staffForm = {
    name: staff.name,
    id: staff.staffId,
    serviceType: staff.serviceType,
    phone: staff.phone,
    region: staff.serviceArea,
    description: staff.bio,
    idNumber: staff.sfz,
    bankCardNumber: staff.bankId,
    bankBranch: staff.bankName,
    status: staff.status === '启用', // 转换为布尔值
    userReward: false, // 默认值
    workHours: [], // 默认值
    password: staff.password || '', // 加载密码字段
  };
}else {
              this.$message.error('未找到对应的员工信息');
            }
          } else {
            this.$message.error('获取员工详情失败: ' + res.message);
          }
        } catch (error) {
          console.error('接口调用错误:', error);
          this.$message.error('获取员工详情失败: ' + error.message);
        }
      }
    },
    mounted() {
      this.loadStaffDetail(); // 页面加载时获取员工详情
    }
  };
  </script>
  
  <style scoped>
  .add-staff-view {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  .upload-component .el-upload {
    display: inline-block;
  }
  </style>