<template>
  <div class="message-container">
    <div class="filter-section">
      <div class="page-header">
        <h2>消息管理</h2>
      </div>

      <div class="filter-box">
        <div class="filter-row">
          <div class="filter-item">
            <span>状态</span>
            <el-select v-model="statusFilter" placeholder="请选择" style="width: 200px;">
              <el-option label="全部" value=""></el-option>
              <el-option label="待发送" value="待发送"></el-option>
              <el-option label="已发送" value="已发送"></el-option>
            </el-select>
          </div>

          <div class="filter-item">
            <el-input v-model="searchKeyword" placeholder="请输入关键字" style="width: 300px;"></el-input>
            <el-button type="primary" @click="searchMessages" style="margin-left: 10px;">
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
          <el-button type="primary" @click="addNewMessage">新增</el-button>
          <el-button @click="batchDelete">批量操作</el-button>
        </div>
      </div>

      <el-table
        :data="computedTableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="releaseTime" label="发布时间" width="150"></el-table-column>
        <el-table-column prop="title" label="消息标题" width="200"></el-table-column>
        <el-table-column prop="content" label="消息内容" width="300">
          <template #default="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.content" placement="top">
              <span>{{ scope.row.content }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template #default="scope">
            <span :style="{ color: scope.row.status === '待发送' ? '#409EFF' : '#67C23A' }">
              {{ scope.row.status === '待发送' ? '待发送' : '已发送' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="recipient" label="接收人" width="150"></el-table-column>
        <el-table-column prop="sendMethod" label="发送方式" width="120"></el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="text" @click="editMessage(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteMessage(scope.row)">删除</el-button>
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
          <el-form-item label="消息标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="消息内容">
            <el-input v-model="form.content" type="textarea" :rows="4"></el-input>
          </el-form-item>
          <el-form-item label="接收人">
            <el-select v-model="form.recipient" placeholder="请选择">
              <el-option label="所有用户" value="所有用户"></el-option>
              <el-option label="特定用户" value="特定用户"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发送方式">
            <el-select v-model="form.sendMethod" placeholder="请选择">
              <el-option label="系统消息" value="系统消息"></el-option>
              <el-option label="短信" value="短信"></el-option>
              <el-option label="会话消息" value="会话消息"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option label="待发送" value="待发送"></el-option>
              <el-option label="已发送" value="已发送"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveMessage">保存</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import { Search, RefreshLeft } from '@element-plus/icons-vue';
import { getMessageList, addOrUpdateMessage, deleteMessage, queryMessages } from '@/api/message';

export default {
  data() {
    return {
      tableData: [], // 完整数据集
      currentPage: 1, // 当前页
      pageSize: 5, // 每页显示的条目数
      total: 0, // 总条目数
      statusFilter: '',
      searchKeyword: '',
      dialogVisible: false,
      dialogTitle: '',
      form: {
        massMessageId: null,
        releaseTime: '',
        title: '',
        status: '待发送',
        content: '',
        recipient: '所有用户',
        sendMethod: '系统消息',
      },
      selectedRows: [],
    };
  },
  components: {
    Search,
    RefreshLeft,
  },
  computed: {
    // 筛选后的数据
    filteredMessages() {
      return this.tableData.filter(message => {
        // 筛选状态
        if (this.statusFilter && message.status !== this.statusFilter) {
          return false;
        }
        // 筛选关键字
        if (this.searchKeyword && !message.title.includes(this.searchKeyword)) {
          return false;
        }
        return true;
      });
    },
    // 前端分页逻辑
    computedTableData() {
      return this.filteredMessages.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  },
  methods: {
    searchMessages() {
      this.currentPage = 1; // 搜索时重置到第一页
      this.loadMessages();
    },
    resetSearch() {
      this.statusFilter = '';
      this.searchKeyword = '';
      this.currentPage = 1; // 重置时回到第一页
      this.loadMessages();
    },
    addNewMessage() {
      this.dialogTitle = '新增消息';
      this.form = {
        massMessageId: null,
        releaseTime: '',
        title: '',
        status: '待发送',
        content: '',
        recipient: '所有用户',
        sendMethod: '系统消息',
      };
      this.dialogVisible = true;
    },
    editMessage(row) {
      this.dialogTitle = '编辑消息';
      this.form = { ...row };
      this.dialogVisible = true;
    },
    deleteMessage(row) {
      this.$confirm('确定要删除此消息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteMessage(row.massMessageId).then(res => {
          if (res.code === 200) {
            ElMessage.success('删除成功');
            this.loadMessages();
          } else {
            ElMessage.error('删除失败');
          }
        });
      }).catch(() => {
        ElMessage.info('已取消删除');
      });
    },
    saveMessage() {
      addOrUpdateMessage(this.form).then(res => {
        if (res.code === 200) {
          ElMessage.success(this.form.massMessageId ? '编辑成功' : '新增成功');
          this.dialogVisible = false;
          this.loadMessages();
        } else {
          ElMessage.error(this.form.massMessageId ? '编辑失败' : '新增失败');
        }
      });
    },
    batchDelete() {
      if (this.selectedRows.length === 0) {
        ElMessage.warning('请至少选择一条记录');
        return;
      }

      this.$confirm('确定要批量删除选中的消息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const ids = this.selectedRows.map(row => row.massMessageId);
        Promise.all(ids.map(id => deleteMessage(id))).then(() => {
          ElMessage.success('批量删除成功');
          this.loadMessages();
        }).catch(() => {
          ElMessage.error('批量删除失败');
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
    },
    loadMessages() {
      // 请求完整数据集
      queryMessages({ params: { status: this.statusFilter, keyword: this.searchKeyword } }).then(res => {
        if (res.code === 200) {
          this.tableData = res.data; // 获取完整数据集
          this.total = this.filteredMessages.length; // 设置筛选后的总条目数
        } else {
          ElMessage.error('获取数据失败');
        }
      });
    },
  },
  mounted() {
    this.loadMessages();
  },
};
</script>

<style scoped>
.message-container {
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
  margin-bottom: 20px;
}

.el-pagination {
  text-align: center;
}
</style>