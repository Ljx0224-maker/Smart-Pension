<template>
    <div class="message-container">
      <div class="filter-section">
        <div class="filter-item">
          <span>状态</span>
          <el-select v-model="statusFilter" placeholder="请选择" style="width: 200px;">
            <el-option label="全部" value=""></el-option>
            <el-option label="待发送" value="pending"></el-option>
            <el-option label="已发送" value="sent"></el-option>
          </el-select>
        </div>
  
        <div class="filter-item">
          <el-input v-model="searchKeyword" placeholder="请输入关键字" style="width: 300px;"></el-input>
          <el-button type="primary" @click="searchMessages">
            <el-icon><Search /></el-icon>
          </el-button>
          <el-button @click="resetSearch">
            <el-icon><RefreshLeft/></el-icon>
          </el-button>
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
          :data="filteredMessages"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="sendTime" label="发送时间" width="150"></el-table-column>
          <el-table-column prop="title" label="消息标题" width="200"></el-table-column>
          <el-table-column prop="status" label="状态" width="120">
            <template #default="scope">
              <span :style="{ color: scope.row.status === 'pending' ? '#409EFF' : '#67C23A' }">
                {{ scope.row.status === 'pending' ? '待发送' : '已发送' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="reportType" label="报告类型" width="200"></el-table-column>
          <el-table-column prop="receiver" label="接收人" width="150"></el-table-column>
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
              <el-select v-model="form.receiver" placeholder="请选择">
                <el-option label="所有用户" value="all"></el-option>
                <el-option label="特定用户" value="specific"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发送方式">
              <el-select v-model="form.sendMethod" placeholder="请选择">
                <el-option label="系统消息" value="system"></el-option>
                <el-option label="邮件" value="email"></el-option>
                <el-option label="短信" value="sms"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="form.status" placeholder="请选择">
                <el-option label="待发送" value="pending"></el-option>
                <el-option label="已发送" value="sent"></el-option>
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
  import {Search,RefreshLeft  } from '@element-plus/icons-vue'
  import { getMessages, addMessage, updateMessage, deleteMessage, batchDeleteMessages } from '@/api/message';
  
  export default {
    data() {
      return {
        tableData: [
          {
            id: 1,
            sendTime: '2024-03-24 10:23',
            title: '协议修订通知',
            status: 'pending',
            reportType: '亲爱的用户，我们最近更新了隐私协议，点击查看全部内容。',
            receiver: '所有用户',
            sendMethod: '系统消息',
          },
          {
            id: 2,
            sendTime: '2024-03-24 10:23',
            title: '协议修订通知',
            status: 'pending',
            reportType: '亲爱的用户，我们最近更新了隐私协议，点击查看全部内容。',
            receiver: '所有用户',
            sendMethod: '系统消息',
          },
          {
            id: 3,
            sendTime: '2024-03-24 10:23',
            title: '协议修订通知',
            status: 'pending',
            reportType: '亲爱的用户，我们最近更新了隐私协议，点击查看全部内容。',
            receiver: '所有用户',
            sendMethod: '系统消息',
          },
          {
            id: 4,
            sendTime: '2024-03-24 10:23',
            title: '协议修订通知',
            status: 'pending',
            reportType: '亲爱的用户，我们最近更新了隐私协议，点击查看全部内容。',
            receiver: '所有用户',
            sendMethod: '系统消息',
          },
          {
            id: 5,
            sendTime: '2024-03-24 10:23',
            title: '协议修订通知',
            status: 'pending',
            reportType: '亲爱的用户，我们最近更新了隐私协议，点击查看全部内容。',
            receiver: '所有用户',
            sendMethod: '系统消息',
          },
          {
            id: 6,
            sendTime: '2024-03-24 10:23',
            title: '协议修订通知',
            status: 'pending',
            reportType: '亲爱的用户，我们最近更新了隐私协议，点击查看全部内容。',
            receiver: '所有用户',
            sendMethod: '系统消息',
          },
        ],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        statusFilter: '',
        searchKeyword: '',
        dialogVisible: false,
        dialogTitle: '',
        form: {
          id: null,
          sendTime: '',
          title: '',
          status: 'pending',
          reportType: '',
          receiver: 'all',
          sendMethod: 'system',
          content: '',
        },
        selectedRows: [],
      };
    },
    components:{
        Search,
        RefreshLeft

    },
    computed: {
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
    },
    methods: {
      searchMessages() {
        // 搜索功能
      },
      resetSearch() {
        this.statusFilter = '';
        this.searchKeyword = '';
      },
      addNewMessage() {
        this.dialogTitle = '新增消息';
        this.form = {
          id: null,
          sendTime: '',
          title: '',
          status: 'pending',
          reportType: '',
          receiver: 'all',
          sendMethod: 'system',
          content: '',
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
          deleteMessage(row.id).then(res => {
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
      saveMessage() {
        if (this.form.id) {
          // 编辑
          updateMessage(this.form.id, this.form).then(res => {
            if (res.code === 200) {
              ElMessage.success('编辑成功');
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
          addMessage(this.form).then(res => {
            if (res.code === 200) {
              ElMessage.success('新增成功');
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
  
        this.$confirm('确定要批量删除选中的消息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          const ids = this.selectedRows.map(row => row.id);
          batchDeleteMessages(ids).then(res => {
            if (res.code === 200) {
              ElMessage.success('批量删除成功');
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
  .message-container {
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