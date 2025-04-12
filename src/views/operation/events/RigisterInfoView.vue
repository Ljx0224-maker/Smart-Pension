<template>
  <div class="registration-container">
    <div class="filter-section">
      <div class="page-header">
        <h2>报名信息列表</h2>
      </div>

      <div class="filter-box">
        <div class="filter-row">
          <div class="filter-item">
            <span>状态</span>
            <el-select v-model="statusFilter" placeholder="请选择" style="width: 200px;">
              <el-option label="全部" value=""></el-option>
              <el-option label="待审核" value="待审核"></el-option>
              <el-option label="已通过" value="已通过"></el-option>
            </el-select>
          </div>

          <div class="filter-item">
            <el-input v-model="searchKeyword" placeholder="请输入关键字" style="width: 300px;"></el-input>
            <el-button type="primary" @click="searchRegistrations" style="margin-left: 10px;">
              <el-icon><Search/></el-icon>
            </el-button>
            <el-button @click="resetSearch" style="margin-left: 10px;">
              <el-icon><RefreshLeft/></el-icon>
            </el-button>
          </div>

          
        </div>
        <div class="filter-row">
        <div class="filter-item">
          <span >提交日期</span>
          <el-date-picker
          v-model="submissionDateRange"
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
          <el-button @click="batchDelete">批量删除</el-button>
        </div>
      </div>

      <el-table
        :data="filteredRegistrations"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="realName" label="真实姓名"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="phoneNumber" label="手机号码"></el-table-column>
        <el-table-column prop="adress" label="家庭住址"></el-table-column>
        <el-table-column prop="releaseTime" label="提交时间"></el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <span :style="{ color: scope.row.status === '已通过' ? '#409EFF' : '#999' }">
              {{ scope.row.status === '已通过' ? '已通过' : '待审核' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="text" @click="deleteRegistration(scope.row)" style="color: #F56C6C;">删除</el-button>
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
import { ElMessage, ElMessageBox } from 'element-plus';
import { Search, RefreshLeft } from '@element-plus/icons-vue';
import { getRegistrations, deleteRegistration } from '@/api/banner';

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      statusFilter: '',
      submissionDateRange: '',
      searchKeyword: '',
      selectedRows: [],
    };
  },
  components: {
    Search,
    RefreshLeft,
  },
  computed: {
    filteredRegistrations() {
      return this.tableData.filter(registration => {
        // 确保 status 存在
        if (!registration.status) {
          registration.status = '已通过'; // 设置默认值
        }
    
        // 筛选状态
        if (this.statusFilter && registration.status !== this.statusFilter) {
          return false;
        }
    
        // 筛选提交日期范围
        if (this.submissionDateRange && registration.releaseTime) {
          const submissionDate = new Date(registration.releaseTime);
          const startDate = new Date(this.submissionDateRange[0]);
          const endDate = new Date(this.submissionDateRange[1]);
          if (submissionDate < startDate || submissionDate > endDate) {
            return false;
          }
        }
    
        // 筛选关键字
        if (this.searchKeyword && !registration.realName.includes(this.searchKeyword)) {
          return false;
        }
    
        return true;
      });
    }
  },
  methods: {
    toggleStatus(row) {
      row.status = row.status === '已通过' ? '已通过' : '待审核';
      ElMessage.success(`状态已更新为：${row.status}`);
    },
    searchRegistrations() {
      this.loadRegistrations();
    },
    resetSearch() {
      this.statusFilter = '';
      this.submissionDateRange = '';
      this.searchKeyword = '';
      this.loadRegistrations();
    },
    deleteRegistration(row) {
      ElMessageBox.confirm('确定要删除此报名信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteRegistration(row.registrationId).then(res => {
          if (res.code === 200) {
            ElMessage.success('删除成功');
            this.loadRegistrations();
          } else {
            ElMessage.error('删除失败');
          }
        });
      }).catch(() => {
        ElMessage.info('已取消删除');
      });
    },
    batchDelete() {
      if (this.selectedRows.length === 0) {
        ElMessage.warning('请至少选择一条记录');
        return;
      }

      ElMessageBox.confirm('确定要批量删除选中的报名信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const ids = this.selectedRows.map(row => row.registrationId);
        // 调用批量删除接口
        deleteRegistration(ids).then(res => {
          if (res.code === 200) {
            ElMessage.success('批量删除成功');
            this.loadRegistrations();
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
      this.loadRegistrations();
    },
    loadRegistrations() {
      const params = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        params: {
          status: this.statusFilter, // 确保 statusFilter 的值正确传递
          keyword: this.searchKeyword,
        },
      };

      if (this.submissionDateRange) {
        params.params.startDate = this.submissionDateRange[0];
        params.params.endDate = this.submissionDateRange[1];
      }

      getRegistrations(params).then(res => {
        console.log('接口返回数据:', res); // 调试日志
        if (res.code === 200) {
          this.tableData = res.data.map(item => item.elder_registration);
          this.total = res.total;
        } else {
          ElMessage.error('获取数据失败');
        }
      }).catch(err => {
        console.error('接口调用失败:', err); // 调试日志
        ElMessage.error('接口调用失败');
      });
    }
  },
  mounted() {
    this.loadRegistrations();
  },
};
</script>

<style scoped>
.registration-container {
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