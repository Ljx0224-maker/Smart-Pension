<script>
import { adminList,addAdmin,updateAdmin,deleteAdmin } from '@/api/user'

import { routes} from '@/router/index.js'
import { ElMessage } from 'element-plus'

export default {
    data () {
        return {
            tableData:[],
            //当前页
            currentPage: 1,
            //是否打开抽屉效果
            drawer: false,
            menus: routes[0].children,
            formData: {
                adminname: '',
                password: '',
                role: '',
                checkedkeys: ''
            },
            defaultCheckedKeys: [],
            interfaceType: '10086',//10086添加管理员 10010编辑管理员
            searchKeyword: '', // 搜索的关键字
            selectedRole: '', // 选中的角色
        }
    },
    methods: {

      filterData() {
    // 过滤逻辑
    adminList({
      keyword: this.searchKeyword,
      role: this.selectedRole,
    }).then(res => {
      this.tableData = res.data;
    });
  },
      addClick(){
        this.interfaceType = '10086'
        this.drawer = true
      },
        formatCheckedKeys (){
          //  console.log(this.$refs.treeRef.getCheckedNodes(true));
          const list = this.$refs.treeRef.getCheckedNodes(true)

          //用来放父级路由的label用的
          const tempList = []

          //最终结果用的
          const result = []
//list是我们选中的子路由
          list.forEach(item => {
            //parent是选中后子路由的父级路由
            const parent = this.menus.find(mitem =>{
              return mitem.children.some(child => child.label == item.label)
            })
            // console.log('111111',parent);
//判断当前父级路由是否在 tempList中已经有了

            if (tempList.includes(parent.label)){
              result.find(item => item.label ==parent.label).children.push(item)
            }else {
              //将对应内容放在tempList中
              console.log('1111',parent.label);
              tempList.push(parent.label)

              result.push({
                label:parent.label,
                path:parent.path,
                children: [item]
              })
            } 

            console.log(result);
            //将路由权限添加到 formData中
            this.formData.checkedKeys = result
          })
        },
        add (){

          
            //console.log(this.formData);

            this.formatCheckedKeys()

           // console.log(this.formData);
           this.formData.role = this.formData.role == '管理员' ? '1' : '2'


           addAdmin(this.formData).then(res => {
           // console.log(res);
            if (res.code == '200') {
              //成功
              ElMessage.success(res.message)
              //关闭抽屉效果
              this.drawer = false
              //重新获取最新的数据
             adminList().then(res => {
            //console.log(res);
            this.tableData = res.data
             })

            } else{
             ElMessage.error(res.message)
            }
           })
        },
        editClick(row) {

          this.interfaceType = '10010'
          this.drawer = true
         // console.log(row);


        
          this.formData.adminname = row.adminname
          this.formData.password = ''
          this.formData.role = row.role == '1' ? '管理员' : '超级管理员'
          //console.log(row)

          const checkedKeys = []
          row.checkedKeys.forEach(parent => {
            parent.children.forEach(item => {
              checkedKeys.push(item.path)
            })
          })

          //console.log(checkedKeys);
          this.defaultCheckedKeys = checkedKeys
        },
        close(){
          this.formData = {}
          this.defaultCheckedKeys = []

          if(this.$refs.treeRef) {
            this.$refs.treeRef.setCheckedKeys([])
          }
        },
       update (){
        console.log(this.formData);

        if(this.formData.adminname == '' || this.formData.password == ''){
            ElMessage.error('管理员名称和密码不能为空')
            return
        }
        this.formData.role = this.formData.role == '管理员' ? '1' : '2'

        this.formatCheckedKeys()

        updateAdmin(this.formData).then(res => {
          //console.log(res);
          //关闭抽屉效果
          this.drawer = false
              //重新获取最新的数据
             adminList().then(res => {
            //console.log(res);
            this.tableData = res.data
             })
        })
       },
       deleteClick(row){
       // console.log(row);
       deleteAdmin({ adminid: row.adminid }).then(res =>{
        if(res.code == 200){
                     //重新获取最新的数据
                     adminList().then(res => {
            //console.log(res);
            this.tableData = res.data
             })

        }else{
          ElMessage.error('删除失败...')
        }
       })

       }
    },
    mounted () {
        //获取管理员列表
        adminList().then(res => {
          // console.log(res);
            this.tableData = res.data

        })
    },
    computed: {
        computedTableData () {
            return this.tableData.slice((this.currentPage - 1) * 10,(this.currentPage - 1) * 10 + 10)
        }
    }

}
</script>
<template>
  <div>
    <div class="header">
      管理员列表
      <el-button type="success" @click="addClick">添加管理员</el-button>
      <div class="filter-container" style="margin-top: 10px;">
        <el-input 
          v-model="searchKeyword" 
          placeholder="请输入管理员姓名"
          style="width: 200px; margin-right: 10px;"/>
        
        <el-select 
          v-model="selectedRole" 
          placeholder="选择管理员角色"
          style="width: 180px; margin-right: 10px;">
          <el-option label="所有角色" value=""/>
          <el-option label="管理员" value="1"/>
          <el-option label="超级管理员" value="2"/>
        </el-select>

        <el-button 
          type="primary" 
          @click="filterData"
          style="margin-right: 10px;">
          <i class="el-icon-search"></i> 搜索
        </el-button>

        <el-button 
          type="info"
          @click="resetFilter">
          <i class="el-icon-refresh"></i> 重置
        </el-button>
      </div>
    </div>

        <el-table
      :data="computedTableData"
      style="width: 100%">
      <el-table-column
        type="index"
         :index="(currentPage - 1) * 10 + 1"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="adminname"
        label="管理员姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="role"
        label="管理员权限">
        <template #default="scope">
            <!--<div>
                     {{ scope.row.role == 1 ? '管理员' : '超级管理员'}}
            </div>-->
            <el-tag :type="scope.row.role == 1 ? 'warning' : 'success'"> {{ scope.row.role == 1 ? '管理员' : '超级管理员'}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        prop="role"
        label="操作">
        <template #default="scope">
            <el-button @click="editClick(scope.row)" size="small" type="primary" round>编辑</el-button>
            <el-button @click="deleteClick(scope.row)" size="small"  type="danger" round>删除</el-button>

       </template>
      </el-table-column>
      

    </el-table>
    <!-- 用作分页显示 -->
    <el-pagination
  background
   v-model:current-page="currentPage"
  layout="prev, pager, next"
  :total="tableData.length">
</el-pagination>

<!--抽屉效果-->
<el-drawer @close="close" v-model="drawer"
  >

  <template #header>
<h4>{{ interfaceType  == '10086' ? '添加管理员' :'编辑管理员' }}</h4>
  </template>
  <el-form  label-width="120px" >
    <el-form-item label="管理员账号">
      <el-input placeholder="请输入管理员账号" v-model="formData.adminname"/>
    </el-form-item>

    
    <el-form-item label="管理员密码">
      <el-input placeholder="请输入管理员密码" v-model="formData.password"/>
    </el-form-item>

    
    <el-form-item label="管理员角色">
        <el-select placeholder="请选择角色" v-model="formData.role">
        <el-option label="管理员" value="管理员" />
        <el-option label="超级管理员" value="超级管理员" />
      </el-select>
  
    </el-form-item>

    <el-form-item>
        <el-tree :default-checked-keys="defaultCheckedKeys"
         :default-expand-all="true"
        show-checkbox ref="treeRef"
    :data="menus"
     node-key="path"
      />
    </el-form-item>
    
  </el-form>
  <el-button v-if="interfaceType == '10086'" @click="add" type="primary" round>添加</el-button>
  
  <el-button v-else type="primary" @click="update" round>修改</el-button>
</el-drawer>

    </div>
</template>

<style lang="scss" scoped>
.header {
  margin-bottom: 16px;
  align-items: center;
  justify-content: space-between;
  
  .filter-container {
    display: flex;
    align-items: center;
    margin-top: 15px;
    
    .el-input, .el-select {
      margin-right: 10px;
    }
  }
}
</style>