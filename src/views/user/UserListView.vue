<template>
    <div class="user-container">
      <div class="filter-section">
        <div class="page-header">
          <h2>用户列表</h2>
        </div>
  
        <div class="filter-box">
          <div class="filter-row">
         
  
            <div class="filter-item">
              <span style="margin-left: 7px;">用户标签</span>
              <el-select v-model="tagFilter" placeholder="请选择" style="width: 202px;">
                <el-option label="全部" value=""></el-option>
                <el-option label="VIP" value="VIP"></el-option>
                <el-option label="普通" value="普通"></el-option>
              </el-select>
            </div>
          </div>
  
          <div class="filter-row">
            <div class="filter-item">
              <span style="margin-left: 7px;">登录时间</span> <!-- 调整 margin-right -->
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
              <el-button type="primary" @click="searchUsers" style="margin-left: 10px;">
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
            <el-button type="primary" @click="addUser">新增</el-button>
            <el-button @click="batchDelete">批量操作</el-button>
          </div>
        </div>
  
        <el-table
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="用户信息" width="150">
            <template #default="scope">
              <img :src="scope.row.avatar" alt="用户头像" class="user-avatar">
              <div>{{ scope.row.nickname }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="userId" label="ID" width="180"></el-table-column>
          <el-table-column prop="realName" label="真实姓名" width="120"></el-table-column>
          <el-table-column prop="tags" label="用户标签" width="180">
            <template #default="scope">
              <div>
                <el-tag
                  v-for="(tag, index) in scope.row.tags"
                  :key="index"
                  type="info"
                  style="margin-right: 5px;"
                >
                  {{ tag }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="lastLoginTime" label="最后登录时间" width="180"></el-table-column>
          <el-table-column label="操作" width="240">
            <template #default="scope">
              <div class="operation-links">
                <span class="edit-link" @click="editUser(scope.row)">编辑</span>
                <span class="delete-link" @click="deleteUser(scope.row.userId)">删除</span>
                <el-button
                  type="text"
                  size="small"
                  @click="editTags(scope.row)"
                  style="color: #409eff;"
                >
                  标签编辑
                </el-button>
              </div>
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

    <el-dialog
      title="编辑用户标签"
      v-model="tagDialogVisible"
      width="500px"
    >
      <el-form :model="tagForm">
        <el-form-item label="标签列表">
          <el-select
            v-model="tagForm.selectedTags"
            multiple
            placeholder="请选择标签"
            style="width: 100%;"
          >
            <el-option
              v-for="tag in allTags"
              :key="tag.tagId"
              :label="tag.tagName"
              :value="tag.tagName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div  class="dialog-footer">
        <el-button @click="tagDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveTags">保存</el-button>
      </div>
    </el-dialog>
  </template>
  
  <script>
  import { ElMessage } from 'element-plus';
  import { ElMessageBox } from 'element-plus';
  import { Search, RefreshLeft } from '@element-plus/icons-vue';
  import { getUserList, deleteUser, getUserDetail, addUser, getTagsList, addOrUpdateTag } from '@/api/user'; // 引入接口
  import { useRouter, useRoute } from 'vue-router';
  import { ref } from 'vue';

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
        selectedRows: [],
        tagDialogVisible: false, // 控制标签弹出框显示
        tagForm: {
          userId: '', // 当前编辑的用户ID
          selectedTags: [], // 当前用户的标签
        },
        allTags: [], // 所有标签列表
        tagMap: {}, // 标签映射
        userForm: ref({
          nickname: '',
          username: '', // 添加 username 字段
          phone: '',
          avatar: '',
          realName: '',
          idNumber: '',
          gender: '',
          birthDate: '',
          address: '',
          height: '',
          weight: '',
          origin: '',
          ethnicity: '',
          education: '',
          maritalStatus: '',
          occupation: '',
          company: '',
          emergencyContact: '',
          emergencyPhone: '',
          status: true,
          password: '',
          notes: '',
        }),
      };
    },
    components: {
      Search,
      RefreshLeft,
    },
    computed: {
  filteredUsers() {
    return this.tableData.filter(user => {
      // 筛选状态
      if (this.statusFilter && user.status !== this.statusFilter) {
        return false;
      }

      // 筛选标签
      if (this.tagFilter && !user.tags.some(tag => tag.tagName === this.tagFilter)) {
        return false;
      }

      // 筛选日期范围
      if (this.dateRange && user.lastLoginTime) {
        const userDate = new Date(user.lastLoginTime);
        const startDate = this.dateRange[0];
        const endDate = this.dateRange[1];
        if (userDate < startDate || userDate > endDate) {
          return false;
        }
      }

      // 筛选关键字
      if (this.searchKeyword && !user.nickname.includes(this.searchKeyword)) {
        return false;
      }

      return true;
    }).map(user => ({
      ...user,
      // 将标签数组组合成一个字符串
      tagString: user.tags ? user.tags.map(tag => tag.tagName).join('、') : ''
    }));
  },
},
    methods: {
      // 搜索框
      searchUsers() {
        this.loadUsers();
      },
      // 重置搜索
      resetSearch() {
        this.statusFilter = '';
        this.tagFilter = '';
        this.dateRange = '';
        this.searchKeyword = '';
        this.loadUsers();
      },
      // 新增用户
      addUser() {
        this.$router.push('/user/adduser'); // 跳转到新增用户页面
      },
      // 编辑用户
      editUser(row) {
        if (!row.userId) {
          ElMessage.error('用户ID不存在');
          return;
        }
        this.$router.push({ path: '/user/adduser', query: { userId: row.userId } });
      },
      // 编辑用户标签
      editTags(row) {
        this.tagForm.userId = row.userId;
        this.tagForm.selectedTags = [...row.tags]; // 直接使用 tagName
        this.tagDialogVisible = true;
      },
      // 保存用户标签
      async saveTags() {
        try {
          const params = {
            userId: this.tagForm.userId,
            tags: this.tagForm.selectedTags.map(tagName => {
              const tag = this.allTags.find(tag => tag.tagName === tagName);
              return tag ? { tagId: tag.tagId, type: 'manual' } : null; // 设置 type 为 "manual"
            }).filter(tag => tag),
          };
          const res = await addOrUpdateTag(params);
          if (res.code === 200) {
            ElMessage.success('标签保存成功');
            this.tagDialogVisible = false;
            this.loadUsers(); // 重新加载用户列表
          } else {
            ElMessage.error('标签保存失败: ' + res.message);
          }
        } catch (error) {
          ElMessage.error('标签保存失败: ' + error.message);
        }
      },
      // 删除用户
      deleteUser(userId) {
        
        if (!userId) {
          ElMessage.error('用户ID不存在');
          return;
        }
        ElMessageBox.confirm(
          '确定要删除此用户吗?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
        ).then(() => {
          deleteUser(userId) // 调用 API
            .then(res => {
              if (res.code === 200) {
                ElMessage.success('删除成功');
                this.loadUsers(); // 重新加载用户列表
              } else {
                ElMessage.error('删除失败: ' + res.message);
              }
            })
            .catch(err => {
              console.error('删除接口错误:', err);
              ElMessage.error('删除失败');
            });
        }).catch(() => {
          ElMessage.info('已取消删除');
        });
      },
      // 分页选择
      handleSelectionChange(selection) {
        this.selectedRows = selection;
      },
      // 分页切换
      handlePageChange(page) {
        this.currentPage = page;
        this.loadUsers();
      },
      // 加载用户列表
      async loadUsers() {
        try {
          const res = await getUserList();
          if (res.code === 200) {
            this.tableData = res.data.map(item => ({
              ...item.user,
              tags: item.tags.map(tag => tag.tagName), // 提取标签名称
            }));
            this.total = this.tableData.length;
          } else {
            ElMessage.error('获取用户列表失败: ' + res.message);
          }
        } catch (error) {
          console.error('加载用户列表失败:', error);
          ElMessage.error('加载用户列表失败');
        }
      },
      // 加载标签列表
      async loadTags() {
        try {
          const res = await getTagsList();
          if (res.code === 200) {
            this.allTags = res.data.map(tag => ({
              tagId: tag.tagId,
              tagName: tag.tagName,
            }));
          } else {
            ElMessage.error('加载标签列表失败: ' + res.message);
          }
        } catch (error) {
          console.error('加载标签列表失败:', error);
          ElMessage.error('加载标签列表失败');
        }
      },
      // 加载用户详情
      async loadUserDetail() {
        const res = await getUserDetail(userId.toString());
        if (!userId) {
          ElMessage.error('用户ID不存在');
          return;
        }
        console.log('加载用户详情，用户ID:', userId); // 调试日志
        try {
          const res = await getUserDetail(userId.toString());
          if (res.success) {
            this.userForm = res.data;
          } else {
            ElMessage.error('获取用户详情失败: ' + res.message);
          }
        } catch (error) {
          ElMessage.error('获取用户详情失败: ' + error.message);
        }
      },
      // 保存用户信息
      async saveUser() {
        try {
          console.log('提交的用户数据:', userForm.value); // 调试日志
          if (!userForm.value.username || !userForm.value.password) {
            ElMessage.error('用户名或密码不能为空');
            return;
          }
          const res = await addUser(userForm.value);
          console.log('保存接口返回:', res); // 调试日志
          if (res.code === 200) {
            this.$router.push('/user/userlist'); // 返回用户列表页面
            ElMessage.success('用户信息保存成功');
          } else {
            ElMessage.error('用户信息保存失败: ' + res.message);
          }
        } catch (error) {
          console.error('保存用户失败:', error);
          ElMessage.error('保存用户失败');
        }
      },
    },
    mounted() {
      this.loadUsers();
      this.loadTags();
    },
  };
</script>

<style scoped>
.user-container {
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

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
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

.operation-links {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.el-tag {
  margin-bottom: 5px;
}

.dialog-footer {
  text-align: right;
}
</style>

