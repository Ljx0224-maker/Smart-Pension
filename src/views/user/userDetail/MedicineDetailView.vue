<template>
  <div>
    <!-- 顶部选择跳转栏 -->
    <div class="section-header">
      <el-button size="large" style="margin-left: 150px;margin-right: 10px;" @click="goToUserDetail">个人信息</el-button>
      <el-button size="large" style="margin-left: 40px;margin-right: 10px;" type="primary" @click="goToHealthDetail">健康信息</el-button>
      <el-button size="large" style="margin-left: 40px;margin-right: 10px;" type="primary" @click="goToMedicineDetail">用药信息</el-button>
      <el-button size="large" style="margin-left: 40px;margin-right: 10px;" type="primary" @click="goToDeviceDetail">设备信息</el-button>
      <el-button size="large" style="margin-left: 40px;margin-right: 10px;" type="primary" @click="goToOrderDetail">订单信息</el-button>
      <el-button size="large" style="margin-left: 40px;margin-right: 10px;" type="primary" @click="goToContentDetail">内容信息</el-button>
    </div>
    <div class="user-detail">
      <el-row :gutter="20">
            <!-- 左侧个人信息 -->
            <el-col :span="6">
                <el-card class="user-card">
                    <div class="user-header">
                        <img :src="user.avatar || defaultAvatar" alt="头像" class="user-avatar" />
                        <div class="user-info">
                            <h2>{{ user.nickname }} <span v-if="user.gender === 'female'">♀</span><span v-else>♂</span></h2>
                            <p>ID: {{ user.userId }}</p>
                        </div>
                    </div>
                    <el-form label-width="75px" class="user-info-form1">
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="真实姓名">
                                        <span>{{ user.realName }}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="手机号">
                                        <span>{{ user.phone }}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="注册时间">
                                        <span>{{ user.registrationTime }}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="最近登录">
                                        <span>{{ user.lastLoginTime }}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="备注">
                                        <span>{{ user.notes }}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                </el-card>
            </el-col>
        <!-- 右侧详细信息 -->
        <el-col :span="18">
          <el-card class="user-detail-card">
            <h3>用药信息</h3>
            <el-table :data="medicationInfo" style="width: 100%">
              <el-table-column prop="medicationId" label="药物ID"></el-table-column>
              <el-table-column prop="medicationName" label="药物名称"></el-table-column>
              <el-table-column prop="category" label="分类（早中晚餐）"></el-table-column>
              <el-table-column prop="dosage" label="计量（片）"></el-table-column>
              <el-table-column prop="unit" label="单位"></el-table-column>
              <el-table-column prop="frequency" label="用药频率"></el-table-column>
              <el-table-column prop="medicationTime" label="用药时间"></el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getMedicineDetail } from '@/api/user';
import { getUserDetail } from '@/api/user';

export default {
  name: 'MedicineDetailView',
  data() {
    return {
      user: {},
      userId: null,
      medicationInfo: [],
      defaultAvatar: 'https://via.placeholder.com/150'
    };
  },
  created() {
    this.userId = this.$route.query.userId;
    if (this.userId) {
      this.fetchUserDetail();
      this.fetchMedicineDetail();
    } else {
      console.error('未获取到 userId');
      this.$message.error('未获取到用户 ID，无法获取用药信息');
    }
  },
  methods: {
    async fetchUserDetail() {
      try {
        const response = await getUserDetail(this.userId);
        if (response.code === 200) {
          this.user = response.data;
        } else {
          this.$message.error('获取用户详情失败');
        }
      } catch (error) {
        this.$message.error('请求失败，请检查网络');
      }
    },
    async fetchMedicineDetail() {
      try {
        const response = await getMedicineDetail(this.userId);
        console.log(response);
        
        if (response.code === 200) {
          this.medicationInfo = response.data['medication-information'];
        } else {
          this.$message.error('获取用药信息失败');
        }
      } catch (error) {
        this.$message.error('请求失败，请检查网络');
      }
    },
    goToUserDetail() {
      this.$router.push({
        path: '/user/userdetails/singledetail',
        query: { userId: this.userId }
      });
    },
    goToHealthDetail() {
      this.$router.push({
        path: '/user/userdetails/healthdetail',
        query: { userId: this.userId }
      });
    },
    goToMedicineDetail() {
      // 当前页面，可根据需求处理
    },
    goToDeviceDetail() {
      this.$router.push({
        path: '/user/userdetails/devicedetail',
        query: { userId: this.userId }
      });
    },
    goToOrderDetail() {
      this.$router.push({
        path: '/user/userdetails/ordersdetail',
        query: { userId: this.userId }
      });
    },
    goToContentDetail() {
      this.$router.push({
        path: '/user/userdetails/contentdetail',
        query: { userId: this.userId }
      });
    }
  }
};
</script>

<style scoped>
/* 定义激活状态下的按钮样式 */
.active {
    background-color: blue;
    color: white;
}
/* 重置非激活状态下的按钮样式 */
.el-button {
    background-color: white;
    color: inherit;
}
h3 {
  margin-top: 0px;
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
}
.user-detail {
    padding: 20px;
    border-radius: 8px;
}
.user-card {
    border-radius: 8px;
    margin-bottom: 20px;
    padding: 20px;
}
.user-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
.user-avatar {
    width: 50px;
    height: auto;
    border-radius: 50%;
    margin-right: 20px;
}
.user-avatar-small {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.user-info h2 {
    margin: 0;
    font-size: 20px;
}
.user-meta p {
    margin: 5px 0;
}
.user-detail-card {
    border-radius: 8px;
    margin-bottom: 20px;
    padding: 20px;
}
.user-info-form {
    font-size: 14px;
}
.section-header {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px; 
}
</style>