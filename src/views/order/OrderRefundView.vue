
<template>
    <div class="refund-reason-container">
      <div class="search-section">
        <div class="search-box">
          <el-input v-model="searchKeyword" placeholder="请输入关键字"></el-input>
          <el-button type="primary" @click="searchReasons">
            <el-icon><Search /></el-icon>
          </el-button>
          <el-button @click="resetSearch">
            <el-icon><RefreshLeft/></el-icon>
          </el-button>
        </div>
      </div>
  
      <div class="action-section">
        <div class="action-buttons">
          <el-button type="primary" @click="addNewReason">新增</el-button>
          <el-button @click="batchDelete">批量删除</el-button>
        </div>
      </div>
  
      <el-table
        :data="filteredReasons"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="reason" label="原因"></el-table-column>
        <el-table-column prop="lastUpdatedBy" label="最后更新人"></el-table-column>
        <el-table-column prop="lastUpdatedTime" label="最后更新时间"></el-table-column>
        <el-table-column label="状态" width="120">
          <template #default="scope">
            <el-switch
              v-model="scope.row.enabled"
              active-text="启用"
              inactive-text="禁用"
              @change="toggleStatus(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="text" @click="editReason(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteReason(scope.row)">删除</el-button>
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
  
      <!-- 编辑/新增弹窗 -->
      <el-dialog
        :title="dialogTitle"
        v-model="dialogVisible"
        width="500px"
      >
        <el-form :model="form" label-width="100px">
          <el-form-item label="原因">
            <el-input v-model="form.reason"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch
              v-model="form.enabled"
              active-text="启用"
              inactive-text="禁用"
            ></el-switch>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveReason">保存</el-button>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import {Search,RefreshLeft  } from '@element-plus/icons-vue'

  import { ElMessage } from 'element-plus';
  import { getRefundReasons, updateRefundReasonStatus, deleteRefundReason, batchDeleteRefundReasons, addRefundReason, updateRefundReason } from '@/api/order';
  
  export default {
    data() {
      return {
        tableData: [
          {
            id: 6,
            reason: '未按时上门',
            lastUpdatedBy: '李明明',
            lastUpdatedTime: '2024-10-09 10:09:09',
            enabled: true,
          },
          {
            id: 5,
            reason: '未完成约定的工作',
            lastUpdatedBy: '李明明',
            lastUpdatedTime: '2024-10-09 10:09:09',
            enabled: true,
          },
          {
            id: 4,
            reason: '服务质量不佳',
            lastUpdatedBy: '李明明',
            lastUpdatedTime: '2024-10-09 10:09:09',
            enabled: true,
          },
          {
            id: 3,
            reason: '超出规定的服务时间',
            lastUpdatedBy: '李明明',
            lastUpdatedTime: '2024-10-09 10:09:09',
            enabled: true,
          },
          {
            id: 2,
            reason: '未经同意的额外收费',
            lastUpdatedBy: '李明明',
            lastUpdatedTime: '2024-10-09 10:09:09',
            enabled: true,
          },
          {
            id: 1,
            reason: '服务欺诈',
            lastUpdatedBy: '李明明',
            lastUpdatedTime: '2024-10-09 10:09:09',
            enabled: true,
          },
        ],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        searchKeyword: '',
        dialogVisible: false,
        dialogTitle: '',
        form: {
          id: null,
          reason: '',
          enabled: true,
        },
        selectedRows: [],
      };
    },
    components:{
        Search,
        RefreshLeft

    },
    computed: {
      filteredReasons() {
        return this.tableData.filter(reason => {
          return reason.reason.includes(this.searchKeyword);
        });
      },
    },
    methods: {
      searchReasons() {
        // 搜索功能
      },
      resetSearch() {
        this.searchKeyword = '';
      },
      toggleStatus(row) {
        updateRefundReasonStatus(row.id, { enabled: row.enabled }).then(res => {
          if (res.code === 200) {
            ElMessage.success('状态更新成功');
          } else {
            ElMessage.error('状态更新失败');
            row.enabled = !row.enabled; // 恢复原状态
          }
        });
      },
      editReason(row) {
        this.dialogTitle = '编辑退款原因';
        this.form = { ...row };
        this.dialogVisible = true;
      },
      deleteReason(row) {
        this.$confirm('确定要删除此退款原因吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteRefundReason(row.id).then(res => {
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
      addNewReason() {
        this.dialogTitle = '新增退款原因';
        this.form = {
          id: null,
          reason: '',
          enabled: true,
        };
        this.dialogVisible = true;
      },
      saveReason() {
        if (this.form.id) {
          // 编辑
          updateRefundReason(this.form.id, this.form).then(res => {
            if (res.code === 200) {
              ElMessage.success('编辑成功');
              // 更新本地数据
              const index = this.tableData.findIndex(item => item.id === this.form.id);
              if (index !== -1) {
                this.tableData[index] = { ...this.form };
              }
              this.dialogVisible = false;
            } else {
              ElMessage.error('编辑失败');
            }
          });
        } else {
          // 新增
          addRefundReason(this.form).then(res => {
            if (res.code === 200) {
              ElMessage.success('新增成功');
              // 添加到本地数据
              this.tableData.unshift(res.data);
              this.dialogVisible = false;
            } else {
              ElMessage.error('新增失败');
            }
          });
        }
      },
      batchDelete() {
        if (this.selectedRows.length === 0) {
          ElMessage.warning('请至少选择一条记录');
          return;
        }
  
        this.$confirm('确定要批量删除选中的退款原因吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          const ids = this.selectedRows.map(row => row.id);
          batchDeleteRefundReasons(ids).then(res => {
            if (res.code === 200) {
              ElMessage.success('批量删除成功');
              // 从本地数据中移除
              this.tableData = this.tableData.filter(item => !ids.includes(item.id));
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
  .refund-reason-container {
    padding: 20px;
    background-color: #f5f7fa;
  }
  
  .search-section {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .search-box {
    display: flex;
    align-items: center;
  }
  
  .search-box .el-input {
    width: 300px;
    margin-right: 10px;
  }
  
  .action-section {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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