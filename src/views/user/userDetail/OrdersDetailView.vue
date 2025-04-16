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
            <h3>订单信息</h3>
            <el-table :data="paginatedOrders" style="width: 100%">
              <el-table-column prop="orderId" label="订单ID"></el-table-column>
              <el-table-column prop="productId" label="产品ID"></el-table-column>
              <el-table-column prop="serviceType" label="服务类型"></el-table-column>
              <el-table-column prop="registrationTime" label="登记时间"></el-table-column>
              <el-table-column prop="remark" label="备注"></el-table-column>
              <el-table-column prop="orderedTime" label="下单时间"></el-table-column>
              <el-table-column prop="payTime" label="支付时间"></el-table-column>
              <el-table-column prop="orderStatus" label="订单状态"></el-table-column>
              <el-table-column prop="paymentMethod" label="支付方式"></el-table-column>
              <el-table-column prop="totalAmount" label="总金额"></el-table-column>
              <el-table-column prop="orderSource" label="订单来源"></el-table-column>
              <el-table-column prop="createdAt" label="创建时间"></el-table-column>
              <el-table-column prop="updatedAt" label="更新时间"></el-table-column>
              <el-table-column prop="appointmentId" label="预约ID"></el-table-column>
              <el-table-column prop="address" label="地址"></el-table-column>
              <el-table-column prop="appointmentTime" label="预约时间"></el-table-column>
              <el-table-column prop="serviceDuration" label="服务时长"></el-table-column>
            </el-table>
            <!-- 订单分页组件 -->
            <el-pagination
              @size-change="handleOrderSizeChange"
              @current-change="handleOrderCurrentChange"
              :current-page="orderCurrentPage"
              :page-sizes="[2, 5, 10]"
              :page-size="orderPageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="orders.length">
            </el-pagination>

            <h3>产品信息</h3>
            <el-table :data="paginatedProducts" style="width: 100%">
              <el-table-column prop="productId" label="产品ID"></el-table-column>
              <el-table-column prop="serviceType" label="服务类型"></el-table-column>
              <el-table-column prop="productName" label="产品名称"></el-table-column>
              <el-table-column prop="category" label="类别"></el-table-column>
              <el-table-column prop="price" label="价格"></el-table-column>
              <el-table-column prop="status" label="状态"></el-table-column>
              <el-table-column prop="lastUpdatedBy" label="最后更新人"></el-table-column>
              <el-table-column prop="lastUpdatedAt" label="最后更新时间"></el-table-column>
              <el-table-column prop="productRemark" label="产品备注"></el-table-column>
              <el-table-column prop="serviceDetails" label="服务详情"></el-table-column>
              <el-table-column prop="sales" label="销量"></el-table-column>
              <el-table-column prop="servicePeople" label="服务人数"></el-table-column>
              <el-table-column prop="serviceDuration" label="服务时长"></el-table-column>
            </el-table>
            <!-- 产品分页组件 -->
            <el-pagination
              @size-change="handleProductSizeChange"
              @current-change="handleProductCurrentChange"
              :current-page="productCurrentPage"
              :page-sizes="[1, 5, 10]"
              :page-size="productPageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="products.length">
            </el-pagination>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getOrderDetail } from '@/api/user';
import { getUserDetail } from '@/api/user';

export default {
  name: 'OrdersDetailView',
  data() {
    return {
      user: {},
      userId: null,
      orders: [],
      products: [],
      activeTab: 'ordersdetail', // 默认个人信息为激活状态
      defaultAvatar: 'https://via.placeholder.com/150',
      // 订单分页相关数据
      orderCurrentPage: 1,
      orderPageSize: 2,
      // 产品分页相关数据
      productCurrentPage: 1,
      productPageSize: 1
    };
  },
  computed: {
    // 计算当前页的订单数据
    paginatedOrders() {
      const start = (this.orderCurrentPage - 1) * this.orderPageSize;
      const end = start + this.orderPageSize;
      return this.orders.slice(start, end);
    },
    // 计算当前页的产品数据
    paginatedProducts() {
      const start = (this.productCurrentPage - 1) * this.productPageSize;
      const end = start + this.productPageSize;
      return this.products.slice(start, end);
    }
  },
  created() {
    this.userId = this.$route.query.userId;
    if (this.userId) {
      this.fetchUserDetail();
      this.fetchOrderDetail();
    } else {
      console.error('未获取到 userId');
      this.$message.error('未获取到用户 ID，无法获取订单信息');
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
    async fetchOrderDetail() {
      try {
        const response = await getOrderDetail(this.userId);
        if (response.code === 200) {
          this.orders = response.data.orders;
          this.products = response.data.products;
        } else {
          this.$message.error('获取订单信息失败');
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
    // 订单分页每页数量变化处理
    handleOrderSizeChange(newSize) {
      this.orderPageSize = newSize;
    },
    // 订单分页当前页码变化处理
    handleOrderCurrentChange(newPage) {
      this.orderCurrentPage = newPage;
    },
    // 产品分页每页数量变化处理
    handleProductSizeChange(newSize) {
      this.productPageSize = newSize;
    },
    // 产品分页当前页码变化处理
    handleProductCurrentChange(newPage) {
      this.productCurrentPage = newPage;
    }
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