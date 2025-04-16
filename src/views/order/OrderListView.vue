<template>
  <router-view></router-view> <!-- 渲染子路由 -->
  <div class="order-container">
    <div class="filter-section">
      <div class="page-header">
        <h2>全部订单</h2>
      </div>

      <div class="filter-box">
        <!-- 筛选条件 -->
        <div class="filter-row">
          <div class="filter-item">
            <span>服务类型</span>
            <el-radio-group v-model="serviceType">
              <el-radio label="家政护理">家政护理</el-radio>
              <el-radio label="康复理疗">康复理疗</el-radio>
              <el-radio label="上门体检">上门体检</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="filter-row">
          <div class="filter-item">
            <span >支付方式</span>
            <el-select v-model="paymentMethod" placeholder="请选择" style="width: 200px;">
              <el-option label="全部" value=""></el-option>
              <el-option label="支付宝" value="支付宝"></el-option>
              <el-option label="微信支付" value="微信支付"></el-option>
              <el-option label="银行卡" value="银行卡"></el-option>
              <el-option label="现金" value="现金"></el-option>
            </el-select>
          </div>
          <div class="filter-item">
            <span style="margin-left:50px;">订单状态</span>
            <el-select v-model="orderStatusFilter" placeholder="请选择订单状态" style="width: 200px;">
              <el-option label="全部" value=""></el-option>
              <el-option label="订单完成" value="订单完成"></el-option>
              <el-option label="退款完成，订单关闭" value="退款完成，订单关闭"></el-option>
              <el-option label="待付款" value="待付款"></el-option>
              <el-option label="待服务" value="待服务"></el-option>
            </el-select>
          </div>

        </div>

        <div class="filter-row">
          <div class="filter-item">
            <span >下单日期</span>
            <el-date-picker
              v-model="orderDateRange"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 300px;"
            ></el-date-picker>
          </div>

        </div>
      </div>
    </div>

    <div class="action-table-box">
      <div class="action-section">
        <div class="action-buttons">
          <el-button @click="batchOperation">批量操作</el-button>
        </div>
      </div>

      <el-table
        :data="filteredOrders"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="productName" label="商品"></el-table-column>
        <el-table-column prop="orderedTime" label="下单时间" width="180">
          <template #default="scope">
            {{ formatDate(scope.row.orderedTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="serviceType" label="服务类型">
          <template #default="scope">
            <el-tag :type="getCategoryType(scope.row.serviceType)">
              {{ scope.row.serviceType }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="totalAmount" label="总金额（元）"></el-table-column>
        <el-table-column prop="realName" label="买家"></el-table-column>
        <el-table-column prop="orderStatus" label="订单状态"></el-table-column>
        <el-table-column prop="paymentMethod" label="支付方式"></el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="text" @click="viewOrderDetails(scope.row)">订单详情</el-button>
            <el-button type="text" @click="deleteOrder(scope.row.orderId)" style="color: #FFB800;">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 翻页栏 -->
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
import { ElMessage, ElMessageBox } from 'element-plus';
import { Search, RefreshLeft } from '@element-plus/icons-vue';
import { getOrders, deleteOrder } from '@/api/order';

export default {
  data() {
    return {
      orders: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      serviceType: '',
      paymentMethod: '',
      orderDateRange: '',
      minPrice: null,
      maxPrice: null,
      searchKeyword: '',
      selectedRows: [],
      orderStatusFilter: '', // 新增订单状态筛选变量
    };
  },
  components: {
    Search,
    RefreshLeft,
  },
  computed: {
    filteredOrders() {
      return this.orders.filter(order => {
        // 筛选服务类型
        if (this.serviceType && order.serviceType !== this.serviceType) {
          return false;
        }

        // 筛选支付方式
        if (this.paymentMethod && order.paymentMethod !== this.paymentMethod) {
          return false;
        }

        // 筛选订单状态
        if (this.orderStatusFilter && order.orderStatus !== this.orderStatusFilter) {
          return false;
        }

        // 筛选日期范围
        if (this.orderDateRange && order.orderedTime) {
          const orderDate = new Date(order.orderedTime);
          const startDate = new Date(this.orderDateRange[0]);
          const endDate = new Date(this.orderDateRange[1]);
          if (orderDate < startDate || orderDate > endDate) {
            return false;
          }
        }

        // 筛选关键字
        if (this.searchKeyword && (!order.realName || !order.realName.includes(this.searchKeyword))) {
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
      this.serviceType = '';
      this.paymentMethod = '';
      this.orderDateRange = '';
      this.minPrice = null;
      this.maxPrice = null;
      this.searchKeyword = '';
      this.orderStatusFilter = ''; // 重置订单状态筛选
      this.loadOrders();
    },
    batchOperation() {
      if (this.selectedRows.length === 0) {
        ElMessage.warning('请至少选择一条记录');
        return;
      }
      // 批量操作逻辑
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
        category: this.category,
        paymentMethod: this.paymentMethod,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        keyword: this.searchKeyword,
        orderStatus: this.orderStatusFilter,
      };
    
      if (this.orderDateRange) {
        params.startDate = this.orderDateRange[0];
        params.endDate = this.orderDateRange[1];
      }
    
      getOrders(params).then(res => {
        console.log('获取订单列表响应:', res); // 打印响应数据
        
        if (res.code === 200) {
          this.orders = res.data; 
          this.total = res.total; // 更新总条数
        } else {
          ElMessage.error('获取订单失败');
        }
      });
    },
    deleteOrder(orderId) {
      ElMessageBox.confirm('确定要删除此订单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteOrder(orderId).then(res => {
            if (res.code === 200) {
              ElMessage.success('删除成功');
              this.loadOrders();
            } else {
              ElMessage.error('删除失败');
            }
          });
        })
        .catch(() => {
          ElMessage.info('已取消删除');
        });
    },
    viewOrderDetails(order) {
    // 跳转到订单详情页面，并传递订单 ID
    this.$router.push({
      path: '/order/ordermanage/orderdetails/orderdetail',
      query: { orderId: order.orderId }, // 通过 query 参数传递订单 ID
    });
  },
    formatDate(date) {
      if (!date) return '';
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.loadOrders(); // 切换页码时重新加载数据
    },
        getCategoryType(category) {
      if (category === '家政护理') {
        return 'success';
      } else if (category === '康复理疗') {
        return 'primary';
      } else if (category === '上门体检') {
        return 'warning';
      } 
      return '';
    },
  },
  mounted() {
    this.loadOrders();
  },
};
</script>

<style scoped>
.order-container {
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

.action-section {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 15px;
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