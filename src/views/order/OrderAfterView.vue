<template>
  <div class="order-after-container">
    <div class="filter-section">
      <div class="page-header">
        <h2>售后订单列表</h2>
      </div>

      <div class="filter-box">
        <div class="filter-row">

          <div class="filter-item">
            <span style="margin-left: 0px;">售后状态</span>
            <el-select v-model="refundStatusFilter" placeholder="请选择" style="width: 200px;">
              <el-option label="全部" value=""></el-option>
              <el-option label="待审核" value="待审核"></el-option>
              <el-option label="退款成功" value="退款成功"></el-option>
            </el-select>
          </div>
        </div>

        <div class="filter-row">
          <div class="filter-item">
            <span>申请日期</span>
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 300px;"
            ></el-date-picker>
          </div>

          <div class="filter-item">
            <el-input v-model="searchKeyword" placeholder="请输入关键字" style="width: 300px;"></el-input>
            <el-button type="primary" @click="searchOrders" style="margin-left: 10px;">
              <el-icon><Search/></el-icon>
            </el-button>
            <el-button @click="resetSearch" style="margin-left: 10px;">
              <el-icon><RefreshLeft/></el-icon>
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="action-table-box">
      <el-table
        :data="filteredOrders"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="orderId" label="订单编号"></el-table-column>
        <el-table-column prop="userId" label="用户ID"></el-table-column>
        <el-table-column prop="serviceType" label="服务类型"></el-table-column>
        <el-table-column prop="refundStatus" label="退款状态" width="120">
          <template #default="scope">
            <span :style="{ color: scope.row.transactionType === '待审核' ? '#FFB800' : '#4fc3f7' }">
              {{ scope.row.transactionType === '待审核' ? '待审核' : '退款成功' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="refundAmount" label="退款金额"></el-table-column>
        <el-table-column prop="applicationTime" label="申请时间"></el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="text" @click="viewDetails(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        v-model:current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handlePageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import { Search, RefreshLeft } from '@element-plus/icons-vue';
import { afterSalesList } from '@/api/order';

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      statusFilter: '',
      refundStatusFilter: '',
      dateRange: '',
      searchKeyword: '',
      selectedRows: [],
    };
  },
  components: {
    Search,
    RefreshLeft,
  },
  computed: {
    filteredOrders() {
      return this.tableData.filter(order => {
        if (this.statusFilter && order.orderStatus !== this.statusFilter) {
          return false;
        }
        if (this.refundStatusFilter && order.refundStatus !== this.refundStatusFilter) {
          return false;
        }
        if (this.dateRange && order.applicationTime) {
          const orderDate = new Date(order.applicationTime);
          const startDate = this.dateRange[0];
          const endDate = this.dateRange[1];
          if (orderDate < startDate || orderDate > endDate) {
            return false;
          }
        }
        if (this.searchKeyword && !order.orderId.includes(this.searchKeyword)) {
          return false;
        }
        return true;
      });
    },
  },
  methods: {
    searchOrders() {
      this.loadOrders();
    },
    resetSearch() {
      this.statusFilter = '';
      this.refundStatusFilter = '';
      this.dateRange = '';
      this.searchKeyword = '';
      this.loadOrders();
    },
    handleSelectionChange(selection) {
      this.selectedRows = selection;
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.loadOrders();
    },
    loadOrders() {
      const params = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        params: {
          orderStatus: this.statusFilter,
          refundStatus: this.refundStatusFilter,
          keyword: this.searchKeyword,
        },
      };

      if (this.dateRange) {
        params.params.startDate = this.dateRange[0];
        params.params.endDate = this.dateRange[1];
      }

      afterSalesList(params).then(res => {
        console.log('获取售后订单列表响应:', res); // 打印响应数据
        
        if (res.code === 200) {
          this.tableData = res.data;
          this.total = res.total;
        } else {
          ElMessage.error('获取数据失败');
        }
      });
    },
    viewDetails(row) {
      console.log('查看详情:', row);
      // 可跳转到详情页或弹窗展示详情
    },
  },
  mounted() {
    this.loadOrders();
  },
};
</script>

<style scoped>
.order-after-container {
  padding: 20px;
  background-color: #f5f7fa;
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

.filter-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.filter-box {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filter-row {
  display: flex;
  margin-bottom: 15px;
  align-items: center;
}

.filter-item {
  margin-right: 20px;
  display: flex;
  align-items: center;
}

.filter-item span {
  width: 80px;
  display: inline-block;
}

.action-table-box {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.el-table {
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 15px;
}

.el-pagination {
  text-align: center;
}
</style>