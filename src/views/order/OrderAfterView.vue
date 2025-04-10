<template>
    <div class="after-sales-container">
      <div class="filter-section">
        <div class="filter-item">
          <span>退款金额</span>
          <el-input v-model="minRefund" placeholder="最低价格" style="width: 120px;"></el-input>
          <span style="margin: 0 8px;">-</span>
          <el-input v-model="maxRefund" placeholder="最高价格" style="width: 120px;"></el-input>
        </div>
  
        <div class="filter-item">
          <span>申请日期</span>
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
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
          <el-tab-pane label="处理中" name="processing"></el-tab-pane>
          <el-tab-pane label="售后完成" name="completed"></el-tab-pane>
          <el-tab-pane label="售后关闭" name="closed"></el-tab-pane>
        </el-tabs>
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
  
        <el-table-column prop="actualPayment" label="实付款（元）" width="120"></el-table-column>
  
        <el-table-column prop="refundAmount" label="申请退款金额（元）" width="160"></el-table-column>
  
        <el-table-column prop="status" label="售后状态" width="120">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
  
        <el-table-column prop="applyTime" label="售后申请时间" width="200"></el-table-column>
  
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="text" @click="viewAfterSalesDetails(scope.row)">售后详情</el-button>
            <el-button type="text" @click="viewOrderDetails(scope.row)">订单详情</el-button>
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
            afterSalesId: '2400126677',
            productImage: 'https://via.placeholder.com/50',
            productName: '日常清洁',
            productDetails: '2小时1人急速清洁全程质保',
            actualPayment: '300.00',
            refundAmount: '300.00',
            status: 'processing',
            applyTime: '2023-03-21 17:10:43',
          },
          {
            orderId: '2400126670',
            afterSalesId: '2400126677',
            productImage: 'https://via.placeholder.com/50',
            productName: '日常清洁',
            productDetails: '2小时1人急速清洁全程质保',
            actualPayment: '300.00',
            refundAmount: '300.00',
            status: 'completed',
            applyTime: '2023-03-21 17:10:43',
          },
        ],
        currentPage: 1,
        minRefund: '',
        maxRefund: '',
        dateRange: '',
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
  
          // 日期范围过滤
          if (this.dateRange && order.applyTime) {
            const orderDate = new Date(order.applyTime);
            const startDate = this.dateRange[0];
            const endDate = this.dateRange[1];
            if (orderDate < startDate || orderDate > endDate) {
              return false;
            }
          }
  
          // 退款金额范围过滤
          if (this.minRefund && parseFloat(order.refundAmount) < parseFloat(this.minRefund)) {
            return false;
          }
          if (this.maxRefund && parseFloat(order.refundAmount) > parseFloat(this.maxRefund)) {
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
          case 'processing':
            return 'warning';
          case 'closed':
            return 'danger';
          default:
            return '';
        }
      },
      getStatusText(status) {
        switch (status) {
          case 'completed':
            return '售后完成';
          case 'processing':
            return '处理中';
          case 'closed':
            return '售后关闭';
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
        // 搜索功能
      },
      resetFilters() {
        this.minRefund = '';
        this.maxRefund = '';
        this.dateRange = '';
        this.searchKeyword = '';
        this.activeStatus = 'all';
      },
      viewAfterSalesDetails(row) {
        ElMessage.info(`查看售后单 ${row.afterSalesId} 的详情`);
        // 这里可以跳转到售后详情页
      },
      viewOrderDetails(row) {
        ElMessage.info(`查看订单 ${row.orderId} 的详情`);
        // 这里可以跳转到订单详情页
      },
    },
  };
  </script>
  
  <style scoped>
  .after-sales-container {
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