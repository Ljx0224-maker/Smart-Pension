<template>
  <div class="news-container">
    <div class="filter-section">
      <div class="page-header">
        <h2>动态列表</h2>
      </div>

      <div class="filter-box">
        <div class="filter-row">
          <div class="filter-item">
            <span>发布日期</span>
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
            <el-button type="primary" @click="searchNews" style="margin-left: 10px;">
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
          <el-button @click="batchDelete">批量操作</el-button>
        </div>
      </div>

      <el-table
        :data="filteredNews"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="topic" label="话题"></el-table-column>
        <el-table-column prop="love" label="点赞"></el-table-column>
        <el-table-column prop="collect" label="收藏"></el-table-column>
        <el-table-column prop="share" label="分享"></el-table-column>
        <el-table-column prop="comment" label="评论"></el-table-column>
        <el-table-column prop="releaseTime" label="发布时间"></el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <span :style="{ color: scope.row.status === '显示' ? '#409EFF' : '#999' }">
              {{ scope.row.status === '显示' ? '显示' : '隐藏' }}
            </span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="状态" width="120">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              active-value="显示"
              inactive-value="隐藏"
              active-text="显示"
              inactive-text="隐藏"
              @change="toggleStatus(scope.row)"
            ></el-switch>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="text" @click="deleteNews(scope.row)" style="color: #FFB800;">删除</el-button>
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
import { getDynamics, deleteDynamic, batchDeleteDynamics } from '@/api/banner';

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dateRange: '',
      searchKeyword: '',
      selectedRows: [],
    };
  },
  components: {
    Search,
    RefreshLeft,
  },
  computed: {
    filteredNews() {
      return this.tableData.filter(news => {
        // 筛选日期范围
        if (this.dateRange && news.releaseTime) {
          const newsDate = new Date(news.releaseTime);
          const startDate = this.dateRange[0];
          const endDate = this.dateRange[1];
          if (newsDate < startDate || newsDate > endDate) {
            return false;
          }
        }

        // 筛选关键字
        if (this.searchKeyword && !news.content.includes(this.searchKeyword)) {
          return false;
        }

        return true;
      });
    },
  },
  methods: {
    // toggleStatus(row) {
    //   const updatedStatus = row.status === '显示' ? '隐藏' : '显示';
    //   const updatedRow = { ...row, status: updatedStatus };

    //   // 调用后端接口更新状态
    //   getDynamics(updatedRow).then(res => {
    //     if (res.code === 200) {
    //       ElMessage.success('状态更新成功');
    //       row.status = updatedStatus; // 更新本地状态
    //     } else {
    //       ElMessage.error('状态更新失败');
    //     }
    //   }).catch(() => {
    //     ElMessage.error('状态更新失败');
    //   });
    // },
    searchNews() {
      this.loadNews();
    },
    resetSearch() {
      this.dateRange = '';
      this.searchKeyword = '';
      this.loadNews();
    },
    deleteNews(row) {
      ElMessageBox.confirm('确定要删除此动态吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteDynamic(row.dynamicId).then(res => {
          if (res.code === 200) {
            ElMessage.success('删除成功');
            this.loadNews();
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

      ElMessageBox.confirm('确定要批量删除选中的动态吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const ids = this.selectedRows.map(row => row.dynamicId);
        batchDeleteDynamics(ids).then(res => {
          if (res.code === 200) {
            ElMessage.success('批量删除成功');
            this.loadNews();
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
      this.loadNews();
    },
    loadNews() {
      const params = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        params: {
          keyword: this.searchKeyword,
        },
      };
    
      if (this.dateRange) {
        params.params.startDate = this.dateRange[0];
        params.params.endDate = this.dateRange[1];
      }
    
      getDynamics(params).then(res => {
        console.log('接口返回数据:', res);
        if (res.code === 200) {
          // 提取 dynamics 数据
          this.tableData = res.data.map(item => item.dynamics);
          this.total = res.total;
        } else {
          ElMessage.error('获取数据失败');
        }
      }).catch(err => {
        console.error('接口调用失败:', err);
        ElMessage.error('接口调用失败');
      });
    }
  },
  mounted() {
    this.loadNews();
  },
};
</script>

<style scoped>
.news-container {
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