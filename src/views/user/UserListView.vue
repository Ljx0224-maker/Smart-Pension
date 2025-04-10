<template>
    <div class="user-list-view">
      <el-card class="box-card" shadow="hover">
        <div class="clearfix">
          <span>全部用户</span>
          <el-button style="float: right;" type="primary" @click="addUser">新增</el-button>
          <el-button style="float: right; margin-right: 10px;" @click="batchAction">批量操作</el-button>
        </div>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="filter.keyword" placeholder="请输入关键字"></el-input>
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button @click="resetFilters">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="computedTableData" style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="avatar" label="用户信息" width="150">
            <template #default="scope">
              <img :src="scope.row.avatar" alt="用户头像" class="user-avatar">
              <div>{{ scope.row.nickname }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="userId" label="ID" width="180"></el-table-column>
          <el-table-column prop="realName" label="真实姓名" width="120"></el-table-column>
          <el-table-column prop="tags" label="用户标签" width="180"></el-table-column>
          <el-table-column prop="lastLoginTime" label="最后登录时间" width="180"></el-table-column>
          <el-table-column prop="status" label="用户状态" width="100">
            <template #default="scope">
              <el-switch v-model="scope.row.status" :active-text="'启用'" :inactive-text="'禁用'"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template #default="scope">
              <el-button size="mini" type="primary" @click="viewUserDetail(scope.row)">用户详情</el-button>
              <el-button size="mini" @click="editUser(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteUser(scope.row.userId)">删除</el-button>
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
  import { ref, onMounted, computed } from 'vue';
  import { getUserList, deleteUser, getUserDetail, addUser } from '@/api/user';
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  
  export default {
    setup() {
      const router = useRouter();
      const tableData = ref([]);
      const currentPage = ref(1);
      const filter = ref({
        keyword: ''
      });
      const total = ref(0); // 总记录数
  
      // 计算属性，用于分页
      const computedTableData = computed(() => {
        return tableData.value;
      });
  
      // 获取用户列表
      const fetchUserList = async (params) => {
        try {
          const res = await getUserList(params);
          if (res.code === 200 && Array.isArray(res.data)) {
            tableData.value = res.data;
            total.value = res.total; // 设置总记录数
          } else {
            console.error('返回的数据格式不正确:', res);
            tableData.value = [];
          }
        } catch (error) {
          console.error('获取用户列表失败:', error);
          tableData.value = [];
        }
      };
  
      onMounted(() => {
        fetchUserList({ keyword: filter.keyword, page: currentPage.value });
      });
  
      const search = () => {
        fetchUserList({ keyword: filter.keyword, page: 1 });
        currentPage.value = 1; // 重置到第一页
      };
  
      const resetFilters = () => {
        filter.keyword = '';
        fetchUserList({ keyword: '', page: 1 });
        currentPage.value = 1; // 重置到第一页
      };
  
      const handlePageChange = (newPage) => {
        fetchUserList({ keyword: filter.keyword, page: newPage });
      };
  
      const addUser = () => {
        // 跳转到添加用户页面
        router.push('/user/adduser');
      };
  
      // 删除用户
      const deleteUser = async (userId) => {
        try {
          const res = await deleteUser(userId);
          if (res.success) {
            ElMessage.success('用户删除成功');
            fetchUserList({ keyword: filter.keyword, page: currentPage.value });
          } else {
            ElMessage.error('用户删除失败');
          }
        } catch (error) {
          console.error('删除用户失败:', error);
          ElMessage.error('删除用户失败');
        }
      };
  
      // 编辑用户
      const editUser = async (user) => {
        // 跳转到编辑用户页面并传递用户ID
        router.push({ path: '/user/edituser', query: { userId: user.userId } });
      };
  
      return {
        tableData,
        currentPage,
        filter,
        total,
        computedTableData,
        search,
        resetFilters,
        handlePageChange,
        addUser,
        deleteUser,
        editUser
      };
    }
  };
  </script>
  
  <style scoped>
  .user-list-view {
    padding: 20px;
  }
  
  .box-card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  
  .user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  </style>
