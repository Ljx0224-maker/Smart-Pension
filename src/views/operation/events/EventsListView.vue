<template>
  <div class="events-container">
    <div class="filter-section">
      <div class="page-header">
        <h2>老年活动列表</h2>
      </div>

      <div class="filter-box">
        <div class="filter-row">
          <div class="filter-item">
            <span>状态</span>
            <el-select v-model="statusFilter" placeholder="请选择" style="width: 200px;">
              <el-option label="全部" value=""></el-option>
              <el-option label="进行中" value="进行中"></el-option>
              <el-option label="已结束" value="已结束"></el-option>
            </el-select>
          </div>

          <div class="filter-item">
            <span style="margin-left: 70px;">分类</span>
            <el-select v-model="categoryFilter" placeholder="请选择" style="width: 200px;">
              <el-option label="全部" value=""></el-option>
              <el-option label="健康" value="健康"></el-option>
              <el-option label="文化" value="文化"></el-option>
              <el-option label="旅游" value="旅游"></el-option>
              <el-option label="体育" value="体育"></el-option>
            </el-select>
          </div>
        </div>

        <div class="filter-row">
          <div class="filter-item">
            <span>更新日期</span>
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
            <el-button type="primary" @click="searchEvents" style="margin-left: 10px;">
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
          <el-button type="primary" @click="addNewEvent">新增</el-button>
          <el-button @click="batchDelete">批量操作</el-button>
        </div>
      </div>

      <el-table
        :data="filteredEvents"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="title" label="活动标题"></el-table-column>
        <el-table-column prop="category" label="分类">
          <template #default="scope">
            <el-tag :type="getTagType(scope.row.category)">
              {{ scope.row.category }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="activityTime" label="活动时间"></el-table-column>
        <el-table-column prop="activityAdress" label="活动地点"></el-table-column>
        <el-table-column prop="lastUpdatedBy" label="更新人"></el-table-column>
        <el-table-column prop="lastUpdatedAt" label="最后更新时间"></el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="text" @click="editEvent(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteEvent(scope.row)" style="color: #FFB800;">删除</el-button>
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
          <el-form-item label="活动标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="form.category" placeholder="请选择">
              <el-option label="健康" value="健康"></el-option>
              <el-option label="文化" value="文化"></el-option>
              <el-option label="旅游" value="旅游"></el-option>
              <el-option label="体育" value="体育"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option label="进行中" value="进行中"></el-option>
              <el-option label="已结束" value="已结束"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间">
            <el-date-picker v-model="form.activityTime" type="datetime" placeholder="请选择活动时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="活动地点">
            <el-input v-model="form.activityAdress"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveEvent">保存</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus';
import { Search, RefreshLeft } from '@element-plus/icons-vue';
import { getEvents, addEvent, updateEvent, deleteEvent, batchDeleteEvents } from '@/api/banner';

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      statusFilter: '',
      categoryFilter: '',
      dateRange: '',
      searchKeyword: '',
      dialogVisible: false,
      dialogTitle: '',
      form: {
        activityId: null,
        title: '',
        category: '',
        status: '',
        activityTime: '',
        activityAdress: '',
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
    filteredEvents() {
      return this.tableData.filter(event => {
        // 筛选状态
        if (this.statusFilter && event.status !== this.statusFilter) {
          return false;
        }

        // 筛选分类
        if (this.categoryFilter && event.category !== this.categoryFilter) {
          return false;
        }

        // 筛选日期范围
        if (this.dateRange && event.lastUpdatedAt) {
          const eventDate = new Date(event.lastUpdatedAt);
          const startDate = this.dateRange[0];
          const endDate = this.dateRange[1];
          if (eventDate < startDate || eventDate > endDate) {
            return false;
          }
        }

        // 筛选关键字
        if (this.searchKeyword && !event.title.includes(this.searchKeyword)) {
          return false;
        }

        return true;
      });
    },
  },
  methods: {
    getTagType(tag) {
      if (tag === '体育') {
        return 'info';
      } else if (tag === '健康') {
        return 'success';
      } else if (tag === '文化') {
        return 'primary';
      } else if (tag === '旅游') {
        return 'warning';
      } 
      return '';
    },
    searchEvents() {
      this.loadEvents();
    },
    resetSearch() {
      this.statusFilter = '';
      this.categoryFilter = '';
      this.dateRange = '';
      this.searchKeyword = '';
      this.loadEvents();
    },
    addNewEvent() {
      this.dialogTitle = '新增活动';
      this.form = {
        activityId: null,
        title: '',
        category: '',
        status: '',
        activityTime: '',
        activityAdress: '',
        lastUpdatedAt: new Date().toISOString(), // 设置当前时间为更新时间
        lastUpdatedBy: this.$store.state.userInfo.staffName || '未知', // 自动填充更新人
      };
      this.dialogVisible = true;
    },
    editEvent(row) {
      this.dialogTitle = '编辑活动';
      this.form = { ...row };
      this.dialogVisible = true;
    },
    deleteEvent(row) {
      ElMessageBox.confirm(
        '确定要删除此活动吗?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        deleteEvent(row.activityId).then(res => {
          if (res.code === 200) {
            ElMessage.success('删除成功');
            this.loadEvents();
          } else {
            ElMessage.error('删除失败');
          }
        });
      }).catch(() => {
        ElMessage.info('已取消删除');
      });
    },
    saveEvent() {
      const formData = {
        ...this.form,
        lastUpdatedAt: this.form.lastUpdatedAt || new Date().toISOString(), // 如果没有时间，设置当前时间
      };
      if (this.form.activityId) {
        // 编辑
        updateEvent(this.form.activityId, this.form).then(res => {
          if (res.code === 200) {
            ElMessage.success('编辑成功');
            this.dialogVisible = false;
            this.loadEvents();
          } else {
            ElMessage.error('编辑失败');
          }
        });
      } else {
        // 新增
        addEvent(this.form).then(res => {
          if (res.code === 200) {
            ElMessage.success('新增成功');
            this.dialogVisible = false;
            this.loadEvents();
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

      ElMessageBox.confirm('确定要批量删除选中的活动吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const ids = this.selectedRows.map(row => row.activityId);
        batchDeleteEvents(ids).then(res => {
          if (res.code === 200) {
            ElMessage.success('批量删除成功');
            this.loadEvents();
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
      this.loadEvents();
    },
    loadEvents() {
      const params = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        params: {
          status: this.statusFilter,
          category: this.categoryFilter,
          keyword: this.searchKeyword,
        },
      };

      if (this.dateRange) {
        params.params.startDate = this.dateRange[0];
        params.params.endDate = this.dateRange[1];
      }

      getEvents(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data;
          this.total = res.total;
        } else {
          ElMessage.error('获取数据失败');
        }
      });
    },
  },
  mounted() {
    this.loadEvents();
  },
};
</script>

<style scoped>
.events-container {
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