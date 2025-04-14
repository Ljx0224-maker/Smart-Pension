<template>
  <div class="dish-container">
    <div class="filter-section">
      <div class="page-header">
        <h2>食谱列表</h2>
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
            <span style="margin-left: 70px;">分类</span>
            <el-select v-model="categoryFilter" placeholder="请选择" style="width: 200px;">
              <el-option label="全部" value=""></el-option>
              <el-option label="早餐" value="早餐"></el-option>
              <el-option label="午餐" value="午餐"></el-option>
              <el-option label="晚餐" value="晚餐"></el-option>
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
            <el-button type="primary" @click="searchDishes" style="margin-left: 10px;">
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
          <el-button type="primary" @click="addNewDish">新增</el-button>
          <el-button @click="batchDelete">批量操作</el-button>
        </div>
      </div>

      <el-table
        :data="filteredDishes"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="title" label="菜谱标题"></el-table-column>
        <el-table-column prop="category" label="分类"></el-table-column>
        <el-table-column label="标签">
          <template #default="scope">
            <div>
              <el-tag
                v-for="tag in scope.row.tag"
                :key="tag"
                :type="getTagType(tag)" 
                class="tag-item">
                {{ tag }}
            </el-tag>
          </div>
          </template>
        </el-table-column>
        <el-table-column prop="share" label="分享"></el-table-column>
        <el-table-column prop="collect" label="收藏"></el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <span :style="{ color: scope.row.status === '已发布' ? '#409EFF' : '#999' }">
              {{ scope.row.status === '已发布' ? '已发布' : '未发布' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="lastUpdatedBy" label="更新人"></el-table-column>
        <el-table-column prop="lastUpdatedAt" label="最后更新时间"></el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="text" @click="editDish(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteDish(scope.row)" style="color: #FFB800;">删除</el-button>
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
          <el-form-item label="菜谱标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="form.category" placeholder="请选择">
              <el-option label="早餐" value="早餐"></el-option>
              <el-option label="午餐" value="午餐"></el-option>
              <el-option label="晚餐" value="晚餐"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签">
            <el-select v-model="form.tag" multiple placeholder="请选择">
              <el-option label="清淡" value="清淡"></el-option>
              <el-option label="营养" value="营养"></el-option>
              <el-option label="简单" value="简单"></el-option>
              <el-option label="下饭" value="下饭"></el-option>
              <el-option label="健康" value="健康"></el-option>
              <el-option label="低脂" value="低脂"></el-option>
              <el-option label="养胃" value="养胃"></el-option>
              <el-option label="滋补" value="滋补"></el-option>
              <el-option label="低糖" value="低糖"></el-option>
            </el-select>
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
          <el-button type="primary" @click="saveDish">保存</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import { ElMessageBox } from 'element-plus';
import { Search, RefreshLeft } from '@element-plus/icons-vue';
import { getDishes, addDish, updateDish, deleteDish, batchDeleteDishes } from '@/api/banner';

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
        id: null,
        title: '',
        category: '',
        tag: [],
        status: '',
      },
      selectedRows: [],
      userInfo: this.$store.state.userInfo,
    };
  },
  components: {
    Search,
    RefreshLeft,
  },
  computed: {
    filteredDishes() {
      return this.tableData.filter(dish => {
        // 筛选状态
        if (this.statusFilter && dish.status !== this.statusFilter) {
          return false;
        }

        // 筛选分类
        if (this.categoryFilter && dish.category !== this.categoryFilter) {
          return false;
        }

        // 筛选日期范围
        if (this.dateRange && dish.lastUpdatedAt) {
          const dishDate = new Date(dish.lastUpdatedAt);
          const startDate = this.dateRange[0];
          const endDate = this.dateRange[1];
          if (dishDate < startDate || dishDate > endDate) {
            return false;
          }
        }

        // 筛选关键字
        if (this.searchKeyword && !dish.title.includes(this.searchKeyword)) {
          return false;
        }

        return true;
      });
    },
  },
  methods: {
    getTagType(tag) {
      if (tag === '清淡') {
        return 'info';
      } else if (tag === '营养') {
        return 'warning';
      } else if (tag === '健康') {
        return 'success';
      } else if (tag === '低脂') {
        return 'primary';
      } else if (tag === '下饭') {
        return 'danger';
      }
      return '';
    },
    searchDishes() {
      this.loadDishes();
    },
    resetSearch() {
      this.statusFilter = '';
      this.categoryFilter = '';
      this.dateRange = '';
      this.searchKeyword = '';
      this.loadDishes();
    },
    addNewDish() {
      this.dialogTitle = '新增菜谱';
      this.form = {
        id: null,
        title: '',
        category: '',
        tag: [],
        status: '',
        share: 0, // 默认分享数为 0
        collect: 0, // 默认收藏数为 0
        lastUpdatedAt: new Date().toISOString(), // 设置当前时间
        lastUpdatedBy: this.userInfo.staffName || '未知', // 自动填充更新人
      };
      this.dialogVisible = true;
    },
    editDish(row) {
      this.dialogTitle = '编辑菜谱';
      this.form = { ...row };
      this.dialogVisible = true;
    },
    deleteDish(row) {
      console.log('Deleting dish with ID:', row.healthDietId); // 调试日志
      ElMessageBox.confirm(
        '确定要删除此菜谱吗?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        deleteDish(row.healthDietId).then(res => {
          if (res.code === 200) {
            ElMessage.success('删除成功');
            this.loadDishes();
          } else {
            ElMessage.error('删除失败');
          }
        }).catch(err => {
          console.error('Delete error:', err); // 调试日志
        });
      }).catch(() => {
        ElMessage.info('已取消删除');
      });
    },
    saveDish() {
      const formData = {
        ...this.form,
        tag: this.form.tag.join('、'), // 将数组转换为逗号分隔的字符串
        share: 0, // 默认分享数为 0
        collect: 0, // 默认收藏数为 0
        lastUpdatedAt: this.form.lastUpdatedAt || new Date().toISOString(), // 如果没有时间，设置当前时间
      };
    
      if (this.form.id) {
        // 编辑
        updateDish(this.form.id, formData).then(res => {
          if (res.code === 200) {
            ElMessage.success('编辑成功');
            this.dialogVisible = false;
            this.loadDishes();
          } else {
            ElMessage.error('编辑失败');
          }
        });
      } else {
        // 新增
        addDish(formData).then(res => {
          if (res.code === 200) {
            ElMessage.success('新增成功');
            this.dialogVisible = false;
            this.loadDishes();
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

      this.$confirm('确定要批量删除选中的菜谱吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const ids = this.selectedRows.map(row => row.id);
        batchDeleteDishes(ids).then(res => {
          if (res.code === 200) {
            ElMessage.success('批量删除成功');
            this.loadDishes();
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
      this.loadDishes();
    },
    loadDishes() {
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

      getDishes(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.map(item => ({
            ...item,
            tag: item.tag ? item.tag.split('、') : [], // 将字符串分解为数组
          }));
          this.total = res.total;
        } else {
          ElMessage.error('获取数据失败');
        }
      });
    },
  },
  mounted() {
    this.loadDishes();
  },
};
</script>

<style scoped>
.dish-container {
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
  border-radius: 2px; /* 添加边角圆滑效果 */
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

.tag-container {
  display: flex; /* 使用 flex 布局 */
  flex-wrap: wrap; /* 允许换行 */
  gap: 2px; /* 设置标签之间的间距 */
}

.tag-item {
  margin-right: 3px; /* 设置右侧间距 */
  margin-bottom: 3px; /* 如果标签换行，设置下方间距 */
}
</style>