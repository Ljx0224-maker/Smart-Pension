<script>
import { getUserList } from '@/api/user'
export default {
    data() {
        return {
            userlist: [],
            currentPage: 1

        }
    },
    mounted () {
        getUserList().then(res => {
            console.log(res.data);
            this.userlist = res.data
        })
    },
    computed: {
        computedTableData () {
            return this.userlist.slice((this.currentPage - 1) * 10,(this.currentPage - 1) * 10 + 10)
        }
    }
}


</script>
<template>
 <div>
    <div>
        用户列表
    </div>

    <el-table :data="computedTableData" style="width: 100%">
    <el-table-column prop="telcode" label="用户名"  />
    <el-table-column prop="tel" label="手机号"  />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="userid" label="用户 id" />
  </el-table>

   <!-- 用作分页显示 -->
   <el-pagination
  background
   v-model:current-page="currentPage"
  layout="prev, pager, next"
  :total="userlist.length">
</el-pagination>
 </div>
</template>