<template>
    <div class="order-container">
      <div class="filter-section">
        <div class="filter-item">
          <span>服务类型</span>
          <el-radio-group v-model="serviceType">
            <el-radio label="家政护工">家政护工</el-radio>
            <el-radio label="康复理疗">康复理疗</el-radio>
            <el-radio label="上门体检">上门体检</el-radio>
          </el-radio-group>
        </div>
  
        <div class="filter-item">
          <span>支付方式</span>
          <el-select v-model="paymentType" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="支付宝" value="支付宝"></el-option>
            <el-option label="微信" value="微信"></el-option>
          </el-select>
        </div>
  
        <div class="filter-item">
          <span>下单日期</span>
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
  
        <div class="filter-item">
          <span>实付金额</span>
          <el-input v-model="minPrice" placeholder="最低价格" style="width: 120px;"></el-input>
          <span style="margin: 0 8px;">-</span>
          <el-input v-model="maxPrice" placeholder="最高价格" style="width: 120px;"></el-input>
        </div>
  
        <div class="filter-item">
          <el-input v-model="searchKeyword" placeholder="请输入关键字"></el-input>
          <el-button type="primary" @click="searchOrders">搜索</el-button>
          <el-button @click="resetFilters">重置</el-button>
        </div>
      </div>
  
      <div class="status-tabs">
        <el-tabs v-model="activeStatus" @tab-click="handleStatusChange">
          <el-tab-pane label="全部" name="all"></el-tab-pane>
          <el-tab-pane label="待付款" name="pending"></el-tab-pane>
          <el-tab-pane label="待接单" name="waiting"></el-tab-pane>
          <el-tab-pane label="待服务" name="processing"></el-tab-pane>
          <el-tab-pane label="已完成" name="completed"></el-tab-pane>
          <el-tab-pane label="退款售后" name="refunded"></el-tab-pane>
          <el-tab-pane label="已关闭" name="closed"></el-tab-pane>
        </el-tabs>
        <el-button type="primary" style="float: right;">批量操作</el-button>
      </div>
  
      <el-table :data="filteredOrders" style="width: 100%">
        <el-table-column prop="productInfo" label="商品信息" width="300">
          <template #default="scope">
            <div style="display: flex; align-items: center;">
              <img :src="scope.row.productImage" alt="商品图片" style="width: 50px; height: 50px; margin-right: 10px;">
              <div>
                <div>{{ scope.row.productName }}</div>
                <div style="font-size: 12px; color: #999;">{{ scope.row.productDetails }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
  
        <el-table-column prop="price" label="价格（元）" width="120"></el-table-column>
  
        <el-table-column prop="buyer" label="买家" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center;">
              <img :src="scope.row.buyerAvatar" alt="买家头像" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px;">
              <div>
                <div>{{ scope.row.buyerName }}</div>
                <div style="font-size: 12px; color: #999;">{{ scope.row.buyerPhone }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
  
        <el-table-column prop="status" label="订单状态" width="120">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
  
        <el-table-column prop="paymentMethod" label="支付方式" width="120"></el-table-column>
  
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="text" @click="viewOrderDetails(scope.row)">订单详情</el-button>
            <el-button type="text" @click="closeOrder(scope.row)">关闭订单</el-button>
            <el-button type="text" @click="assignOrder(scope.row)">手动派单</el-button>
            <el-button type="text" @click="refundOrder(scope.row)">退款</el-button>
            <el-button type="text" @click="contactUser(scope.row)">联系用户</el-button>
            <el-button type="text" @click="addNote(scope.row)">备注</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <el-pagination
        background
        v-model:current-page="currentPage"
        layout="prev, pager, next"
        :total="filteredOrders.length"
        @current-change="handlePageChange"
      ></el-pagination>
    </div>
  </template>
  
  <script>
  import { ElMessage } from 'element-plus';
  
  export default {
    data() {
      return {
        tableData: [
          {
            orderId: '2400126670',
            productImage: 'https://via.placeholder.com/50',
            productName: '日常清洁',
            productDetails: '2小时1人急速清洁全程质保',
            price: '300.00',
            buyerAvatar: 'https://via.placeholder.com/30',
            buyerName: '笑看人生',
            buyerPhone: '19288664488',
            status: 'pending',
            paymentMethod: '-',
            orderTime: '2022-12-09 14:12:07',
          },
          {
            orderId: '2400126670',
            productImage: 'https://via.placeholder.com/50',
            productName: '日常清洁',
            productDetails: '2小时1人急速清洁全程质保',
            price: '300.00',
            buyerAvatar: 'https://via.placeholder.com/30',
            buyerName: '笑看人生',
            buyerPhone: '19288664488',
            status: 'waiting',
            paymentMethod: '支付宝',
            orderTime: '2022-12-09 14:12:07',
          },
        ],
        currentPage: 1,
        serviceType: '家政护工',
        paymentType: '',
        dateRange: '',
        minPrice: '',
        maxPrice: '',
        searchKeyword: '',
        activeStatus: 'all',
      };
    },
    computed: {
      filteredOrders() {
        return this.tableData.filter(order => {
          // 状态过滤
          if (this.activeStatus !== 'all' && order.status !== this.activeStatus) {
            return false;
          }
  
          // 服务类型过滤
          if (this.serviceType && order.serviceType !== this.serviceType) {
            return false;
          }
  
          // 支付方式过滤
          if (this.paymentType && order.paymentMethod !== this.paymentType) {
            return false;
          }
  
          // 日期范围过滤
          if (this.dateRange && order.orderTime) {
            const orderDate = new Date(order.orderTime);
            const startDate = this.dateRange[0];
            const endDate = this.dateRange[1];
            if (orderDate < startDate || orderDate > endDate) {
              return false;
            }
          }
  
          // 价格范围过滤
          if (this.minPrice && parseFloat(order.price) < parseFloat(this.minPrice)) {
            return false;
          }
          if (this.maxPrice && parseFloat(order.price) > parseFloat(this.maxPrice)) {
            return false;
          }
  
          // 关键字过滤
          if (this.searchKeyword && !order.productName.includes(this.searchKeyword)) {
            return false;
          }
  
          return true;
        });
      },
    },
    methods: {
      getStatusType(status) {
        switch (status) {
          case 'completed':
            return 'success';
          case 'waiting':
            return 'warning';
          case 'pending':
          case 'refunded':
          case 'closed':
            return 'danger';
          default:
            return '';
        }
      },
      getStatusText(status) {
        switch (status) {
          case 'completed':
            return '已完成';
          case 'waiting':
            return '待接单';
          case 'pending':
            return '待付款';
          case 'refunded':
            return '退款售后';
          case 'closed':
            return '已关闭';
          default:
            return status;
        }
      },
      handleStatusChange(tab) {
        this.activeStatus = tab.name;
      },
      handlePageChange(page) {
        this.currentPage = page;
      },
      searchOrders() {
        // 搜索结果会自动过滤
      },
      resetFilters() {
        this.serviceType = '家政护工';
        this.paymentType = '';
        this.dateRange = '';
        this.minPrice = '';
        this.maxPrice = '';
        this.searchKeyword = '';
        this.activeStatus = 'all';
      },
      viewOrderDetails(row) {
        ElMessage.info(`查看订单 ${row.orderId} 的详情`);
        // 这里可以跳转到订单详情页
      },
      closeOrder(row) {
        ElMessage.success(`关闭订单 ${row.orderId}`);
        // 这里可以调用关闭订单的 API
      },
      assignOrder(row) {
        ElMessage.success(`手动派单 ${row.orderId}`);
        // 这里可以调用派单的 API
      },
      refundOrder(row) {
        ElMessage.success(`退款订单 ${row.orderId}`);
        // 这里可以调用退款的 API
      },
      contactUser(row) {
        ElMessage.success(`联系用户 ${row.buyerName}`);
        // 这里可以调用联系用户的 API
      },
      addNote(row) {
        ElMessage.success(`添加备注 ${row.orderId}`);
        // 这里可以调用添加备注的 API
      },
    },
  };
  </script>
  
  <style scoped>
  .order-container {
    padding: 20px;
    background-color: #f5f7fa;
  }
  
  .filter-section {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .filter-item {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
  }
  
  .filter-item span {
    width: 80px;
    display: inline-block;
  }
  
  .status-tabs {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .el-tabs {
    width: 100%;
  }
  
  .el-table {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .el-pagination {
    margin-top: 20px;
    text-align: center;
  }
  </style>