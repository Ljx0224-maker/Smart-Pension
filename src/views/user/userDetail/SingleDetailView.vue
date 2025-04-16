<template>
    <div class="user-container">
      <!-- 顶部选择跳转栏 -->
      <div class="section-header">
        <el-button 
            size="large" 
            style="margin-left: 150px;margin-right: 10px;" 
            @click="goToUserDetail"
            :type="activeTab === 'singledetail' ? 'primary' : ''"
            :class="{ 'active-tab': activeTab === 'singledetail' }"
        >个人信息</el-button>
        <el-button 
            size="large" 
            style="margin-left: 40px;margin-right: 10px;" 
            @click="goToHealthDetail"
            :type="activeTab === 'healthdetail' ? 'primary' : ''"
            :class="{ 'active-tab': activeTab === 'healthdetail' }"
        >健康信息</el-button>
        <el-button 
            size="large" 
            style="margin-left: 40px;margin-right: 10px;" 
            @click="goToMedicineDetail"
            :type="activeTab === 'medicinedetail' ? 'primary' : ''"
            :class="{ 'active-tab': activeTab === 'medicinedetail' }"
        >用药信息</el-button>
        <el-button 
            size="large" 
            style="margin-left: 40px;margin-right: 10px;" 
            @click="goToDeviceDetail"
            :type="activeTab === 'devicedetail' ? 'primary' : ''"
            :class="{ 'active-tab': activeTab === 'devicedetail' }"
        >设备信息</el-button>
        <el-button 
            size="large" 
            style="margin-left: 40px;margin-right: 10px;" 
            @click="goToOrderDetail"
            :type="activeTab === 'ordersdetail' ? 'primary' : ''"
            :class="{ 'active-tab': activeTab === 'ordersdetail' }"
        >订单信息</el-button>
        <el-button 
            size="large" 
            style="margin-left: 40px;margin-right: 10px;" 
            @click="goToContentDetail"
            :type="activeTab === 'contentdetail' ? 'primary' : ''"
            :class="{ 'active-tab': activeTab === 'contentdetail' }"
        >内容信息</el-button>
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
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <h3>基础信息</h3>
                <!-- Add an edit button -->
                <el-button type="primary" @click="goToEditUser">编辑信息</el-button>
              </div>
              <el-form label-width="120px" class="user-info-form">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="昵称">
                      <span>{{ user.nickname }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="ID">
                      <span>{{ user.userId }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
  
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="头像">
                      <img :src="user.avatar || defaultAvatar" alt="头像" class="user-avatar-small" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="真实姓名">
                      <span>{{ user.realName }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
  
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="性别">
                      <span>{{ user.gender === 'female' ? '女' : '男' }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="出生日期">
                      <span>{{ user.birthDate }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
  
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="家庭住址">
                      <span>{{ user.address }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
  
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="简介">
                      <span>{{ user.bio }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
  
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="身高">
                      <span>{{ user.height }} cm</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="体重">
                      <span>{{ user.weight }} kg</span>
                    </el-form-item>
                  </el-col>
                </el-row>
  
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="民族">
                      <span>{{ user.ethnicity }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="文化程度">
                      <span>{{ user.educationLevel }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </template>
  
  <script>
  import { getUserDetail } from '@/api/user';
  
  export default {
    name: 'SingleDetailView',
    data() {
      return {
        user: {},
        emergencyContacts: [],
        defaultAvatar: 'https://via.placeholder.com/150',
        activeTab: 'singledetail', // 默认个人信息为激活状态
        userId: this.$route.query.userId, // 从路由获取 userId
      };
    },
    created() {
      const userId = this.$route.query.userId; // 从路由查询参数中获取 userId
      if (userId) {
        this.fetchUserDetail(userId);
      } else {
        this.$message.error('未接收到用户 ID，无法获取详情');
      }
      this.activeTab = this.getActiveTab(); // 初始化 activeTab
    },
    methods: {
      getActiveTab() {
        const path = this.$route.path;
        // 优先判断是否为个人信息页面
        if (path.includes('singledetail')) {
          return 'singledetail';
        } else if (path.includes('healthdetail')) {
          return 'healthdetail';
        } else if (path.includes('medicinedetail')) {
          return 'medicinedetail';
        } else if (path.includes('devicedetail')) {
          return 'devicedetail';
        } else if (path.includes('ordersdetail')) {
          return 'ordersdetail';
        } else if (path.includes('contentdetail')) {
          return 'contentdetail';
        }
        return 'singledetail'; // 默认个人信息
      },
      goToUserDetail() {
        this.activeTab = 'singledetail';
        this.$router.push({
          path: '/user/userdetails/singledetail',
          query: { userId: this.userId },
        });
      },
      goToHealthDetail() {
        this.activeTab = 'healthdetail';
        this.$router.push({
          path: '/user/userdetails/healthdetail',
          query: { userId: this.userId },
        });
      },
      goToMedicineDetail() {
        this.activeTab = 'medicinedetail';
        this.$router.push({
          path: '/user/userdetails/medicinedetail',
          query: { userId: this.userId },
        });
      },
      goToDeviceDetail() {
        this.activeTab = 'devicedetail';
        this.$router.push({
          path: '/user/userdetails/devicedetail',
          query: { userId: this.userId },
        });
      },
      goToOrderDetail() {
        this.activeTab = 'ordersdetail';
        this.$router.push({
          path: '/user/userdetails/ordersdetail',
          query: { userId: this.userId },
        });
      },
      goToContentDetail() {
        this.activeTab = 'contentdetail';
        this.$router.push({
          path: '/user/userdetails/contentdetail',
          query: { userId: this.userId },
        });
      },
      goToEditUser() {
          this.$router.push({
              path: '/user/adduser',
              query: { userId: this.userId },
          });
      },
      async fetchUserDetail(userId) {
        try {
          const response = await getUserDetail(userId);
          console.log('接口响应:', response); // 调试日志
          if (response.code === 200) {
            console.log(response.data);
            this.user = response.data;
            this.emergencyContacts = JSON.parse(response.data.emergencyContact || '[]');
          } else {
            this.$message.error('获取用户详情失败');
          }
        } catch (error) {
          this.$message.error('请求失败，请检查网络');
        }
      },
    },
    watch: {
      '$route'() {
        this.activeTab = this.getActiveTab(); // 路由变化时更新 activeTab
      },
    },
  };
  </script>
  
  <style scoped>
  .active-tab {
    background-color: #4fc3f7;
    color: white;
  }
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