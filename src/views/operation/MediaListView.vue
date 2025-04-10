<template>
    <div class="media-container">
      <div class="filter-section">
        <div class="filter-item">
          <span>状态</span>
          <el-select v-model="statusFilter" placeholder="请选择" style="width: 200px;">
            <el-option label="全部" value=""></el-option>
            <el-option label="已发布" value="published"></el-option>
            <el-option label="未发布" value="unpublished"></el-option>
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
          <el-button type="primary" @click="searchVideos">
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
            <el-button type="primary" @click="addNewVideo">新增</el-button>
            <el-button @click="batchDelete">批量操作</el-button>
          </div>
        </div>
  
        <el-table
          :data="filteredVideos"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" label="视频名称"></el-table-column>
          <el-table-column label="视频标签">
            <template #default="scope">
              <el-tag v-for="tag in scope.row.tags" :key="tag" :type="getTagType(tag)">{{ tag }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="likes" label="点赞"></el-table-column>
          <el-table-column prop="favorites" label="收藏"></el-table-column>
          <el-table-column prop="shares" label="分享"></el-table-column>
          <el-table-column prop="comments" label="评论"></el-table-column>
          <el-table-column prop="updater" label="更新人"></el-table-column>
          <el-table-column prop="updateTime" label="最后更新时间"></el-table-column>
          <el-table-column label="操作" width="150">
            <template #default="scope">
              <el-button type="text" @click="editVideo(scope.row)">编辑</el-button>
              <el-button type="text" @click="deleteVideo(scope.row)">删除</el-button>
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
            <el-form-item label="视频名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="视频标签">
              <el-select v-model="form.tags" multiple placeholder="请选择">
                <el-option label="老年健康" value="老年健康"></el-option>
                <el-option label="健康饮食" value="健康饮食"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="form.status" placeholder="请选择">
                <el-option label="已发布" value="published"></el-option>
                <el-option label="未发布" value="unpublished"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="saveVideo">保存</el-button>
          </template>
        </el-dialog>
      </div>
    </div>
  </template>
  
  <script>
  import { ElMessage } from 'element-plus';
  import {Search,RefreshLeft  } from '@element-plus/icons-vue'
  import { getVideos, addVideo, updateVideo, deleteVideo, batchDeleteVideos } from '@/api/banner';
  
  export default {
    data() {
      return {
        tableData: [
          {
            id: 1,
            name: '老年人如何科学合理地补充维生素？',
            tags: ['老年健康', '健康饮食'],
            likes: 1001,
            favorites: 210,
            shares: 100,
            comments: 6,
            updater: '李明明',
            updateTime: '2024-10-09 10:09:09',
          },
          {
            id: 2,
            name: '老年人如何科学合理地补充维生素？',
            tags: ['老年健康', '健康饮食'],
            likes: 1001,
            favorites: 210,
            shares: 100,
            comments: 6,
            updater: '李明明',
            updateTime: '2024-10-09 10:09:09',
          },
          {
            id: 3,
            name: '老年人如何科学合理地补充维生素？',
            tags: ['老年健康', '健康饮食'],
            likes: 1001,
            favorites: 210,
            shares: 100,
            comments: 6,
            updater: '李明明',
            updateTime: '2024-10-09 10:09:09',
          },
          {
            id: 4,
            name: '老年人如何科学合理地补充维生素？',
            tags: ['老年健康', '健康饮食'],
            likes: 1001,
            favorites: 210,
            shares: 100,
            comments: 6,
            updater: '李明明',
            updateTime: '2024-10-09 10:09:09',
          },
          {
            id: 5,
            name: '老年人如何科学合理地补充维生素？',
            tags: ['老年健康', '健康饮食'],
            likes: 1001,
            favorites: 210,
            shares: 100,
            comments: 6,
            updater: '李明明',
            updateTime: '2024-10-09 10:09:09',
          },
        ],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        statusFilter: '',
        dateRange: '',
        searchKeyword: '',
        dialogVisible: false,
        dialogTitle: '',
        form: {
          id: null,
          name: '',
          tags: [],
          status: 'published',
        },
        selectedRows: [],
      };
    },
    components:{
        Search,
        RefreshLeft

    },
    computed: {
      filteredVideos() {
        return this.tableData.filter(video => {
          // 筛选状态
          if (this.statusFilter && video.status !== this.statusFilter) {
            return false;
          }
  
          // 筛选日期范围
          if (this.dateRange && video.updateTime) {
            const videoDate = new Date(video.updateTime);
            const startDate = this.dateRange[0];
            const endDate = this.dateRange[1];
            if (videoDate < startDate || videoDate > endDate) {
              return false;
            }
          }
  
          // 筛选关键字
          if (this.searchKeyword && !video.name.includes(this.searchKeyword)) {
            return false;
          }
  
          return true;
        });
      },
    },
    methods: {
      getTagType(tag) {
        if (tag === '老年健康') {
          return 'info';
        } else if (tag === '健康饮食') {
          return 'warning';
        }
        return '';
      },
      searchVideos() {
        // 搜索功能
      },
      resetSearch() {
        this.statusFilter = '';
        this.dateRange = '';
        this.searchKeyword = '';
      },
      addNewVideo() {
        this.dialogTitle = '新增视频';
        this.form = {
          id: null,
          name: '',
          tags: [],
          status: 'published',
        };
        this.dialogVisible = true;
      },
      editVideo(row) {
        this.dialogTitle = '编辑视频';
        this.form = { ...row };
        this.dialogVisible = true;
      },
      deleteVideo(row) {
        this.$confirm('确定要删除此视频吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteVideo(row.id).then(res => {
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
      saveVideo() {
        if (this.form.id) {
          // 编辑
          updateVideo(this.form.id, this.form).then(res => {
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
          addVideo(this.form).then(res => {
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
  
        this.$confirm('确定要批量删除选中的视频吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          const ids = this.selectedRows.map(row => row.id);
          batchDeleteVideos(ids).then(res => {
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
  .media-container {
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