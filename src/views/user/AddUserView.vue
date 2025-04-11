<template>
  <div class="user-form-container">
    <div class="form-title">编辑用户信息</div>
    <el-form :model="userForm" label-width="100px" class="user-form">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="昵称*" required>
            <el-input v-model="userForm.nickname" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-row :gutter="20">
  <el-col :span="12">
    <el-form-item label="用户ID">
      <el-input v-model="userForm.userId" placeholder="自动生成" disabled></el-input>
    </el-form-item>
  </el-col>
</el-row>
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
              <el-option label="未婚" value="single"></el-option>
              <el-option label="已婚" value="married"></el-option>
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
          <el-row :gutter="20">
  <el-col :span="12">
    <el-form-item label="用户名*" required>
      <el-input v-model="userForm.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
  </el-col>
</el-row>
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
import { addUser, getUserDetail } from '@/api/user';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const userForm = ref({
      userId: '', // 新增 userId 字段
      nickname: '',
      username: '',
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
      notes: '',
    });

    // 获取用户详情
    const loadUserDetail = async () => {
      const userId = route.query.userId;
      if (!userId) {
        ElMessage.error('用户ID不存在');
        return;
      }
      try {
        const res = await getUserDetail(userId.toString());
        if (res.code === 200) {
          const data = res.data;
          const emergencyContact = JSON.parse(data.emergencyContact || '[]')[0] || {};
          userForm.value = {
            userId: data.userId, // 赋值 userId
            nickname: data.nickname,
            username: data.username,
            phone: data.phone || '',
            avatar: data.avatar || '',
            realName: data.realName,
            idNumber: data.idNumber || '',
            gender: data.gender,
            birthDate: new Date(data.birthDate),
            address: data.address,
            height: data.height || '',
            weight: data.weight || '',
            origin: data.hometown || '',
            ethnicity: data.ethnicity || '',
            education: data.educationLevel || '',
            maritalStatus: data.maritalStatus,
            occupation: data.occupation || '',
            company: data.company || '',
            emergencyContact: emergencyContact.name || '',
            emergencyPhone: emergencyContact.phone || '',
            status: data.auditStatus === 'approved',
            password: data.password || '',
            notes: data.notes || '',
          };
          console.log('加载的用户数据:', userForm.value); // 调试日志
        } else {
          ElMessage.error('获取用户详情失败: ' + res.message);
        }
      } catch (error) {
        ElMessage.error('获取用户详情失败: ' + error.message);
      }
    };

    // 保存用户
    const saveUser = async () => {
      try {
        console.log('提交的用户数据:', userForm.value); // 调试日志

        if (!userForm.value.maritalStatus) {
          ElMessage.error('婚姻状态不能为空');
          return;
        }

        if (!userForm.value.emergencyContact) {
          ElMessage.error('紧急联系人不能为空');
          return;
        }

        if (!userForm.value.emergencyPhone) {
          ElMessage.error('紧急联系人电话不能为空');
          return;
        }

        // 格式化紧急联系人信息为 JSON 字符串
        userForm.value.emergencyContact = JSON.stringify([
          {
            name: userForm.value.emergencyContact,
            phone: userForm.value.emergencyPhone,
            relation: "朋友",
          },
        ]);

        const res = await addUser(userForm.value); // 提交 userForm，包括 userId
        console.log('保存接口返回:', res); // 调试日志
        if (res.code === 200) {
          router.push('/user/userlist'); // 返回用户列表页面
          ElMessage.success('用户信息保存成功');
        } else {
          ElMessage.error('用户信息保存失败: ' + res.message);
        }
      } catch (error) {
        console.error('保存用户失败:', error);
        ElMessage.error('保存用户失败');
      }
    };

    // 返回按钮
    const resetForm = () => {
      router.push('/user/userlist'); // 返回用户列表页面
    };

    onMounted(() => {
      loadUserDetail();
    });

    return {
      userForm,
      saveUser,
      resetForm,
    };
  },
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