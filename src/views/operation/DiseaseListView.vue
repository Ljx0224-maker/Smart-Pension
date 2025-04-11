<template>
  <div class="disease-container">
    <div class="filter-section">
      <div class="page-header">
        <h2>疾病宝典列表</h2>
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
              <el-option label="儿科" value="儿科"></el-option>
              <el-option label="妇产科" value="妇产科"></el-option>
              <el-option label="普通内科" value="普通内科"></el-option>
              <el-option label="皮肤科" value="皮肤科"></el-option>
              <el-option label="消化内科" value="消化内科"></el-option>
              <el-option label="神经内科" value="神经内科"></el-option>
              <el-option label="骨科" value="骨科"></el-option>
              <el-option label="心血管内科" value="心血管内科"></el-option>
              <el-option label="呼吸内科" value="呼吸内科"></el-option>
              <el-option label="血液科" value="血液科"></el-option>
              <el-option label="耳鼻喉科" value="耳鼻喉科"></el-option>
              <el-option label="内分泌科" value="内分泌科"></el-option>
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
            <el-button type="primary" @click="searchDiseases" style="margin-left: 10px;">
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
          <el-button type="primary" @click="addNewDisease">新增</el-button>
          <el-button @click="batchDelete">批量操作</el-button>
        </div>
      </div>

      <el-table
        :data="filteredDiseases"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="diseaseName" label="疾病名称"></el-table-column>
        <el-table-column prop="category" label="分类"></el-table-column>
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
            <el-button type="text" @click="editDisease(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteDisease(scope.row)" style="color: #FFB800;">删除</el-button>
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
          <el-form-item label="疾病名称">
            <el-input v-model="form.diseaseName"></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="form.category" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="儿科" value="儿科"></el-option>
              <el-option label="妇产科" value="妇产科"></el-option>
              <el-option label="普通内科" value="普通内科"></el-option>
              <el-option label="皮肤科" value="皮肤科"></el-option>
              <el-option label="消化内科" value="消化内科"></el-option>
              <el-option label="神经内科" value="神经内科"></el-option>
              <el-option label="骨科" value="骨科"></el-option>
              <el-option label="心血管内科" value="心血管内科"></el-option>
              <el-option label="呼吸内科" value="呼吸内科"></el-option>
              <el-option label="血液科" value="血液科"></el-option>
              <el-option label="耳鼻喉科" value="耳鼻喉科"></el-option>
              <el-option label="内分泌科" value="内分泌科"></el-option>
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
          <el-button type="primary" @click="saveDisease">保存</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus';
import { Search, RefreshLeft } from '@element-plus/icons-vue';
import { getDiseases, addDisease, updateDisease, deleteDisease, batchDeleteDiseases } from '@/api/banner';

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
        diseaseGuideId: null,
        diseaseName: '',
        category: '',
        status: '',
        share: 0,
        collect: 0,
        lastUpdatedBy: '',
        lastUpdatedAt: '',
      },
      selectedRows: [],
    };
  },
  components: {
    Search,
    RefreshLeft,
  },
  computed: {
    filteredDiseases() {
      return this.tableData.filter(disease => {
        // 筛选状态
        if (this.statusFilter && disease.status !== this.statusFilter) {
          return false;
        }

        // 筛选分类
        if (this.categoryFilter && disease.category !== this.categoryFilter) {
          return false;
        }

        // 筛选日期范围
        if (this.dateRange && disease.lastUpdatedAt) {
          const diseaseDate = new Date(disease.lastUpdatedAt);
          const startDate = this.dateRange[0];
          const endDate = this.dateRange[1];
          if (diseaseDate < startDate || diseaseDate > endDate) {
            return false;
          }
        }

        // 筛选关键字
        if (this.searchKeyword && !disease.diseaseName.includes(this.searchKeyword)) {
          return false;
        }

        return true;
      });
    },
  },
  methods: {
    searchDiseases() {
      this.loadDiseases();
    },
    resetSearch() {
      this.statusFilter = '';
      this.categoryFilter = '';
      this.dateRange = '';
      this.searchKeyword = '';
      this.loadDiseases();
    },
    addNewDisease() {
      this.dialogTitle = '新增疾病';
      this.form = {
        diseaseGuideId: null,
        diseaseName: '',
        category: '',
        status: '',
        share: 0,
        collect: 0,
        lastUpdatedBy: '',
        lastUpdatedAt: new Date().toISOString(),
      };
      this.dialogVisible = true;
    },
    editDisease(row) {
      this.dialogTitle = '编辑疾病';
      this.form = { ...row };
      this.dialogVisible = true;
    },
    deleteDisease(row) {
      ElMessageBox.confirm(
        '确定要删除此疾病吗?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        deleteDisease(row.diseaseGuideId).then(res => {
          if (res.code === 200) {
            ElMessage.success('删除成功');
            this.loadDiseases();
          } else {
            ElMessage.error('删除失败');
          }
        });
      }).catch(() => {
        ElMessage.info('已取消删除');
      });
    },
    saveDisease() {
      if (this.form.diseaseGuideId) {
        // 编辑
        updateDisease(this.form.diseaseGuideId, this.form).then(res => {
          if (res.code === 200) {
            ElMessage.success('编辑成功');
            this.dialogVisible = false;
            this.loadDiseases();
          } else {
            ElMessage.error('编辑失败');
          }
        });
      } else {
        // 新增
        addDisease(this.form).then(res => {
          if (res.code === 200) {
            ElMessage.success('新增成功');
            this.dialogVisible = false;
            this.loadDiseases();
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

      ElMessageBox.confirm('确定要批量删除选中的疾病吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const ids = this.selectedRows.map(row => row.diseaseGuideId);
        batchDeleteDiseases(ids).then(res => {
          if (res.code === 200) {
            ElMessage.success('批量删除成功');
            this.loadDiseases();
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
      this.loadDiseases();
    },
    loadDiseases() {
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

      getDiseases(params).then(res => {
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
    this.loadDiseases();
  },
};
</script>

<style scoped>
.disease-container {
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