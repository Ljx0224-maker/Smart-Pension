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
        <el-table-column prop="name" label="服务人员姓名"></el-table-column>
        <el-table-column prop="staffId" label="服务人员ID"></el-table-column>
        <el-table-column prop="serviceType" label="服务类型"></el-table-column>
        <el-table-column prop="serviceArea" label="负责区域"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <div style="display: flex; align-items: center;">
              <el-switch
                v-model="scope.row.status"
                active-value="启用"
                inactive-value="禁用"
                @change="toggleStatus(scope.row)"
              ></el-switch>
              <span style="margin-left: 10px;">{{ scope.row.status }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="text" @click="editStaff(scope.row)">编辑</el-button>
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
      tableData: [], // 员工列表数据
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示条数
      total: 0, // 总记录数
      filter: {
        serviceType: '',
        tag: '',
        joinDate: [],
        keyword: '',
      },
      selectedRows: [], // 选中的行
    };
  },
  components: {
    Search,
    RefreshLeft,
  },
  methods: {
    // 跳转到新增服务人员页面
    addStaff() {
      this.$router.push('/staff/addstaff');
    },
    // 获取标签类型
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
    // 搜索
    search() {
      this.currentPage = 1;
      this.loadStaffList();
    },
    // 重置筛选条件
    resetFilters() {
      this.filter = {
        serviceType: '',
        tag: '',
        joinDate: [],
        keyword: '',
      };
      this.loadStaffList();
    },
    // 加载员工列表
    loadStaffList() {
      const params = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        params: {
          serviceType: this.filter.serviceType,
          keyword: this.filter.keyword,
        },
      };

      if (this.filter.joinDate && this.filter.joinDate.length > 0) {
        params.params.startDate = this.filter.joinDate[0];
        params.params.endDate = this.filter.joinDate[1];
      }

      getStaffList(params).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data || []; // 后端返回的员工列表
          this.total = res.total || 0; // 总记录数
        } else {
          ElMessage.error('获取数据失败');
        }
      }).catch((err) => {
        console.error('Error loading staff list:', err);
        ElMessage.error('加载员工列表时发生错误');
      });
    },
    // 删除单个员工
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
        deleteStaff(row.staffId).then((res) => {
          if (res.code === 200) {
            ElMessage.success('删除成功');
            this.loadStaffList();
          } else {
            ElMessage.error('删除失败');
          }
        }).catch((err) => {
          console.error('Delete error:', err);
        });
      }).catch(() => {
        ElMessage.info('已取消删除');
      });
    },
    // 切换状态
    toggleStatus(row) {
      const newStatus = row.status === '启用' ? '禁用' : '启用';
      const updatedRow = { ...row, status: newStatus };

      // 调用后端接口更新状态
      this.$confirm(`确定要将状态更改为 "${newStatus}" 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$api.addOrUpdateStaff(updatedRow).then((res) => {
          if (res.code === 200) {
            this.$message.success('状态更新成功');
            row.status = newStatus; // 更新本地状态
          } else {
            this.$message.error('状态更新失败');
          }
        }).catch((err) => {
          console.error('Error updating status:', err);
          this.$message.error('状态更新失败');
        });
      }).catch(() => {
        // 恢复原状态
        row.status = row.status === '启用' ? '禁用' : '启用';
      });
    },
    // 编辑员工信息
    editStaff(row) {
      if (!row.staffId) {
        this.$message.error('员工ID不存在');
        return;
      }
      this.$router.push({ path: '/staff/addstaff', query: { staffId: row.staffId } });
    },
    // 分页切换
    handlePageChange(page) {
      this.currentPage = page;
      this.loadStaffList();
    },
  },
  mounted() {
    this.loadStaffList(); // 页面加载时获取员工列表
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