<template>
  <div>
    <h2>标签管理</h2>
    <div style="margin-bottom: 20px;">
      <el-button type="primary" @click="addTag">新增标签</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" v-ref="table">
      <el-table-column type="selection" width="55" v-model="selectedTags" />
      <el-table-column label="标签名称" prop="tagName" width="150" />
      <el-table-column label="标签类型" prop="tagType" width="150" />
      <el-table-column label="用户数量" prop="userCount" width="150" />
      <el-table-column label="最后更新人" prop="lastUpdatedBy" width="180" />
      <el-table-column label="最后更新时间" prop="lastUpdatedTime" width="200">
        <!-- <template #default="scope">
          {{ scope.row.lastUpdatedTime | formatDate }}
        </template> -->
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
          <!-- 将编辑按钮改为链接按钮 -->
          <el-button size="small" type="text" @click="editTag(scope.row)">编辑</el-button>
          <!-- 将删除按钮改为红色的链接按钮 -->
          <el-button size="small" type="text" class="delete-btn" @click="deleteTag(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Tag {
  tagName: string
  tagType: string
  userCount: number
  lastUpdatedBy: string
  lastUpdatedTime: string
  status: boolean
}

const tableData: Tag[] = [
  {
    tagName: '标签1',
    tagType: '类型A',
    userCount: 100,
    lastUpdatedBy: '管理员A',
    lastUpdatedTime: '2025-04-08T10:30:00',
    status: true
  },
  {
    tagName: '标签2',
    tagType: '类型B',
    userCount: 50,
    lastUpdatedBy: '管理员B',
    lastUpdatedTime: '2025-04-07T09:20:00',
    status: false
  },
  {
    tagName: '标签3',
    tagType: '类型A',
    userCount: 75,
    lastUpdatedBy: '管理员C',
    lastUpdatedTime: '2025-04-06T08:15:00',
    status: true
  }
]

const selectedTags = ref<Tag[]>([])

const editTag = (row: Tag) => {
  console.log('编辑标签:', row)
  // 在这里可以弹出编辑表单等操作
}

const deleteTag = (row: Tag) => {
  console.log('删除标签:', row)
  // 在这里可以弹出确认框，或者直接删除
}

const addTag = () => {
  console.log('新增标签')
  // 在这里可以弹出新增表单，或者其他操作
}

</script>

<style scoped>
.el-table .cell {
  text-align: center;
}

/* 删除按钮的红色链接样式 */
.delete-btn {
  color: #f56c6c;
  border: none;
  padding: 0;
}
</style>
