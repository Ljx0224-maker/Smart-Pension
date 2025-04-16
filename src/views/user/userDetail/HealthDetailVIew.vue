<template>
  <div>
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
                      <div class="demo-type"  style="margin-left: 0px;margin-right: 20px;">
                          <div>
                            <el-avatar> {{ user.nickname }} </el-avatar>
                          </div>
                        </div>
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
            <h3>健康信息</h3>
            <el-form label-width="120px" class="user-info-form">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="年龄">
                    <span>{{ healthRecords.age }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="身高（米）">
                    <span>{{ healthRecords.height }}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="体重（公斤）">
                    <span>{{ healthRecords.weight }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="血型">
                    <span>{{ healthRecords.bloodType }}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="RH阴性">
                    <span>{{ healthRecords.rhFeminine }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="慢性病">
                    <span>{{ healthRecords.chronicDisease }}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="睡眠质量">
                    <span>{{ healthRecords.sleepQuality }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="吸烟频率">
                    <span>{{ healthRecords.smokeFrequency }}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="饮酒频率">
                    <span>{{ healthRecords.drinkFrequency }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="运动频率">
                    <span>{{ healthRecords.sportFrequency }}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="饮食偏好">
                    <span>{{ healthRecords.dietPreference }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="既往病史">
                    <span>{{ healthRecords.pastHistory }}</span>
                  </el-form-item>
                </el-col>
              </el-row>


              <el-row>
                <el-col :span="12">
                  <el-form-item label="家族遗传史">
                    <span>{{ healthRecords.familyHistory }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="过敏史">
                    <span>{{ healthRecords.allergicHistory }}</span>
                  </el-form-item>
                </el-col>
              </el-row>


              <el-row>
                <el-col :span="24">
                  <el-form-item label="就诊史">
                    <span>{{ healthRecords.medicalHistory }}</span>
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
import { getHealthDetail,getUserDetail } from '@/api/user';

export default {
  name: 'HealthDetailVIew',
  data() {
    return {
      user: {},
      userId: null,
      healthRecords: {},
      activeTab: 'healthdetail', 
      defaultAvatar: 'https://via.placeholder.com/150'
    };
  },
  created() {
    this.userId = this.$route.query.userId; // 从路由查询参数中获取 userId
    if (this.userId) {
      this.fetchHealthDetail();
      this.fetchUserDetail(this.userId);
    } else {
      console.error('未获取到 userId');
      this.$message.error('未获取到用户 ID，无法获取健康信息');
      this.activeTab = this.getActiveTab(); // 初始化 activeTab
    }
  },
  methods: {
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
    async fetchHealthDetail() {
        
      try {
        const response = await getHealthDetail(this.userId);
        console.log('接口响应数据:', response); // 打印接口响应信息
        if (response.code === 200 && response.data.health_records.length > 0) {
          this.healthRecords = response.data.health_records[0];
        } else {
          this.$message.error('获取健康信息失败');
        }
      } catch (error) {
        this.$message.error('请求失败，请检查网络');
      }
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