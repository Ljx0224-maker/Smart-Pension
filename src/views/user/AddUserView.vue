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
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
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

<script lang="ts" setup>
import { addUser, getUserDetail } from '@/api/user';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import type { UploadProps } from 'element-plus';

const router = useRouter();
const route = useRoute();
const userForm = ref({
  userId: '',
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

const imageUrl = ref('');

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
  userForm.value.avatar = imageUrl.value; // 将图片地址赋值给 userForm
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!');
    return false;
  }
  return true;
};

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
        userId: data.userId,
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
      imageUrl.value = userForm.value.avatar; // 加载用户详情时更新图片预览
      console.log('加载的用户数据:', userForm.value);
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
    console.log('提交的用户数据:', userForm.value);

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

    userForm.value.emergencyContact = JSON.stringify([
      {
        name: userForm.value.emergencyContact,
        phone: userForm.value.emergencyPhone,
        relation: "朋友",
      },
    ]);

    const res = await addUser(userForm.value);
    console.log('保存接口返回:', res);
    if (res.code === 200) {
      router.push('/user/userlist');
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
  router.push('/user/userlist');
};

onMounted(() => {
  loadUserDetail();
});

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

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #ffa94d;
  width: 50px;
  height: 50px;
  text-align: center;
}
</style>