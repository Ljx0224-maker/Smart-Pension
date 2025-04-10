<template>
    <div class="registration-container">
      <div class="filter-section">
        <div class="filter-item">
          <span>状态</span>
          <el-select v-model="statusFilter" placeholder="请选择" style="width: 200px;">
            <el-option label="全部" value=""></el-option>
            <el-option label="待审核" value="pending"></el-option>
            <el-option label="已审核" value="approved"></el-option>
            <el-option label="已拒绝" value="rejected"></el-option>
          </el-select>
        </div>
  
        <div class="filter-item">
          <span>提交日期</span>
          <el-date-picker
            v-model="submissionDateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 300px;"
          ></el-date-picker>
        </div>
  
        <div class="filter-item">
          <span>审核日期</span>
          <el-date-picker
            v-model="reviewDateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 300px;"
          ></el-date-picker>
        </div>
  
        <div class="filter-item">
          <el-input v-model="searchKeyword" placeholder="请输入关键字" style="width: 300px;"></el-input>
          <el-button type="primary" @click="searchRegistrations">
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
            <el-button @click="batchOperate">批量操作</el-button>
          </div>
        </div>
  
        <el-table
          :data="filteredRegistrations"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="nickname" label="头像/昵称">
            <template #default="scope">
              <div class="registration-info">
                <img :src="scope.row.avatar" alt="用户头像" class="user-avatar">
                <span>{{ scope.row.nickname }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="phone" label="手机号码"></el-table-column>
          <el-table-column prop="experience" label="摄影时长"></el-table-column>
          <el-table-column prop="address" label="家庭住址"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <span :style="{ color: getStatusColor(scope.row.status) }">
                {{ getStatusText(scope.row.status) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="submissionTime" label="提交时间"></el-table-column>
          <el-table-column label="操作" width="150">
            <template #default="scope">
              <el-button type="text" @click="approveRegistration(scope.row)">审核</el-button>
              <el-button type="text" @click="deleteRegistration(scope.row)">删除</el-button>
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
  import {Search,RefreshLeft  } from '@element-plus/icons-vue'
  import { getRegistrations, approveRegistration, deleteRegistration, batchOperateRegistrations } from '@/api/banner';
  
  export default {
    data() {
      return {
        tableData: [
          {
            id: 1,
            avatar: 'https://via.placeholder.com/40',
            nickname: '笑看人生',
            name: '王强',
            age: 65,
            phone: '15678909900',
            experience: '2年',
            address: '徐汇区黎梅花园88栋3单元101',
            status: 'pending',
            submissionTime: '2024-10-09 10:09:09',
          },
          {
            id: 2,
            avatar: 'https://via.placeholder.com/40',
            nickname: '笑看人生',
            name: '王强',
            age: 65,
            phone: '15678909900',
            experience: '2年',
            address: '徐汇区黎梅花园88栋3单元101',
            status: 'pending',
            submissionTime: '2024-10-09 10:09:09',
          },
          {
            id: 3,
            avatar: 'https://via.placeholder.com/40',
            nickname: '笑看人生',
            name: '王强',
            age: 65,
            phone: '15678909900',
            experience: '2年',
            address: '徐汇区黎梅花园88栋3单元101',
            status: 'pending',
            submissionTime: '2024-10-09 10:09:09',
          },
          {
            id: 4,
            avatar: 'https://via.placeholder.com/40',
            nickname: '笑看人生',
            name: '王强',
            age: 65,
            phone: '15678909900',
            experience: '2年',
            address: '徐汇区黎梅花园88栋3单元101',
            status: 'pending',
            submissionTime: '2024-10-09 10:09:09',
          },
          {
            id: 5,
            avatar: 'https://via.placeholder.com/40',
            nickname: '笑看人生',
            name: '王强',
            age: 65,
            phone: '15678909900',
            experience: '2年',
            address: '徐汇区黎梅花园88栋3单元101',
            status: 'pending',
            submissionTime: '2024-10-09 10:09:09',
          },
        ],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        statusFilter: '',
        submissionDateRange: '',
        reviewDateRange: '',
        searchKeyword: '',
        selectedRows: [],
      };
    },
    components:{
        Search,
        RefreshLeft

    },
    computed: {
      filteredRegistrations() {
        return this.tableData.filter(registration => {
          // 筛选状态
          if (this.statusFilter && registration.status !== this.statusFilter) {
            return false;
          }
  
          // 筛选提交日期范围
          if (this.submissionDateRange && registration.submissionTime) {
            const submissionDate = new Date(registration.submissionTime);
            const startDate = this.submissionDateRange[0];
            const endDate = this.submissionDateRange[1];
            if (submissionDate < startDate || submissionDate > endDate) {
              return false;
            }
          }
  
          // 筛选审核日期范围
          if (this.reviewDateRange && registration.reviewTime) {
            const reviewDate = new Date(registration.reviewTime);
            const startDate = this.reviewDateRange[0];
            const endDate = this.reviewDateRange[1];
            if (reviewDate < startDate || reviewDate > endDate) {
              return false;
            }
          }
  
          // 筛选关键字
          if (this.searchKeyword && !registration.name.includes(this.searchKeyword)) {
            return false;
          }
  
          return true;
        });
      },
    },
    methods: {
      getStatusColor(status) {
        switch (status) {
          case 'pending':
            return '#409EFF';
          case 'approved':
            return '#67C23A';
          case 'rejected':
            return '#F56C6C';
          default:
            return '';
        }
      },
      getStatusText(status) {
        switch (status) {
          case 'pending':
            return '待审核';
          case 'approved':
            return '已审核';
          case 'rejected':
            return '已拒绝';
          default:
            return status;
        }
      },
      searchRegistrations() {
        // 搜索功能
      },
      resetSearch() {
        this.statusFilter = '';
        this.submissionDateRange = '';
        this.reviewDateRange = '';
        this.searchKeyword = '';
      },
      approveRegistration(row) {
        this.$confirm('确定要审核此报名信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info',
        }).then(() => {
          approveRegistration(row.id).then(res => {
            if (res.code === 200) {
              ElMessage.success('审核成功');
              row.status = 'approved';
            } else {
              ElMessage.error('审核失败');
            }
          });
        }).catch(() => {
          ElMessage.info('已取消审核');
        });
      },
      deleteRegistration(row) {
        this.$confirm('确定要删除此报名信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteRegistration(row.id).then(res => {
            if (res.code === 200) {
              ElMessage.success('删除成功');
              this.tableData = this.tableData.filter(item => item.id !== row.id);
            } else {
              ElMessage.error('删除失败');
            }
          });
        }).catch(() => {
          ElMessage.info('已取消删除');
        });
      },
      batchOperate() {
        if (this.selectedRows.length === 0) {
          ElMessage.warning('请至少选择一条记录');
          return;
        }
  
        this.$confirm('确定要批量操作选中的报名信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info',
        }).then(() => {
          const ids = this.selectedRows.map(row => row.id);
          batchOperateRegistrations(ids).then(res => {
            if (res.code === 200) {
              ElMessage.success('批量操作成功');
              this.selectedRows.forEach(row => {
                row.status = 'approved';
              });
              this.selectedRows = [];
            } else {
              ElMessage.error('批量操作失败');
            }
          });
        }).catch(() => {
          ElMessage.info('已取消批量操作');
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
  .registration-container {
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
  
  .registration-info {
    display: flex;
    align-items: center;
  }
  
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  </style>