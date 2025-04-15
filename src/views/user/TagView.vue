<template>
  <div class="tag-container">
    <div class="filter-section">
      <div class="page-header">
        <h2>标签管理</h2>
      </div>
      <div class="action-section">
        <el-button type="primary" @click="addTag">新增标签</el-button>
        <el-button >批量操作</el-button>
      </div>
    </div>

    <div class="action-table-box">
      <el-table :data="paginatedTableData" style="width: 100%" ref="table">
        <el-table-column type="selection" width="55" v-model="selectedTags" />
        <el-table-column label="标签名称" prop="tagName" width="180" />
        <el-table-column label="用户数量" prop="usersNum" width="150" />
        <el-table-column label="最后更新人" prop="lastUpdatedBy" width="180">
          <template #default="scope">
            <span>{{ scope.row.lastUpdatedBy || '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最后更新时间" prop="lastUpdatedTime" width="240">
          <template #default="scope">
            <span>{{ formatDate(scope.row.lastUpdatedTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="200">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              :active-text="'启用'"
              :inactive-text="'禁用'"
              :active-value="true"
              :inactive-value="false"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <div class="operation-links">
              <span class="edit-link" @click="editTag(scope.row)">编辑</span>
              <span class="delete-link" @click="deleteTagHandler(scope.row.tagId)">删除</span>
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
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
// 添加对 computed 的导入
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'; 
import { ElMessage, ElMessageBox } from 'element-plus'
import { getTagsList, addOrUpdateTag, deleteTag } from '@/api/user.js'
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore(); 

interface Tag {
  tagId: string
  tagName: string
  usersNum: number
  lastUpdatedBy: string
  lastUpdatedTime: string
  status: boolean
}

const tableData = ref<Tag[]>([]) 
const selectedTags = ref<Tag[]>([]) 
const table = ref(null) 
const currentPage = ref(1); 
const pageSize = ref(10); 
// 根据 tableData 的长度计算总数
const total = computed(() => tableData.value.length); 

// 当前页面的数据
const paginatedTableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return tableData.value.slice(start, end);
});

// 获取标签列表
const fetchTags = async () => {
  try {
    // 不传递分页参数
    const res = await getTagsList(); 
    console.log('后端返回的数据:', res); 
    if (res.code === 200) {
      tableData.value = res.data.map((tag: any) => ({
        ...tag,
        lastUpdatedTime: tag.lastUpdatedAt || '无', 
        status: tag.usersNum >= 1, 
      }));
    } else {
      ElMessage.error('获取标签列表失败: ' + res.message);
    }
  } catch (error) {
    console.error('API 调用失败:', error); 
    ElMessage.error('获取标签列表失败: ' + error.message);
  }
}

// 格式化日期
const formatDate = (dateString: string) => {
  if (!dateString || dateString === '无') return '无';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '无'; 
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  return date.toLocaleDateString('zh-CN', options);
}

// 新增标签
const addTag = async () => {
  try {
    const userInfo = store.state.userInfo;
    const newTag: Tag = {
      tagId: '', // The backend should generate a unique ID
      tagName: '',
      usersNum: 0,
      lastUpdatedBy: userInfo?.staffName || 'Unknown',
      lastUpdatedTime: new Date().toISOString(),
      status: false
    };

    ElMessageBox.prompt('请输入新的标签名称', '新增标签', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputValue: newTag.tagName,
    }).then(async ({ value }) => {
      if (value) {
        newTag.tagName = value;
        const res = await addOrUpdateTag(newTag);
        if (res.code === 200) {
          ElMessage.success('新增标签成功');
          fetchTags(); 
        } else {
          ElMessage.error('新增标签失败: ' + res.message);
        }
      }
    }).catch(() => {
      ElMessage.info('已取消新增标签');
    });
  } catch (error) {
    ElMessage.error('操作失败: ' + error.message);
  }
}

// 编辑标签
const editTag = (row: Tag) => {
  ElMessageBox.prompt('请输入新的标签名称', '编辑标签', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: row.tagName,
  })
    .then(async ({ value }) => {
      try {
        const userInfo = store.state.userInfo;
        const updatedTag = { 
          ...row, 
          tagName: value,
          // Set lastUpdatedBy to the current user's staffName
          lastUpdatedBy: userInfo?.staffName || 'Unknown' 
        };
        const res = await addOrUpdateTag(updatedTag);
        if (res.code === 200) {
          ElMessage.success('编辑标签成功');
          fetchTags(); 
        } else {
          ElMessage.error('编辑标签失败: ' + res.message);
        }
      } catch (error) {
        ElMessage.error('编辑标签失败: ' + error.message);
      }
    })
    .catch(() => {
      ElMessage.info('已取消编辑标签');
    });
}

// 删除标签
const deleteTagHandler = (tagId: string) => {
  ElMessageBox.confirm('确定要删除此标签吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      try {
        const res = await deleteTag(tagId); 
        if (res.code === 200) {
          ElMessage.success('删除标签成功');
          fetchTags(); 
        } else {
          ElMessage.error('删除标签失败: ' + res.message);
        }
      } catch (error) {
        ElMessage.error('删除标签失败: ' + error.message);
      }
    })
    .catch(() => {
      ElMessage.info('已取消删除标签');
    });
};

// 分页处理
const handlePageChange = (page: number) => {
  currentPage.value = page; 
}

// 页面加载时获取标签列表
onMounted(() => {
  fetchTags()
})
</script>

<style scoped>
.tag-container {
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

.action-section {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 15px;
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