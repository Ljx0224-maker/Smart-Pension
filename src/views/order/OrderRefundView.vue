<template>
  <div class="refund-reason-container">
    <div class="filter-section">
      <div class="page-header">
        <h2>退款原因</h2>
      </div>

      <div class="filter-box">
        <div class="filter-row">
          <div class="filter-item">
            <el-input v-model="searchKeyword" placeholder="请输入关键字" style="width: 300px;"></el-input>
            <el-button type="primary" @click="searchReasons" style="margin-left: 10px;">
              <el-icon><Search /></el-icon>
            </el-button>
            <el-button @click="resetSearch" style="margin-left: 10px;">
              <el-icon><RefreshLeft /></el-icon>
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="action-table-box">
      <div class="action-section">
        <div class="action-buttons">
          <el-button type="primary" @click="addNewReason">新增</el-button>
          <el-button @click="batchDelete">批量删除</el-button>
        </div>
      </div>

      <el-table
        :data="computedTableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="reason" label="原因"></el-table-column>
        <el-table-column prop="lastUpdatedBy" label="最后更新人"></el-table-column>
        <el-table-column prop="lastUpdatedAt" label="最后更新时间"></el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              active-value="启用"
              inactive-value="禁用"
              @change="toggleStatus(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="text" @click="editReason(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteReason(scope.row)" style="color: #FFB800;">删除</el-button>
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
            v-model="form.status"
            active-value="启用"
            inactive-value="禁用"
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
import { Search, RefreshLeft } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import {
  getRefundReasons,
  addOrUpdateRefundReason,
  deleteRefundReason,
  batchDeleteRefundReasons,
} from '@/api/order';

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1, // 当前页
      pageSize: 10, // 每页显示的条目数
      total: 0, // 总条目数
      searchKeyword: '',
      dialogVisible: false,
      dialogTitle: '',
      refundReasonId: null,
      form: {
        id: null,
        reason: '',
        status: '启用', // 默认状态
      },
      selectedRows: [],
      userInfo: this.$store.state.userInfo, // 从 Vuex 获取当前登录用户信息
    };
  },
  components: {
    Search,
    RefreshLeft,
  },
  computed: {
    computedTableData() {
      // 先根据搜索关键词过滤数据
      let filteredData = this.tableData.filter(item => {
        // 检查多个字段是否包含关键词，可按需添加更多字段
        return item.reason?.includes(this.searchKeyword) || 
               item.lastUpdatedBy?.includes(this.searchKeyword) ||
               item.status?.includes(this.searchKeyword);
      });

      // 再进行分页
      return filteredData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
  methods: {
    searchReasons() {
      this.loadReasons();
    },
    resetSearch() {
      this.searchKeyword = '';
      this.loadReasons();
    },
    toggleStatus(row) {
      addOrUpdateRefundReason({ ...row, status: row.status }).then((res) => {
        if (res.code === 200) {
          ElMessage.success(row.status === '启用' ? '启用成功' : '禁用成功');
        } else {
          ElMessage.error(row.status === '启用' ? '启用失败' : '禁用失败');
        }
      }).catch(() => {
        ElMessage.error('状态更新失败');
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
      })
        .then(() => {
          deleteRefundReason(row.refundReasonId).then((res) => {
            if (res.code === 200) {
              ElMessage.success('删除成功');
              this.loadReasons();
            } else {
              ElMessage.error('删除失败');
            }
          });
        })
        .catch(() => {
          ElMessage.info('已取消删除');
        });
    },
    addNewReason() {
      this.dialogTitle = '新增退款原因';
      this.form = {
        id: null,
        reason: '',
        status: '启用',
        lastUpdatedBy: this.userInfo.staffName || '未知用户', // 自动填充更新人
      };
      this.dialogVisible = true;
    },
    saveReason() {
      addOrUpdateRefundReason(this.form).then((res) => {
        if (res.code === 200) {
          ElMessage.success(this.form.refundReasonId ? '编辑成功' : '新增成功');
          this.dialogVisible = false;
          this.loadReasons();
        } else {
          ElMessage.error(this.form.refundReasonId ? '编辑失败' : '新增失败');
        }
      });
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
      })
        .then(() => {
          const ids = this.selectedRows.map((row) => row.refundReasonId);
          batchDeleteRefundReasons(ids).then((res) => {
            if (res.code === 200) {
              ElMessage.success('批量删除成功');
              this.loadReasons();
            } else {
              ElMessage.error('批量删除失败');
            }
          });
        })
        .catch(() => {
          ElMessage.info('已取消批量删除');
        });
    },
    handleSelectionChange(selection) {
      this.selectedRows = selection;
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.loadReasons();
    },
    loadReasons() {
      getRefundReasons().then((res) => {
        console.log('获取退款原因列表:', res); // 打印响应数据
        if (Array.isArray(res)) {
          this.tableData = res; // 将数据赋值给 tableData
          // 更新总条目数为筛选后的数据数量
          this.total = this.tableData.filter(item => {
            return item.reason?.includes(this.searchKeyword) || 
                   item.lastUpdatedBy?.includes(this.searchKeyword) ||
                   item.status?.includes(this.searchKeyword);
          }).length;
        } else {
          ElMessage.error('获取数据失败');
        }
      }).catch(() => {
        ElMessage.error('请求失败，请检查网络或后端服务');
      });
    },

  },
  mounted() {
    this.loadReasons();
  },
};
</script>

<style scoped>
.refund-reason-container {
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