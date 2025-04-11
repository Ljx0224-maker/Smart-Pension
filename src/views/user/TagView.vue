<template>
  <div class="tag-container">
    <div class="filter-section">
      <div class="page-header">
        <h2>标签管理</h2>
      </div>
      <div class="action-section">
        <el-button type="primary" @click="addTag">新增标签</el-button>
      </div>
    </div>

    <div class="action-table-box">
      <el-table :data="tableData" style="width: 100%" ref="table">
        <el-table-column type="selection" width="55" v-model="selectedTags" />
        <el-table-column label="标签名称" prop="tagName" width="150" />
        <el-table-column label="用户数量" prop="usersNum" width="150" />
        <el-table-column label="最后更新人" prop="lastUpdatedBy" width="180" />
        <el-table-column label="最后更新时间" prop="lastUpdatedTime" width="200">
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
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <div class="operation-links">
              <span class="edit-link" @click="editTag(scope.row)">编辑</span>
              <span class="delete-link" @click="deleteTagHandler(scope.row.tagId)">删除</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getTagsList, addOrUpdateTag, deleteTag } from '@/api/user'

interface Tag {
  tagId: string
  tagName: string
  usersNum: number
  lastUpdatedBy: string
  lastUpdatedTime: string
  status: boolean
}

const tableData = ref<Tag[]>([]) // 标签数据
const selectedTags = ref<Tag[]>([]) // 选中的标签
const table = ref(null) // 表格引用

// 获取标签列表
const fetchTags = async () => {
  try {
    const res = await getTagsList();
    console.log('后端返回的数据:', res); // 调试日志
    if (res.code === 200) {
      // 映射 lastUpdatedAt 到 lastUpdatedTime
      tableData.value = res.data.map((tag: any) => ({
        ...tag,
        lastUpdatedTime: tag.lastUpdatedAt || '无', // 如果没有 lastUpdatedAt，设置默认值
      }));
    } else {
      ElMessage.error('获取标签列表失败: ' + res.message);
    }
  } catch (error) {
    console.error('接口调用失败:', error); // 调试日志
    ElMessage.error('获取标签列表失败: ' + error.message);
  }
}

// 格式化日期
const formatDate = (dateString: string) => {
  if (!dateString || dateString === '无') return '无';
  const date = new Date(dateString);
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
const addTag = () => {
  ElMessageBox.prompt('请输入标签名称', '新增标签', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  })
    .then(async ({ value }) => {
      try {
        const newTag = { tagName: value, status: true }
        const res = await addOrUpdateTag(newTag)
        if (res.code === 200) {
          ElMessage.success('新增标签成功')
          fetchTags() // 重新获取标签列表
        } else {
          ElMessage.error('新增标签失败: ' + res.message)
        }
      } catch (error) {
        ElMessage.error('新增标签失败: ' + error.message)
      }
    })
    .catch(() => {
      ElMessage.info('已取消新增标签')
    })
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
        const updatedTag = { ...row, tagName: value }
        const res = await addOrUpdateTag(updatedTag)
        if (res.code === 200) {
          ElMessage.success('编辑标签成功')
          fetchTags() // 重新获取标签列表
        } else {
          ElMessage.error('编辑标签失败: ' + res.message)
        }
      } catch (error) {
        ElMessage.error('编辑标签失败: ' + error.message)
      }
    })
    .catch(() => {
      ElMessage.info('已取消编辑标签')
    })
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
        const res = await deleteTag(tagId)
        if (res.code === 200) {
          ElMessage.success('删除标签成功')
          fetchTags() // 重新获取标签列表
        } else {
          ElMessage.error('删除标签失败: ' + res.message)
        }
      } catch (error) {
        ElMessage.error('删除标签失败: ' + error.message)
      }
    })
    .catch(() => {
      ElMessage.info('已取消删除标签')
    })
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
