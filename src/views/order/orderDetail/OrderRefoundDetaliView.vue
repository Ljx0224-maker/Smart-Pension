<template>
  <div class="refund-detail-container">
    <!-- 售后订单详情标题 -->
    <div class="page-header">
      <h2>售后订单详情</h2>
    </div>

    <!-- 售后订单状态 -->
    <div class="refund-status">
      <p v-if="refundDetail.refundStatus === '退款成功'">
        退款已完成，金额已退回至客户账户。
      </p>
      <p v-else-if="refundDetail.refundStatus === '退款处理中'">
        退款申请已提交，正在处理中。
      </p>
      <p v-else>
        当前退款状态：{{ refundDetail.refundStatus }}
      </p>
    </div>

    <!-- 售后订单基本信息 -->
    <div class="refund-info">
      <el-row :gutter="20">
        <el-col :span="12">
          <h3>订单信息</h3>
          <p>订单编号：{{ refundDetail.orderId }}</p>
          <p>商品名称：{{ refundDetail.productName }}</p>
          <p>订单状态：{{ refundDetail.orderStatus }}</p>
          <p>订单来源：{{ refundDetail.orderSource }}</p>
          <p>下单时间：{{ refundDetail.orderedTime }}</p>
        </el-col>
        <el-col :span="12">
          <h3>退款信息</h3>
          <p>退款编号：{{ refundDetail.refundId }}</p>
          <p>退款金额：￥{{ refundDetail.refundAmount }}</p>
          <p>退款原因：{{ refundDetail.refundReason }}</p>
          <p>退款方式：{{ refundDetail.refundMethod }}</p>
          <p>退款备注：{{ refundDetail.refundRemark }}</p>
        </el-col>
      </el-row>
    </div>

    <!-- 用户信息 -->
    <div class="user-info">
      <h3>用户信息</h3>
      <p>姓名：{{ refundDetail.realName }}</p>
      <p>手机号：{{ refundDetail.contactPhone }}</p>
      <p>注册时间：{{ refundDetail.registrationTime }}</p>
      <p>备注：{{ refundDetail.remark }}</p>
    </div>

    <!-- 操作信息 -->
    <div class="operation-info">
      <h3>操作信息</h3>
      <p>申请时间：{{ refundDetail.applicationTime }}</p>
      <p>操作时间：{{ refundDetail.operationTime }}</p>
      <p>操作员：{{ refundDetail.operatorName }}</p>
    </div>

    <!-- 商品信息 -->
    <div class="product-info">
      <h3>商品信息</h3>
      <el-table :data="[refundDetail]" border>
        <el-table-column prop="productName" label="商品名称"></el-table-column>
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
import { afterSalesDetail } from "@/api/order";

export default {
  data() {
    return {
      refundDetail: {}, // 存储售后订单详情数据
    };
  },
  methods: {
    // 获取售后订单详情
    fetchRefundDetail() {
      const orderId = this.$route.query.orderId; // 获取订单 ID
      afterSalesDetail(orderId).then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.refundDetail = res.data[0]; // 接口返回的售后订单详情
        } else {
          this.$message.error("获取售后订单详情失败");
        }
      });
    },
    // 返回上一页
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.fetchRefundDetail(); // 页面加载时获取售后订单详情
  },
};
</script>

<style scoped>
.refund-detail-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.refund-status {
  margin-bottom: 20px;
  color: #666;
}

.refund-info,
.user-info,
.operation-info,
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