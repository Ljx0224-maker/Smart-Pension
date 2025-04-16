<template>
  <div class="comments-container">
    <div class="filter-section">
      <div class="page-header">
        <h2>全部评论</h2>
      </div>

      <div class="filter-box">
        <div class="filter-row">
          <div class="filter-item">
            <span>状态</span>
            <el-select v-model="statusFilter" placeholder="请选择" style="width: 200px;">
              <el-option label="全部" value=""></el-option>
              <el-option label="显示" value="显示"></el-option>
              <el-option label="隐藏" value="隐藏"></el-option>
            </el-select>
          </div>
        </div>

        <div class="filter-row">
          <div class="filter-item">
            <span>发布时间</span>
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
            <el-button type="primary" @click="searchComments" style="margin-left: 10px;">
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
          <el-button @click="batchDelete">批量删除</el-button>
        </div>
      </div>

      <el-table
        :data="computedTableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="releaseTime" label="发布时间"></el-table-column>
        <el-table-column prop="content" label="评论内容"></el-table-column>
        <el-table-column prop="model" label="所属模块">
          <template #default="scope">
            <el-tag :type="getTagType(scope.row.model)">
              {{ scope.row.model }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="love" label="点赞"></el-table-column>
        <el-table-column prop="publisher" label="发布人"></el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              active-value="显示"
              inactive-value="隐藏"
              @change="toggleStatus(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="text" @click="deleteComment(scope.row)">删除</el-button>
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
import { getComments, deleteComment, batchDeleteComments, updateCommentVisibility } from '@/api/banner';

export default {
    data() {
    return {
      tableData: [],
      currentPage: 1, // 当前页
      pageSize: 10, // 每页显示的条目数
      total: 0, // 总条目数
      statusFilter: '',
      moduleFilter: '',
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
    computedTableData() {
      return this.filteredComments.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    filteredComments() {
      return this.tableData.filter(comment => {
        // 筛选状态
        if (this.statusFilter && comment.status !== this.statusFilter) {
          return false;
        }

        // 筛选模块
        if (this.moduleFilter && comment.model !== this.moduleFilter) {
          return false;
        }

        // 筛选日期范围
        if (this.dateRange && comment.releaseTime) {
          const commentDate = new Date(comment.releaseTime);
          const startDate = new Date(this.dateRange[0]);
          const endDate = new Date(this.dateRange[1]);
          if (commentDate < startDate || commentDate > endDate) {
            return false;
          }
        }

        // 筛选关键字
        if (this.searchKeyword && !comment.content.includes(this.searchKeyword)) {
          return false;
        }

        return true;
      });
    },
  },
  methods: {
    getTagType(tag) {
    if (tag === '健康讲座') {
      return 'success';
    } else if (tag === '养老院') {
      return 'primary';
    } 
    return '';
  },
    searchComments() {
      this.loadComments();
    },
    resetSearch() {
      this.statusFilter = '';
      this.moduleFilter = '';
      this.dateRange = '';
      this.searchKeyword = '';
      this.loadComments();
    },
    toggleStatus(row) {
      updateCommentVisibility(row.reviewId, row.status).then(res => { 
        if (res.code === 200) {
          ElMessage.success(row.status === '显示' ? '显示成功' : '隐藏成功');
        } else {
          ElMessage.error(row.status === '显示' ? '显示失败' : '隐藏失败');
        }
      }).catch(() => {
        ElMessage.error('状态更新失败');
      });
    },
    deleteComment(row) {
      ElMessageBox.confirm('确定要删除此评论吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteComment(row.reviewId).then(res => {
          if (res.code === 200) {
            ElMessage.success('删除成功');
            this.loadComments();
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

      ElMessageBox.confirm('确定要批量删除选中的评论吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const ids = this.selectedRows.map(row => row.reviewId);
        batchDeleteComments(ids).then(res => {
          if (res.code === 200) {
            ElMessage.success('批量删除成功');
            this.loadComments();
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
      this.loadComments();
    },
    loadComments() {
      getComments({ pageNum: this.currentPage, pageSize: this.pageSize }).then(res => {
        console.log(res);
        
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
    this.loadComments();
  },
};
</script>

<style scoped>
.comments-container {
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