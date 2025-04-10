<template>
    <div class="events-container">
      <div class="filter-section">
        <div class="filter-item">
          <span>状态</span>
          <el-select v-model="statusFilter" placeholder="请选择" style="width: 200px;">
            <el-option label="全部" value=""></el-option>
            <el-option label="进行中" value="ongoing"></el-option>
            <el-option label="已结束" value="ended"></el-option>
          </el-select>
        </div>
  
        <div class="filter-item">
          <span>分类</span>
          <el-select v-model="categoryFilter" placeholder="请选择" style="width: 200px;">
            <el-option label="全部" value=""></el-option>
            <el-option label="文化娱乐" value="entertainment"></el-option>
            <el-option label="体育活动" value="sports"></el-option>
            <el-option label="教育培训" value="education"></el-option>
          </el-select>
        </div>
  
        <div class="filter-item">
          <span>更新日期</span>
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
          <el-button type="primary" @click="searchEvents">
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
          <el-table-column prop="info" label="活动信息">
            <template #default="scope">
              <div class="event-info">
                <img :src="scope.row.image" alt="活动图片" class="event-image">
                <div class="event-title">{{ scope.row.info }}</div>
                <div class="event-status">
                  <span :style="{ color: scope.row.status === 'ongoing' ? '#409EFF' : '#999' }">
                    {{ scope.row.status === 'ongoing' ? '进行中' : '已结束' }}
                  </span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="活动状态"></el-table-column>
          <el-table-column prop="category" label="分类"></el-table-column>
          <el-table-column prop="time" label="活动时间"></el-table-column>
          <el-table-column prop="location" label="活动地点"></el-table-column>
          <el-table-column prop="lastUpdatedBy" label="最后更新人"></el-table-column>
          <el-table-column prop="lastUpdatedTime" label="最后更新时间"></el-table-column>
          <el-table-column label="操作" width="200">
            <template #default="scope">
              <el-button type="text">报名信息</el-button>
              <el-button type="text" @click="editEvent(scope.row)">编辑</el-button>
              <el-button type="text" @click="deleteEvent(scope.row)">删除</el-button>
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
            <el-form-item label="活动信息">
              <el-input v-model="form.info"></el-input>
            </el-form-item>
            <el-form-item label="活动状态">
              <el-select v-model="form.status" placeholder="请选择">
                <el-option label="进行中" value="ongoing"></el-option>
                <el-option label="已结束" value="ended"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分类">
              <el-select v-model="form.category" placeholder="请选择">
                <el-option label="文化娱乐" value="entertainment"></el-option>
                <el-option label="体育活动" value="sports"></el-option>
                <el-option label="教育培训" value="education"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动时间">
              <el-date-picker v-model="form.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="活动地点">
              <el-input v-model="form.location"></el-input>
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
  import { ElMessage } from 'element-plus';
  import {Search,RefreshLeft  } from '@element-plus/icons-vue'
  import { getEvents, addEvent, updateEvent, deleteEvent, batchDeleteEvents } from '@/api/banner';
  
  export default {
    data() {
      return {
        tableData: [
          {
            id: 1,
            info: '桂花小区老年摄影大赛火热进行中',
            status: 'ongoing',
            category: '文化娱乐',
            time: '2024-03-09 - 2024-10-09',
            location: '桂花小区',
            lastUpdatedBy: '李明明',
            lastUpdatedTime: '2024-10-09 10:09:09',
            image: 'https://via.placeholder.com/100',
          },
          {
            id: 2,
            info: '桂花小区老年摄影大赛火热进行中',
            status: 'ongoing',
            category: '文化娱乐',
            time: '2024-03-09 - 2024-10-09',
            location: '桂花小区',
            lastUpdatedBy: '李明明',
            lastUpdatedTime: '2024-10-09 10:09:09',
            image: 'https://via.placeholder.com/100',
          },
          {
            id: 3,
            info: '桂花小区老年摄影大赛火热进行中',
            status: 'ongoing',
            category: '文化娱乐',
            time: '2024-03-09 - 2024-10-09',
            location: '桂花小区',
            lastUpdatedBy: '李明明',
            lastUpdatedTime: '2024-10-09 10:09:09',
            image: 'https://via.placeholder.com/100',
          },
          {
            id: 4,
            info: '桂花小区老年摄影大赛火热进行中',
            status: 'ongoing',
            category: '文化娱乐',
            time: '2024-03-09 - 2024-10-09',
            location: '桂花小区',
            lastUpdatedBy: '李明明',
            lastUpdatedTime: '2024-10-09 10:09:09',
            image: 'https://via.placeholder.com/100',
          },
          {
            id: 5,
            info: '桂花小区老年摄影大赛火热进行中',
            status: 'ongoing',
            category: '文化娱乐',
            time: '2024-03-09 - 2024-10-09',
            location: '桂花小区',
            lastUpdatedBy: '李明明',
            lastUpdatedTime: '2024-10-09 10:09:09',
            image: 'https://via.placeholder.com/100',
          },
        ],
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
          id: null,
          info: '',
          status: 'ongoing',
          category: '',
          time: '',
          location: '',
        },
        selectedRows: [],
      };
    },
    components:{
        Search,
        RefreshLeft

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
          if (this.dateRange && event.lastUpdatedTime) {
            const eventDate = new Date(event.lastUpdatedTime);
            const startDate = this.dateRange[0];
            const endDate = this.dateRange[1];
            if (eventDate < startDate || eventDate > endDate) {
              return false;
            }
          }
  
          // 筛选关键字
          if (this.searchKeyword && !event.info.includes(this.searchKeyword)) {
            return false;
          }
  
          return true;
        });
      },
    },
    methods: {
      searchEvents() {
        // 搜索功能
      },
      resetSearch() {
        this.statusFilter = '';
        this.categoryFilter = '';
        this.dateRange = '';
        this.searchKeyword = '';
      },
      addNewEvent() {
        this.dialogTitle = '新增活动';
        this.form = {
          id: null,
          info: '',
          status: 'ongoing',
          category: '',
          time: '',
          location: '',
        };
        this.dialogVisible = true;
      },
      editEvent(row) {
        this.dialogTitle = '编辑活动';
        this.form = { ...row };
        this.dialogVisible = true;
      },
      deleteEvent(row) {
        this.$confirm('确定要删除此活动吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteEvent(row.id).then(res => {
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
      saveEvent() {
        if (this.form.id) {
          // 编辑
          updateEvent(this.form.id, this.form).then(res => {
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
          addEvent(this.form).then(res => {
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
  
        this.$confirm('确定要批量删除选中的活动吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          const ids = this.selectedRows.map(row => row.id);
          batchDeleteEvents(ids).then(res => {
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
  .events-container {
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
  
  .event-info {
    display: flex;
    align-items: center;
  }
  
  .event-image {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    margin-right: 10px;
  }
  
  .event-title {
    flex: 1;
  }
  
  .event-status {
    color: #409EFF;
  }
  </style>