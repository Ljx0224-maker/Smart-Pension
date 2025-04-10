<template>
  <div class="institution-container">
    <div class="filter-section">
      <div class="page-header">
        <h2>养老机构列表</h2>
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
            <span style="margin-left: 70px;">特色服务</span>
            <el-select v-model="tagFilter" placeholder="请选择" style="width: 200px;">
              <el-option label="全部" value=""></el-option>
              <el-option label="专业护理" value="专业护理"></el-option>
              <el-option label="康复治疗" value="康复治疗"></el-option>
              <el-option label="营养膳食" value="营养膳食"></el-option>
              <el-option label="文化活动" value="文化活动"></el-option>
              <el-option label="心理关怀" value="心理关怀"></el-option>
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
            <el-button type="primary" @click="searchInstitutions" style="margin-left: 10px;">
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
          <el-button type="primary" @click="addNewInstitution">新增</el-button>
          <el-button @click="batchDelete">批量操作</el-button>
        </div>
      </div>

      <el-table
        :data="filteredInstitutions"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="restHomeName" label="机构名称"></el-table-column>
        <el-table-column label="特色服务">
          <template #default="scope">
            <el-tag
              v-for="tag in scope.row.tag"
              :key="tag"
              :type="getTagType(tag)"
              class="tag-item"
            >
              {{ tag }}
            </el-tag>
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
            <el-button type="text" @click="editInstitution(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteInstitution(scope.row)" style="color: #FFB800;">删除</el-button>
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
          <el-form-item label="机构名称">
            <el-input v-model="form.restHomeName"></el-input>
          </el-form-item>
          <el-form-item label="特色服务">
            <el-select v-model="form.tag" multiple placeholder="请选择">
              <el-option label="专业护理" value="专业护理"></el-option>
              <el-option label="康复治疗" value="康复治疗"></el-option>
              <el-option label="营养膳食" value="营养膳食"></el-option>
              <el-option label="文化活动" value="文化活动"></el-option>
              <el-option label="心理关怀" value="心理关怀"></el-option>
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
          <el-button type="primary" @click="saveInstitution">保存</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus';
import { Search, RefreshLeft } from '@element-plus/icons-vue';
import { getInstitutions, addInstitution, updateInstitution, deleteInstitution, batchDeleteInstitutions } from '@/api/banner';

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      statusFilter: '',
      tagFilter: '',
      dateRange: '',
      searchKeyword: '',
      dialogVisible: false,
      dialogTitle: '',
      form: {
        restHomeId: null,
        restHomeName: '',
        tag: [],
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
    filteredInstitutions() {
      return this.tableData.filter(institution => {
        // 筛选状态
        if (this.statusFilter && institution.status !== this.statusFilter) {
          return false;
        }

        // 筛选特色服务
        if (this.tagFilter && !institution.tag.includes(this.tagFilter)) {
          return false;
        }

        // 筛选日期范围
        if (this.dateRange && institution.lastUpdatedAt) {
          const institutionDate = new Date(institution.lastUpdatedAt);
          const startDate = this.dateRange[0];
          const endDate = this.dateRange[1];
          if (institutionDate < startDate || institutionDate > endDate) {
            return false;
          }
        }

        // 筛选关键字
        if (this.searchKeyword && !institution.restHomeName.includes(this.searchKeyword)) {
          return false;
        }

        return true;
      });
    },
  },
  methods: {
        getTagType(tag) {
      if (tag === '专业护理') {
        return 'success';
      } else if (tag === '康复治疗') {
        return 'warning';
      } else if (tag === '营养膳食') {
        return 'info';
      } else if (tag === '文化活动') {
        return 'primary';
      } else if (tag === '心理关怀') {
        return 'info';
      }
      return '';
    },
    searchInstitutions() {
      this.loadInstitutions();
    },
    resetSearch() {
      this.statusFilter = '';
      this.tagFilter = '';
      this.dateRange = '';
      this.searchKeyword = '';
      this.loadInstitutions();
    },
    addNewInstitution() {
      this.dialogTitle = '新增机构';
      this.form = {
        restHomeId: null,
        restHomeName: '',
        tag: [],
        status: '',
        share: 0, // 默认分享数为 0
        collect: 0, // 默认收藏数为 0
        lastUpdatedAt: new Date().toISOString(), // 默认更新时间为当前时间
      };
      this.dialogVisible = true;
    },
    editInstitution(row) {
      this.dialogTitle = '编辑机构';
      this.form = { ...row };
      this.dialogVisible = true;
    },
    deleteInstitution(row) {
      ElMessageBox.confirm(
        '确定要删除此机构吗?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        deleteInstitution(row.restHomeId).then(res => {
          if (res.code === 200) {
            ElMessage.success('删除成功');
            this.loadInstitutions();
          } else {
            ElMessage.error('删除失败');
          }
        });
      }).catch(() => {
        ElMessage.info('已取消删除');
      });
    },
    saveInstitution() {
      const formData = {
        ...this.form,
        tag: this.form.tag.join('、'), // 将数组转换为字符串，用 "、" 分隔
      };
    
      if (this.form.restHomeId) {
        // 编辑
        updateInstitution(this.form.restHomeId, formData).then(res => {
          if (res.code === 200) {
            ElMessage.success('编辑成功');
            this.dialogVisible = false;
            this.loadInstitutions();
          } else {
            ElMessage.error('编辑失败');
          }
        });
      } else {
        // 新增
        addInstitution(formData).then(res => {
          if (res.code === 200) {
            ElMessage.success('新增成功');
            this.dialogVisible = false;
            this.loadInstitutions();
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

      ElMessageBox.confirm('确定要批量删除选中的机构吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const ids = this.selectedRows.map(row => row.restHomeId);
        batchDeleteInstitutions(ids).then(res => {
          if (res.code === 200) {
            ElMessage.success('批量删除成功');
            this.loadInstitutions();
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
      this.loadInstitutions();
    },
        loadInstitutions() {
      const params = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        params: {
          status: this.statusFilter,
          tag: this.tagFilter,
          keyword: this.searchKeyword,
        },
      };
    
      if (this.dateRange) {
        params.params.startDate = this.dateRange[0];
        params.params.endDate = this.dateRange[1];
      }
    
      getInstitutions(params).then(res => {
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
    this.loadInstitutions();
  },
};
</script>

<style scoped>
.institution-container {
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

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
}

.tag-item {
  margin-right: 3px;
  margin-bottom: 3px;
}
</style>