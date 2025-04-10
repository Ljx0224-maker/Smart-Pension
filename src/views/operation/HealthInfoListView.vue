<template>
  <div class="health-info-container">
    <div class="filter-section">
      <div class="page-header">
        <h2>健康资讯列表</h2>
      </div>

      <div class="filter-box">
        <div class="filter-row">
          <div class="filter-item">
            <span>状态</span>
            <el-select v-model="statusFilter" placeholder="请选择" style="width: 200px;">
              <el-option label="全部" value=""></el-option>
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="未发布" value="未发布"></el-option>
            </el-select>
          </div>

          <div class="filter-item">
            <el-input v-model="searchKeyword" placeholder="请输入关键字" style="width: 300px;"></el-input>
            <el-button type="primary" @click="searchHealthNews" style="margin-left: 10px;">
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
        <el-button type="primary" @click="addNewHealthNews">新增</el-button>
        <el-button @click="batchDelete" style="margin-left: 10px;">批量删除</el-button>
      </div>

      <el-table
        :data="filteredHealthNews"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="releaseTime" label="发布时间"></el-table-column>
        <el-table-column prop="title" label="资讯标题"></el-table-column>
        <el-table-column prop="love" label="点赞"></el-table-column>
        <el-table-column prop="collect" label="收藏"></el-table-column>
        <el-table-column prop="share" label="分享"></el-table-column>
        <el-table-column prop="comment" label="评论"></el-table-column>
        <el-table-column prop="publisher" label="发布人"></el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <span :style="{ color: scope.row.status === '已发布' ? '#409EFF' : '#999' }">
              {{ scope.row.status === '已发布' ? '已发布' : '未发布' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="text" @click="editHealthNews(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteHealthNews(scope.row.healthNewsId)" style="color: #FFB800;">删除</el-button>
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
          <el-form-item label="资讯标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="未发布" value="未发布"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveHealthNews">保存</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus';
import { Search, RefreshLeft } from '@element-plus/icons-vue';
import {
  getHealthNewsList,
  addOrUpdateHealthNews,
  deleteHealthNews,
} from '@/api/banner';

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      statusFilter: '',
      searchKeyword: '',
      dialogVisible: false,
      dialogTitle: '',
      form: {
        healthNewsId: null,
        title: '',
        status: '',
      },
      selectedRows: [],
    };
  },
  components: {
    Search,
    RefreshLeft,
  },
  computed: {
    filteredHealthNews() {
      return this.tableData.filter(news => {
        // 筛选状态
        if (this.statusFilter && news.status !== this.statusFilter) {
          return false;
        }

        // 筛选关键词
        if (this.searchKeyword && !news.title.includes(this.searchKeyword)) {
          return false;
        }

        return true;
      });
    },
  },
  methods: {
    searchHealthNews() {
      this.currentPage = 1; // 重置到第一页
      this.loadHealthNews();
    },
    resetSearch() {
      this.statusFilter = '';
      this.searchKeyword = '';
      this.loadHealthNews();
    },
    batchDelete() {
      if (this.selectedRows.length === 0) {
        ElMessage.warning('请至少选择一条记录');
        return;
      }

      ElMessageBox.confirm('确定要批量删除选中的健康资讯吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          const ids = this.selectedRows.map(row => row.healthNewsId);
          deleteHealthNews(ids).then(res => {
            if (res.code === 200) {
              ElMessage.success('批量删除成功');
              this.loadHealthNews();
              this.selectedRows = [];
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
    loadHealthNews() {
      const params = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        params: {
          status: this.statusFilter,
          keyword: this.searchKeyword,
        },
      };
      getHealthNewsList(params).then((res) => {
        console.log('接口返回数据：', res);
        if (res.code === 200) {
          this.tableData = res.data;
          this.total = res.total;
        } else {
          ElMessage.error('获取数据失败');
        }
      });
    },
    searchHealthNews() {
      this.currentPage = 1;
      this.loadHealthNews();
    },
    resetSearch() {
      this.statusFilter = '';
      this.searchKeyword = '';
      this.loadHealthNews();
    },
    addNewHealthNews() {
      this.dialogTitle = '新增健康资讯';
      this.form = {
        healthNewsId: null,
        title: '',
        status: '',
        love: 0, // 点赞数默认值
        collect: 0, // 收藏数默认值
        comment: 0, // 评论数默认值
        share: 0, // 分享数默认值
        releaseTime: new Date().toISOString(), // 发布时间设置为当前时间
      };
      this.dialogVisible = true;
    },
    editHealthNews(row) {
      this.dialogTitle = '编辑健康资讯';
      this.form = { ...row };
      this.dialogVisible = true;
    },
    saveHealthNews() {
      addOrUpdateHealthNews(this.form).then((res) => {
        if (res.code === 200) {
          ElMessage.success(this.form.healthNewsId ? '编辑成功' : '新增成功');
          this.dialogVisible = false;
          this.loadHealthNews();
        } else {
          ElMessage.error(this.form.healthNewsId ? '编辑失败' : '新增失败');
        }
      });
    },
    deleteHealthNews(id) {
      ElMessageBox.confirm('确定要删除此健康资讯吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteHealthNews(id).then((res) => {
            if (res.code === 200) {
              ElMessage.success('删除成功');
              this.loadHealthNews();
            } else {
              ElMessage.error('删除失败');
            }
          });
        })
        .catch(() => {
          ElMessage.info('已取消删除');
        });
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.loadHealthNews();
    },
  },
  mounted() {
    this.loadHealthNews();
  },
};
</script>

<style scoped>
.health-info-container {
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