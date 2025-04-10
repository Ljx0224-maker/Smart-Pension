<template>
  <div class="staff-list-view">
    <el-card class="box-card" shadow="hover">
      <div class="clearfix">
        <span>服务人员管理</span>
        <el-button style="float: right;" type="primary" @click="addStaff">新增</el-button>
        <el-button style="float: right; margin-right: 10px;" type="default" @click="batchAction">批量操作</el-button>
      </div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="服务类型">
          <el-select v-model="filter.serviceType" placeholder="请选择">
            <el-option label="家政护工" value="domestic"></el-option>
            <el-option label="康复理疗" value="rehabilitation"></el-option>
            <el-option label="上门体检" value="home-examination"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签">
          <el-select v-model="filter.tag" placeholder="请选择">
            <el-option label="金牌家政" value="gold"></el-option>
            <el-option label="资深理疗师" value="senior"></el-option>
            <el-option label="专业体检师" value="professional"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="加入日期">
          <el-date-picker v-model="filter.joinDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filter.keyword" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="resetFilters">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="服务人员信息" width="120"></el-table-column>
        <el-table-column prop="staffId" label="服务人员ID" width="120"></el-table-column>
        <el-table-column prop="serviceType" label="服务类型" width="120"></el-table-column>
        <el-table-column prop="tag" label="标签" width="100"></el-table-column>
        <el-table-column prop="region" label="负责区域" width="120"></el-table-column>
        <el-table-column prop="joinMethod" label="加入方式" width="120"></el-table-column>
        <el-table-column prop="joinTime" label="加入时间" width="150"></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-switch v-model="scope.row.status" :active-text="'启用'" :inactive-text="'禁用'"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="mini" type="primary" link @click="editStaff(scope.row)">编辑</el-button>
            <el-button size="mini" type="primary" link @click="viewOrders(scope.row)">工单记录</el-button>
            <el-button size="mini" type="primary" link @click="viewCommissions(scope.row)">佣金记录</el-button>
            <el-button size="mini" type="danger" link @click="removeStaff(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页显示 -->
      <el-pagination
        background
        v-model:current-page="currentPage"
        layout="prev, pager, next"
        :total="total"
        @current-change="handlePageChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getStaffList, deleteStaff } from '@/api/staff';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

export default {
  setup() {
    const router = useRouter();
    const tableData = ref([]);
    const currentPage = ref(1);
    const total = ref(0);
    const filter = ref({
      serviceType: '',
      tag: '',
      joinDate: [],
      keyword: ''
    });

    const fetchStaffList = async (params) => {
      try {
        const res = await getStaffList(params);
        if (res.code === 200) {
          tableData.value = res.data.records || [];
          total.value = res.data.total || 0;
        } else {
          ElMessage.error('获取服务人员列表失败');
          tableData.value = [];
        }
      } catch (error) {
        console.error('获取服务人员列表失败:', error);
        ElMessage.error('获取服务人员列表失败');
        tableData.value = [];
      }
    };

    onMounted(() => {
      fetchStaffList({ ...filter.value, page: currentPage.value });
    });

    const search = () => {
      fetchStaffList({ ...filter.value, page: 1 });
      currentPage.value = 1;
    };

    const resetFilters = () => {
      filter.value = {
        serviceType: '',
        tag: '',
        joinDate: [],
        keyword: ''
      };
      fetchStaffList({ page: 1 });
      currentPage.value = 1;
    };

    const handlePageChange = (newPage) => {
      fetchStaffList({ ...filter.value, page: newPage });
    };

    const addStaff = () => {
      router.push('/staff/add');
    };

    const editStaff = (row) => {
      router.push({ path: '/staff/edit', query: { staffId: row.staffId } });
    };

    const viewOrders = (row) => {
      router.push({ path: '/staff/orders', query: { staffId: row.staffId } });
    };

    const viewCommissions = (row) => {
      router.push({ path: '/staff/commissions', query: { staffId: row.staffId } });
    };

    const removeStaff = async (row) => {
      try {
        const res = await deleteStaff(row.staffId);
        if (res.success) {
          ElMessage.success('服务人员删除成功');
          fetchStaffList({ ...filter.value, page: currentPage.value });
        } else {
          ElMessage.error('服务人员删除失败');
        }
      } catch (error) {
        console.error('删除服务人员失败:', error);
        ElMessage.error('删除服务人员失败');
      }
    };

    return {
      tableData,
      currentPage,
      total,
      filter,
      search,
      resetFilters,
      handlePageChange,
      addStaff,
      editStaff,
      viewOrders,
      viewCommissions,
      removeStaff
    };
  }
};
</script>

<style scoped>
.staff-list-view {
  padding: 20px;
}

.box-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>