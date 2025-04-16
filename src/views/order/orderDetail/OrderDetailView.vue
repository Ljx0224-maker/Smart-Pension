<template>
  <div class="order-detail-container">
    <!-- 订单详情标题 -->
    <div class="page-header">
      <h2>订单详情</h2>
    </div>

    <!-- 订单状态 -->
    <div class="order-status">
      <p v-if="orderDetail.orderStatus === '待付款'">
        商品已拍下，等待买家付款。
      </p>
      <p v-else-if="orderDetail.orderStatus === '订单完成'">
        服务结束，订单已完成。
      </p>
      <p v-else-if="orderDetail.orderStatus === '待服务'">
        已接单，等待服务。
      </p>
      <p v-else-if="orderDetail.orderStatus === '退款完成，订单关闭'">
        买家申请退款，退款成功。
      </p>
      <p v-else>
        当前订单状态：{{ orderDetail.orderStatus }}
      </p>
      <p v-if="orderDetail.orderStatus === '待付款'">
        如果买家未在 <span class="countdown">13分04秒</span> 内付款，订单将按自动关闭
      </p>
    </div>

    <!-- 订单基本信息 -->
    <div class="order-info">
      <el-row :gutter="20">
        <el-col :span="12">
          <h3>订单信息</h3>
          <p>订单编号：{{ orderDetail.orderId }}</p>
          <p>下单时间：{{ orderDetail.orderedTime }}</p>
          <p>订单状态：{{ orderDetail.orderStatus }}</p>
          <p>订单来源：{{ orderDetail.orderSource }}</p>
        </el-col>
        <el-col :span="12">
          <h3>预约信息</h3>
          <p>上门地址：{{ orderDetail.address }}</p>
          <p>预约时间：{{ orderDetail.appointmentTime }}</p>
          <p>预约时长：{{ orderDetail.serviceDuration }} 分钟</p>
        </el-col>
      </el-row>
    </div>

    <!-- 用户信息 -->
    <div class="user-info">
      <h3>用户信息<el-button style="margin-left: 20px;" type="text" @click="viewUserDetails">查看详情</el-button></h3>
      <p>姓名：{{ orderDetail.realName }}</p>
      <p>注册时间：{{ orderDetail.registrationTime }}</p>
      <p>备注：{{ orderDetail.remark }}</p>
    </div>

    <!-- 商品信息 -->
    <div class="product-info">
      <h3>商品信息</h3>
      <el-table :data="[orderDetail]" border>
        <el-table-column prop="productName" label="商品信息"></el-table-column>
        <el-table-column prop="price" label="价格" width="120"></el-table-column>
        <el-table-column prop="totalAmount" label="小计" width="120"></el-table-column>
        <el-table-column prop="paymentMethod" label="支付方式" width="120"></el-table-column>
      </el-table>
    </div>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <el-button @click="goBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import { getOrderDetail } from "@/api/order";
import SingleDetailView from '@/views/user/userDetail/SingleDetailView.vue';

export default {
  components: { SingleDetailView },
  data() {
    return {
      orderDetail: {}, // 存储订单详情数据
      selectedUserId:null, // 选中的用户 ID
    };
  },
  methods: {
    // 获取订单详情
    async fetchOrderDetail() {
      const orderId = this.$route.query.orderId; // 获取订单 ID
      try {
        const res = await getOrderDetail(orderId);
        if (res.code === 200) {
          this.orderDetail = res.data[0]; // 接口返回的订单详情
          this.selectedUserId = this.orderDetail.userId; // 动态设置 selectedUserId
        } else {
          this.$message.error("获取订单详情失败");
        }
      } catch (error) {
        console.error("获取订单详情失败:", error);
        this.$message.error("请求失败，请检查网络");
      }
    },
    // 返回上一页
    goBack() {
      this.$router.go(-1);
    },
    // 跳转到用户详情页
    viewUserDetails() {
      if (this.selectedUserId) {
        this.$router.push({
          path: '/user/userdetails/singledetail',
          query: { userId: this.selectedUserId } // 传递 userId 作为查询参数
        });
      } 
    },
  },
  mounted() {
    this.fetchOrderDetail(); // 页面加载时获取订单详情
  },
};
</script>

<style scoped>
.order-detail-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.order-status {
  margin-bottom: 20px;
  color: #666;
}

.order-info,
.user-info,
.product-info {
  margin-bottom: 20px;
}

.action-buttons {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.page-header {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.page-header::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 20px;
  background-color: #4fc3f7;
  margin-right: 10px;
  border-radius: 2px;
}
</style>