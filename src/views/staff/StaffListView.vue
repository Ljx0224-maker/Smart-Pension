<template>
  <div class="staff-container">
    <div class="filter-section">
      <div class="page-header">
        <h2>服务人员管理</h2>
      </div>

      <div class="filter-box">
        <div class="filter-row">
          <div class="filter-item">
            <span>服务类型</span>
            <el-select v-model="filter.serviceType" placeholder="请选择" style="width: 200px;">
              <el-option label="全部" value=""></el-option>
              <el-option label="家政护工" value="domestic"></el-option>
              <el-option label="康复理疗" value="rehabilitation"></el-option>
              <el-option label="上门体检" value="home-examination"></el-option>
            </el-select>
          </div>

          <div class="filter-item">
            <span style="margin-left: 70px;">标签</span>
            <el-select v-model="filter.tag" placeholder="请选择" style="width: 200px;">
              <el-option label="全部" value=""></el-option>
              <el-option label="金牌家政" value="gold"></el-option>
              <el-option label="资深理疗师" value="senior"></el-option>
              <el-option label="专业体检师" value="professional"></el-option>
            </el-select>
          </div>
        </div>

        <div class="filter-row">
          <div class="filter-item">
            <span>加入日期</span>
            <el-date-picker
              v-model="filter.joinDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 300px;"
            ></el-date-picker>
          </div>

          <div class="filter-item">
            <el-input v-model="filter.keyword" placeholder="请输入关键字" style="width: 300px;"></el-input>
            <el-button type="primary" @click="search" style="margin-left: 10px;">
              <el-icon><Search/></el-icon>
            </el-button>
            <el-button @click="resetFilters" style="margin-left: 10px;">
              <el-icon><RefreshLeft/></el-icon>
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="action-table-box">
      <div class="action-section">
        <div class="action-buttons">
          <el-button type="primary" @click="addStaff">新增</el-button>
          <el-button @click="batchDelete" :disabled="selectedRows.length === 0">批量删除</el-button>
        </div>
      </div>

      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="服务人员信息"></el-table-column>
        <el-table-column prop="staffId" label="服务人员ID"></el-table-column>
        <el-table-column prop="serviceType" label="服务类型"></el-table-column>
        <el-table-column prop="tag" label="标签">
          <template #default="scope">
            <el-tag v-for="tag in scope.row.tag.split(',')" :key="tag" :type="getTagType(tag)">{{ tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="region" label="负责区域"></el-table-column>
        <el-table-column prop="joinMethod" label="加入方式"></el-table-column>
        <el-table-column prop="joinTime" label="加入时间"></el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              :active-text="'启用'"
              :inactive-text="'禁用'"
              @change="handleStatusChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="text" @click="editStaff(scope.row)">编辑</el-button>
            <el-button type="text" @click="viewOrders(scope.row)">工单记录</el-button>
            <el-button type="text" @click="viewCommissions(scope.row)">佣金记录</el-button>
            <el-button type="text" @click="removeStaff(scope.row)" style="color: #FFB800;">删除</el-button>
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
import { getStaffList, deleteStaff } from '@/api/staff';

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      filter: {
        serviceType: '',
        tag: '',
        joinDate: [],
        keyword: '',
      },
      selectedRows: [],
    };
  },
  components: {
    Search,
    RefreshLeft,
  },
  methods: {
    getTagType(tag) {
      if (tag === '金牌家政') {
        return 'success';
      } else if (tag === '资深理疗师') {
        return 'warning';
      } else if (tag === '专业体检师') {
        return 'info';
      }
      return '';
    },
    search() {
      this.currentPage = 1;
      this.loadStaffList();
    },
    resetFilters() {
      this.filter = {
        serviceType: '',
        tag: '',
        joinDate: [],
        keyword: '',
      };
      this.loadStaffList();
    },
    addStaff() {
      this.$router.push('/staff/addstaff');
    },
    editStaff(row) {
      console.log('编辑服务人员', row);
      // 跳转到编辑页面
    },
    removeStaff(row) {
      ElMessageBox.confirm(
        '确定要删除此服务人员吗?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        deleteStaff(row.staffId).then(res => {
          if (res.code === 200) {
            ElMessage.success('删除成功');
            this.loadStaffList();
          } else {
            ElMessage.error('删除失败');
          }
        }).catch(err => {
          console.error('Delete error:', err);
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

      ElMessageBox.confirm('确定要批量删除选中的服务人员吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const staffIds = this.selectedRows.map(row => row.staffId);
        deleteStaff(staffIds).then(res => {
          if (res.code === 200) {
            ElMessage.success('批量删除成功');
            this.loadStaffList();
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
      this.loadStaffList();
    },
    handleStatusChange(row) {
      const staffData = {
        ...row,
        tag: row.tag.split(','),
      };
      // 更新状态的逻辑
    },
    loadStaffList() {
      const params = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        params: {
          serviceType: this.filter.serviceType,
          tag: this.filter.tag,
          keyword: this.filter.keyword,
        },
      };

      if (this.filter.joinDate && this.filter.joinDate.length > 0) {
        params.params.startDate = this.filter.joinDate[0];
        params.params.endDate = this.filter.joinDate[1];
      }

      getStaffList(params).then(res => {
        if (res.code === 200) {
          this.tableData = (res.data.records || []).map(item => ({
            ...item,
            tag: item.tag || '', // 确保 tag 字段存在
          }));
          this.total = res.data.total || 0;
        } else {
          ElMessage.error('获取数据失败');
        }
      });
    },
    viewOrders(row) {
      console.log('查看工单记录', row);
      // 跳转到工单记录页面
    },
    viewCommissions(row) {
      console.log('查看佣金记录', row);
      // 跳转到佣金记录页面
    },
  },
  mounted() {
    this.loadStaffList();
  },
};
</script>

<style scoped>
.staff-container {
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