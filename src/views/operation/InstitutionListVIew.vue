<template>
    <div class="institution-container">
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
          <el-button type="primary" @click="searchInstitutions">
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
          <el-table-column prop="name" label="机构名称"></el-table-column>
          <el-table-column label="特色服务">
            <template #default="scope">
              <el-tag v-for="service in scope.row.services" :key="service" :type="getServiceType(service)">{{ service }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="shares" label="分享"></el-table-column>
          <el-table-column prop="favorites" label="收藏"></el-table-column>
          <el-table-column label="状态">
            <template #default="scope">
              <span :style="{ color: scope.row.status === 'published' ? '#409EFF' : '#999' }">
                {{ scope.row.status === 'published' ? '已发布' : '未发布' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="updater" label="更新人"></el-table-column>
          <el-table-column prop="updateTime" label="最后更新时间"></el-table-column>
          <el-table-column label="操作" width="150">
            <template #default="scope">
              <el-button type="text" @click="editInstitution(scope.row)">编辑</el-button>
              <el-button type="text" @click="deleteInstitution(scope.row)">删除</el-button>
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
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="特色服务">
              <el-select v-model="form.services" multiple placeholder="请选择">
                <el-option label="24h监护" value="24h监护"></el-option>
                <el-option label="特殊护理" value="特殊护理"></el-option>
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
            <el-button type="primary" @click="saveInstitution">保存</el-button>
          </template>
        </el-dialog>
      </div>
    </div>
  </template>
  
  <script>
  import { ElMessage } from 'element-plus';
  import {Search,RefreshLeft  } from '@element-plus/icons-vue'
  import { getInstitutions, addInstitution, updateInstitution, deleteInstitution, batchDeleteInstitutions } from '@/api/banner';
  
  export default {
    data() {
      return {
        tableData: [
          {
            id: 1,
            name: '金慧福养老机构（朝阳店）',
            services: ['24h监护', '特殊护理'],
            shares: 100,
            favorites: 35,
            status: 'published',
            updater: '李明明',
            updateTime: '2024-10-09 10:09:09',
          },
          {
            id: 2,
            name: '金慧福养老机构（朝阳店）',
            services: ['24h监护', '特殊护理'],
            shares: 100,
            favorites: 35,
            status: 'published',
            updater: '李明明',
            updateTime: '2024-10-09 10:09:09',
          },
          {
            id: 3,
            name: '金慧福养老机构（朝阳店）',
            services: ['24h监护', '特殊护理'],
            shares: 100,
            favorites: 35,
            status: 'published',
            updater: '李明明',
            updateTime: '2024-10-09 10:09:09',
          },
          {
            id: 4,
            name: '金慧福养老机构（朝阳店）',
            services: ['24h监护', '特殊护理'],
            shares: 100,
            favorites: 35,
            status: 'published',
            updater: '李明明',
            updateTime: '2024-10-09 10:09:09',
          },
          {
            id: 5,
            name: '金慧福养老机构（朝阳店）',
            services: ['24h监护', '特殊护理'],
            shares: 100,
            favorites: 35,
            status: 'published',
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
          services: [],
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
      filteredInstitutions() {
        return this.tableData.filter(institution => {
          // 筛选状态
          if (this.statusFilter && institution.status !== this.statusFilter) {
            return false;
          }
  
          // 筛选日期范围
          if (this.dateRange && institution.updateTime) {
            const institutionDate = new Date(institution.updateTime);
            const startDate = this.dateRange[0];
            const endDate = this.dateRange[1];
            if (institutionDate < startDate || institutionDate > endDate) {
              return false;
            }
          }
  
          // 筛选关键字
          if (this.searchKeyword && !institution.name.includes(this.searchKeyword)) {
            return false;
          }
  
          return true;
        });
      },
    },
    methods: {
      getServiceType(service) {
        if (service === '24h监护') {
          return 'success';
        } else if (service === '特殊护理') {
          return 'warning';
        }
        return '';
      },
      searchInstitutions() {
        // 搜索功能
      },
      resetSearch() {
        this.statusFilter = '';
        this.dateRange = '';
        this.searchKeyword = '';
      },
      addNewInstitution() {
        this.dialogTitle = '新增机构';
        this.form = {
          id: null,
          name: '',
          services: [],
          status: 'published',
        };
        this.dialogVisible = true;
      },
      editInstitution(row) {
        this.dialogTitle = '编辑机构';
        this.form = { ...row };
        this.dialogVisible = true;
      },
      deleteInstitution(row) {
        this.$confirm('确定要删除此机构吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteInstitution(row.id).then(res => {
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
      saveInstitution() {
        if (this.form.id) {
          // 编辑
          updateInstitution(this.form.id, this.form).then(res => {
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
          addInstitution(this.form).then(res => {
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
  
        this.$confirm('确定要批量删除选中的机构吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          const ids = this.selectedRows.map(row => row.id);
          batchDeleteInstitutions(ids).then(res => {
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
  .institution-container {
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