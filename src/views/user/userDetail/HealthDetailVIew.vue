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
                <el-col :span="24">
                  <el-form-item label="饮食偏好">
                    <span>{{ healthRecords.dietPreference }}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item label="既往病史">
                    <span>{{ healthRecords.pastHistory }}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item label="家族遗传史">
                    <span>{{ healthRecords.familyHistory }}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
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
      this.$router.push({
        path: '/user/userdetails/singledetail',
        query: { userId: this.userId }
      });
    },
    goToHealthDetail() {
      // 当前页面，可根据需求处理
    },
    goToMedicineDetail() {
      this.$router.push({
        path: '/user/userdetails/medicinedetail',
        query: { userId: this.userId }
      });
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