<template>
  <div class="staff-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2>员工列表</h2>
      <el-button type="primary" @click="addStaff" style="margin-left: 20px;">新增员工</el-button>
    </div>

    <!-- 搜索和过滤区域 -->
    <div class="filter-section">
      <div class="filter-box">
        <div class="filter-row">
          <div class="filter-item">
            <span>搜索关键字</span>
            <el-input 
              v-model="filter.keyword" 
              placeholder="搜索姓名/ID" 
              style="width: 300px;"
            />
          </div>
          <div class="filter-item">
            <el-button type="primary" @click="search" style="margin-left: 10px;">
              <el-icon><Search /></el-icon>
            </el-button>
            <el-button @click="resetFilters" style="margin-left: 10px;">
              <el-icon><RefreshLeft /></el-icon>
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 表格展示 -->
    <div class="action-table-box">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="staffId" label="员工ID" width="150" />
        <el-table-column prop="staffName" label="姓名" width="150">
          <template #default="scope">
            {{ scope.row.staffName || '未填写' }}
          </template>
        </el-table-column>
        <el-table-column prop="position" label="职位" width="180"> 
          <template #default="scope">
            {{ scope.row.position || '未填写' }}
          </template>
        </el-table-column>
        <el-table-column prop="phoneNumber" label="联系电话" width="180">
          <template #default="scope">
            <!-- 将电话号码转为字符串显示 -->
            {{ String(scope.row.phoneNumber) }} 
          </template>
        </el-table-column>
        <el-table-column prop="lastUpdatedAt" label="最后更新时间" width="200">
          <template #default="scope">
            {{ scope.row.lastUpdatedAt ? new Date(scope.row.lastUpdatedAt).toLocaleString() : '未知' }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <!-- 校验状态值 -->
            {{ ['在职', '离职'].includes(scope.row.status) ? scope.row.status : '未知' }} 
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template #default="scope">
            <div class="operation-links">
              <span class="edit-link" @click="editStaff(scope.row)">编辑</span>
              <span class="delete-link" @click="deleteStaff(scope.row)">删除</span>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        background
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        layout="total, prev, pager, next, jumper"
        @current-change="loadStaffList"
      />
    </div>
  </div>
</template>

<script>
import { getStaffList, deleteStaff } from '@/api/setting';
import { Search, RefreshLeft } from '@element-plus/icons-vue';

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      filter: {
        keyword: ''
      }
    };
  },
  components: {
    Search,
    RefreshLeft
  },
  watch: {
    '$route.query.refresh': {
      handler(newVal) {
        if (newVal) {
          this.loadStaffList();
          // 清除刷新标识
          this.$router.push({
            path: '/settings/pepolelist',
            query: {}
          });
        }
      },
      immediate: true
    }
  },
  methods: {
    async loadStaffList() {
      try {
        const res = await getStaffList();
        console.log('从后端获取的数据:', res); // 调试用，查看数据
        if (Array.isArray(res)) {
          this.total = res.length;
          const start = (this.currentPage - 1) * this.pageSize;
          const end = start + this.pageSize;
          this.tableData = res.slice(start, end);
        } else {
          this.$message.error('数据加载失败: 数据格式错误');
        }
      } catch (error) {
        console.error('接口错误:', error);
        this.$message.error('数据加载失败');
      }
    },
    async deleteStaff(row) {
      try {
        await this.$confirm('确认删除该员工吗？', '提示', { type: 'warning' });
        const res = await deleteStaff(row.staffId);
        if (res.code === 200) {
          this.$message.success('删除成功');
          this.loadStaffList();
        } else {
          this.$message.error('删除失败: ' + res.message);
        }
      } catch (error) {
        if (error !== 'cancel') {
          console.error('删除员工时发生错误:', error);
          this.$message.error('删除失败');
        } else {
          this.$message.info('已取消删除');
        }
      }
    },
    search() {
      this.currentPage = 1;
      this.loadStaffList();
    },
    resetFilters() {
      this.filter.keyword = '';
      this.loadStaffList();
    },
    editStaff(row) {
      console.log('传递的员工信息:', row);
      this.$router.push({
        name: 'EditStaffView',
        query: { staffInfo: JSON.stringify(row) }
      });
    },
    addStaff() {
      this.$router.push('/settings/editstaff');
    }
  },
  mounted() {
    this.loadStaffList();
  }
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
  width: 100px;
  display: inline-block;
}

.action-table-box {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.el-table {
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 15px;
}

.el-pagination {
  text-align: center;
}

.operation-links {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.edit-link {
  color: #409eff;
  cursor: pointer;
  text-decoration: none;
}

.edit-link:hover {
  color: #66b1ff;
}

.delete-link {
  color: #ff9d4d;
  cursor: pointer;
  text-decoration: none;
}

.delete-link:hover {
  color: #ff7a3d;
}
</style>
