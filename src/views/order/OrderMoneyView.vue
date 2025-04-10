<template>
    <div class="money-details-container">
      <div class="filter-section">
        <div class="filter-item">
          <span>收支类型</span>
          <el-select v-model="transactionType" placeholder="请选择" style="width: 200px;">
            <el-option label="全部" value=""></el-option>
            <el-option label="收入" value="income"></el-option>
            <el-option label="支出" value="expense"></el-option>
          </el-select>
        </div>
  
        <div class="filter-item">
          <span>交易日期</span>
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 300px;"
          ></el-date-picker>
        </div>
  
        <div class="filter-item">
          <el-input v-model="searchKeyword" placeholder="请输入关键字" style="width: 300px;"></el-input>
          <el-button type="primary" @click="searchTransactions">
            <el-icon><Search/></el-icon>
          </el-button>
          <el-button @click="resetSearch">
            <el-icon><RefreshLeft/></el-icon>
          </el-button>
        </div>
      </div>
  
      <div class="action-table-box">
        <div class="action-section">
          <div class="action-buttons">
            <el-button @click="batchDelete">批量操作</el-button>
          </div>
        </div>
  
        <el-table
          :data="filteredTransactions"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="transactionTime" label="交易时间" width="180"></el-table-column>
          <el-table-column prop="transactionId" label="交易单号" width="180"></el-table-column>
          <el-table-column prop="transactionType" label="收支类型" width="120">
            <template #default="scope">
              <span :style="{ color: scope.row.transactionType === 'income' ? '#67C23A' : '#F56C6C' }">
                {{ scope.row.transactionType === 'income' ? '收入' : '支出' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="accountType" label="账单类型" width="120"></el-table-column>
          <el-table-column prop="amount" label="金额（元）" width="120">
            <template #default="scope">
              <span :style="{ color: scope.row.transactionType === 'income' ? '#67C23A' : '#F56C6C' }">
                {{ scope.row.transactionType === 'income' ? '+' : '-' }}{{ scope.row.amount }}
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
  import {Search,RefreshLeft  } from '@element-plus/icons-vue'
  import { getTransactionList, batchDeleteTransactions } from '@/api/order';
  
  export default {
    data() {
      return {
        tableData: [
          {
            transactionTime: '2024-12-09 14:12:07',
            transactionId: '2400126670',
            transactionType: 'income',
            accountType: '订单收入',
            amount: '2400.40',
            description: '日常清洁 2小时1人急速清洁全程质保',
          },
          {
            transactionTime: '2024-12-09 14:12:07',
            transactionId: '2400126670',
            transactionType: 'income',
            accountType: '订单收入',
            amount: '2400.40',
            description: '日常清洁 2小时1人急速清洁全程质保',
          },
          {
            transactionTime: '2024-12-09 14:12:07',
            transactionId: '2400126670',
            transactionType: 'income',
            accountType: '订单收入',
            amount: '2400.40',
            description: '日常清洁 2小时1人急速清洁全程质保',
          },
          {
            transactionTime: '2024-12-09 14:12:07',
            transactionId: '2400126670',
            transactionType: 'income',
            accountType: '订单收入',
            amount: '2400.40',
            description: '日常清洁 2小时1人急速清洁全程质保',
          },
          {
            transactionTime: '2024-12-09 14:12:07',
            transactionId: '2400126670',
            transactionType: 'income',
            accountType: '订单收入',
            amount: '2400.40',
            description: '日常清洁 2小时1人急速清洁全程质保',
          },
          {
            transactionTime: '2024-12-09 14:12:07',
            transactionId: '2400126670',
            transactionType: 'income',
            accountType: '订单收入',
            amount: '2400.40',
            description: '日常清洁 2小时1人急速清洁全程质保',
          },
          {
            transactionTime: '2024-12-09 14:12:07',
            transactionId: '2400126670',
            transactionType: 'income',
            accountType: '订单收入',
            amount: '2400.40',
            description: '日常清洁 2小时1人急速清洁全程质保',
          },
        ],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        transactionType: '',
        dateRange: '',
        searchKeyword: '',
        selectedRows: [],
      };
    },
    components:{
        Search,
        RefreshLeft

    },
    computed: {
      filteredTransactions() {
        return this.tableData.filter(transaction => {
          // 筛选收支类型
          if (this.transactionType && transaction.transactionType !== this.transactionType) {
            return false;
          }
  
          // 筛选日期范围
          if (this.dateRange && transaction.transactionTime) {
            const transactionDate = new Date(transaction.transactionTime);
            const startDate = this.dateRange[0];
            const endDate = this.dateRange[1];
            if (transactionDate < startDate || transactionDate > endDate) {
              return false;
            }
          }
  
          // 筛选关键字
          if (this.searchKeyword && !transaction.description.includes(this.searchKeyword)) {
            return false;
          }
  
          return true;
        });
      },
    },
    methods: {
      searchTransactions() {
        // 搜索功能
      },
      resetSearch() {
        this.transactionType = '';
        this.dateRange = '';
        this.searchKeyword = '';
      },
      batchDelete() {
        if (this.selectedRows.length === 0) {
          ElMessage.warning('请至少选择一条记录');
          return;
        }
  
        this.$confirm('确定要批量删除选中的交易记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          const ids = this.selectedRows.map(row => row.transactionId);
          batchDeleteTransactions(ids).then(res => {
            if (res.code === 200) {
              ElMessage.success('批量删除成功');
              this.tableData = this.tableData.filter(item => !ids.includes(item.transactionId));
              this.selectedRows = [];
            } else {
              ElMessage.error('批量删除失败');
            }
          });
        }).catch(() => {
          ElMessage.info('已取消批量删除');
        });
      },
      handleSelectionChange(selection) {
        this.selectedRows = selection;
      },
      handlePageChange(page) {
        this.currentPage = page;
        // 加载对应页的数据
      },
    },
    mounted() {
      // 初始化数据
      this.total = this.tableData.length;
    },
  };
  </script>
  
  <style scoped>
  .money-details-container {
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