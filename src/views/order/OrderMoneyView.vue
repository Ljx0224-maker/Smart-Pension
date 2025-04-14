<template>
  <div class="money-details-container">
    <div class="filter-section">
      <div class="page-header">
        <h2>收支明细</h2>
      </div>

      <div class="filter-box">
        <div class="filter-row">
          <div class="filter-item">
            <span>收支类型</span>
            <el-select v-model="transactionType" placeholder="请选择" style="width: 200px;">
              <el-option label="全部" value=""></el-option>
              <el-option label="收入" value="收入"></el-option>
              <el-option label="支出" value="支出"></el-option>
            </el-select>
          </div>

          <div class="filter-item">
            <span style="margin-left: 70px;">交易日期</span>
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 300px;"
            ></el-date-picker>
          </div>
        </div>

        <div class="filter-row">
          <div class="filter-item">
            <el-input v-model="searchKeyword" placeholder="请输入关键字" style="width: 300px;"></el-input>
            <el-button type="primary" @click="searchTransactions" style="margin-left: 10px;">
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
     <div class="action-section">
        <div class="action-buttons">
          <el-button @click="batchDelete">批量删除</el-button>
        </div>
      </div>
      <el-table
        :data="filteredTransactions"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="transactionTime" label="交易时间" width="180"></el-table-column>
        <el-table-column prop="orderId" label="交易单号" width="180"></el-table-column>
        <el-table-column prop="transactionType" label="收支类型" width="120">
          <template #default="scope">
            <span :style="{ color: scope.row.transactionType === '收入' ? '#4fc3f7' : '#FFB800' }">
              {{ scope.row.transactionType === '收入' ? '收入' : '支出' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="orderType" label="账单类型" width="120"></el-table-column>
        <el-table-column prop="amount" label="金额（元）" width="120">
          <template #default="scope">
            <span :style="{ color: scope.row.transactionType === '收入' ? '#4fc3f7' : '#FFB800' }">
              {{ scope.row.transactionType === '收入' ? '+' : '-' }}{{ scope.row.amount }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="交易摘要"></el-table-column>
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
import { getTransactionList } from '@/api/order';

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      transactionType: '',
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
    filteredTransactions() {
      return this.tableData.filter(item => {
        // 根据收支类型筛选
        const matchesType = !this.transactionType || item.transactionType === this.transactionType;
  
        // 根据关键字筛选
        const matchesKeyword = !this.searchKeyword || 
          item.orderId.includes(this.searchKeyword) || 
          item.description.includes(this.searchKeyword);

        // 根据交易日期筛选
        const matchesDate = !this.dateRange || (
          new Date(item.transactionTime) >= new Date(this.dateRange[0]) &&
          new Date(item.transactionTime) <= new Date(this.dateRange[1])
        );
  
        return matchesType && matchesKeyword && matchesDate;
      });
    },
  },
  methods: {
    searchTransactions() {
      this.loadTransactions();
    },
    resetSearch() {
      this.transactionType = '';
      this.dateRange = '';
      this.searchKeyword = '';
      this.loadTransactions();
    },
    handleSelectionChange(selection) {
      this.selectedRows = selection;
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.loadTransactions();
    },
    loadTransactions() {
      const params = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        params: {
          transactionType: this.transactionType,
          keyword: this.searchKeyword,
        },
      };

      if (this.dateRange) {
        params.params.startDate = this.dateRange[0];
        params.params.endDate = this.dateRange[1];
      }

      getTransactionList(params).then(res => {
        console.log('获取收支明细数据:', res);
        
        if (res.code === 200) {
          this.tableData = res.data.map(item => ({
            ...item.incomPayent,
            transactionTime: item.orders[0]?.orderer_time || '',
            amount: item.orders[0]?.total_amount || '',
            description: item.productNames.join('、'),
          }));
          this.total = this.tableData.length;
        } else {
          ElMessage.error('获取数据失败');
        }
      });
    },
    batchDelete() {
      if (this.selectedRows.length === 0) {
        ElMessage.warning('请至少选择一条记录');
        return;
      }
    
      this.$confirm('确定要批量删除选中的记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const ids = this.selectedRows.map(row => row.incomeId); // 假设每条记录有 incomeId
        // 调用批量删除接口
        this.deleteTransactions(ids).then(() => {
          ElMessage.success('批量删除成功');
          this.loadTransactions();
        }).catch(() => {
          ElMessage.error('批量删除失败');
        });
      }).catch(() => {
        ElMessage.info('已取消批量删除');
      });
    },
    deleteTransactions(ids) {
      return new Promise((resolve, reject) => {
        // 调用后端批量删除接口
        this.$axios.post('/smartcare/orders/income-payment/batch-delete', { ids })
          .then(response => {
            if (response.data.code === 200) {
              resolve();
            } else {
              reject();
            }
          })
          .catch(() => {
            reject();
          });
      });
    },
  },
  mounted() {
    this.loadTransactions();
  },
};
</script>

<style scoped>
.money-details-container {
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