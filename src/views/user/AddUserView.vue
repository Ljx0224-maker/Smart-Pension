<template>
    <div class="user-form-container">
      <div class="form-title">新增用户信息</div>
      <el-form :model="userForm" label-width="100px" class="user-form">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="昵称*" required>
              <el-input v-model="userForm.nickname" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号码*" required>
              <el-input v-model="userForm.phone" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="avatar-column">
            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :on-success="handleAvatarSuccess">
                <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="性别*" required>
              <el-select v-model="userForm.gender" placeholder="请选择">
                <el-option label="男" value="male"></el-option>
                <el-option label="女" value="female"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生日期*" required>
              <el-date-picker v-model="userForm.birthDate" type="date" placeholder="2024-05-20"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="真实姓名*" required>
              <el-input v-model="userForm.realName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号*" required>
              <el-input v-model="userForm.idNumber" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="简介">
              <el-input type="textarea" v-model="userForm.intro" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="家庭住址">
              <el-input v-model="userForm.address" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="身高">
              <el-input v-model="userForm.height" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="体重">
              <el-input v-model="userForm.weight" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="民族">
              <el-select v-model="userForm.ethnicity" placeholder="请选择">
                <!-- Add options as needed -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文化程度">
              <el-select v-model="userForm.education" placeholder="请选择">
                <!-- Add options as needed -->
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="婚姻情况">
              <el-select v-model="userForm.maritalStatus" placeholder="请选择">
                <!-- Add options as needed -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="籍贯">
              <el-input v-model="userForm.origin" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="职业">
              <el-input v-model="userForm.occupation" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作单位">
              <el-input v-model="userForm.company" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="登录密码*" required>
              <el-input type="password" v-model="userForm.password" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-switch v-model="userForm.status"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="紧急联系人">
              <el-input v-model="userForm.emergencyContact" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人电话">
              <el-input v-model="userForm.emergencyPhone" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="userForm.notes" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveUser">保存</el-button>
          <el-button @click="resetForm">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import { addUser } from '@/api/user';
  
  export default {
    data() {
      return {
        userForm: {
          nickname: '',
          phone: '',
          avatar: '',
          realName: '',
          idNumber: '',
          gender: '',
          birthDate: '',
          address: '',
          height: '',
          weight: '',
          origin: '',
          ethnicity: '',
          education: '',
          maritalStatus: '',
          occupation: '',
          company: '',
          emergencyContact: '',
          emergencyPhone: '',
          status: true,
          password: '',
          notes: ''
        }
      };
    },
    methods: {
      async saveUser() {
        try {
          const res = await addUser(this.userForm);
          if (res.success) {
            this.$message.success('用户添加成功');
            this.resetForm();
          } else {
            this.$message.error('用户添加失败');
          }
        } catch (error) {
          console.error('保存用户失败:', error);
          this.$message.error('保存用户失败');
        }
      },
      resetForm() {
        this.userForm = {
          nickname: '',
          phone: '',
          avatar: '',
          realName: '',
          idNumber: '',
          gender: '',
          birthDate: '',
          address: '',
          height: '',
          weight: '',
          origin: '',
          ethnicity: '',
          education: '',
          maritalStatus: '',
          occupation: '',
          company: '',
          emergencyContact: '',
          emergencyPhone: '',
          status: true,
          password: '',
          notes: ''
        };
      }
    }
  };
  </script>
  
  <style scoped>
  .user-form-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 90px;
    background-color: #fff;
    border-radius: 100px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  
  .form-title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    font-family: 'Arial', sans-serif;
  }
  
  .user-form {
    display: flex;
    flex-direction: column;
  }
  
  .avatar-column {
    display: flex;
    justify-content: flex-end;
  }
  
  .avatar-uploader {
    display: inline-block;
    cursor: pointer;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    padding: 20px;
    background-color: #fafafa;
  }
  
  .avatar-uploader:hover {
    border-color: #20a0ff;
  }
  
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  </style>