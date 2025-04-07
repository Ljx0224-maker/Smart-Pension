<!--管理员列表-->
<script>
import {adminList,addAdmin,updateAdmin,deleteAdmin} from '@/api/user'

import {routes} from '@/router/index.js'
import { ElMessage } from 'element-plus'

export default {
    data(){
        return{
            tableData:[],
            // 当前页
            currentPage:1,
            // 是否打开抽屉效果
            drawer:false,
            // 路由信息
            menus:routes[0].children,
            // 管理员数据
            FormData:{
                adminname:'',
                password:'',
                role:'',
                checkedKeys:''
            },
            // 默认选中项
            defaultCheckedKeys:[],
            // 定义打开方式
            interfaceType:'10086',//10086 添加管理员  10010 编辑管理员
        }
    },
    methods:{
        // 获取树形结构中选中的值
        formatCheckedKeys(){
            // console.log(this.$refs.treeRef.getCheckedNodes(true));
            // 根据选中的值得到父级路由
            const list = this.$refs.treeRef.getCheckedNodes(true)
            // 用来放父级路由的lable用的
            const tempList=[]
            // 用来放最终结果用的
            const result=[]
            // 遍历
            // list是我们选中的子路由
            list.forEach(item=>{
                // parent是选中后的父级路由
                const parent=this.menus.find(mitem=>{
                    return mitem.children.some(child=>child.label==item.label)
                })
                // console.log('1111',parent);
                // 判断当前父级路由是否在tempList中已经有了
                if(tempList.includes(parent.label)){
                    result.find(item=>item.label==parent.label).children.push(item)
                }else{
                    // 将对应的内容放在tempList中
                    console.log('1111',parent.label);
                    tempList.push(parent.label)

                    result.push({
                        label:parent.label,
                        path:parent.path,
                        children:[item]
                    })
                }

                console.log(result);
                // 将路由权限添加到formData中
                this.FormData.checkedKeys=result
            })
        },
        add(){

            this.interfaceType='10086'

            // 将管理员数据发送到服务器
            // 1、收集数据
            // console.log(this.FormData);
            // console.log(this.$refs.treeRef.getCheckedNodes(true));
            // 获取所有的权限路由
            this.formatCheckedKeys()
            
            // 2、将数据发给服务器
            this.FormData.role=this.FormData.role=='管理员'?'1':'2'

            // 将数据添加到服务器中
            addAdmin(this.FormData).then(res=>{
                //console.log(res);
                if(res.code=='200'){
                    // 成功
                    ElMessage.success(res.message)
                    // 关闭抽屉效果
                    this.drawer=false
                    // 重新获取最新数据
                    adminList().then(res=>{
                        // console.log(res);
                        this.tableData=res.data
                    })
                }else{
                    ElMessage.error(res.message)
                }
                
            })
        },
        editClick(row){
            this.interfaceType='10010'
            // 打开抽屉
            this.drawer=true
            // 获取当前的一行数据
            // console.log(row);

            //浅拷贝不行：this.FormData=row
            // 分开赋值或深拷贝
            this.FormData.adminname=row.adminname
            this.FormData.password=''//密码不会展现出来
            this.FormData.role=row.role=='1'?'管理员':'超级管理员'

            console.log(this.FormData.checkedKeys)

            const checkedKeys=[]
            row.checkedKeys.forEach(parent=>{
                parent.children.forEach(item=>{
                    checkedKeys.push(item.path)
                })
            })

            //console.log(checkedKeys);
            this.defaultCheckedKeys=checkedKeys
            
        },
        close(){
            this.FormData={}
            this.defaultCheckedKeys=[]

            if(this.$refs.treeRef){
                this.$refs.treeRef.setCheckedKeys([])
            }
        },
        addClick(){
            this.interfaceType='10086'
            this.drawer=true
        },
        update(){
            // 获取表单数据
            console.log(this.FormData);

            if(this.FormData.adminname==''||this.FormData.password==''){
                ElMessage.error('管理员名称和密码不能为空')
                return

            }
            this.FormData.role=this.FormData.role=='管理员'?'1':'2'
            // 获取当前用户选中的权限
            this.formatCheckedKeys()
            // 提交修改信息
            updateAdmin(this.FormData).then(res=>{
                console.log(res);
                // 关闭抽屉效果
                this.drawer=false
                    // 重新获取最新数据
                    adminList().then(res=>{
                        // console.log(res);
                        this.tableData=res.data
                    })
                
            })
        },
        deleteClick(row){
            deleteAdmin({adminid:row.adminid}).then(res=>{
                if(res.code==200){
                    // 重新获取最新数据
                    adminList().then(res=>{
                        // console.log(res);
                        this.tableData=res.data
                    })
                }else{
                    ElMessage.error('删除失败')
                }
            })
        }

    },
    mounted(){
        // 获取管理员列表
        adminList().then(res=>{
            console.log(res);
            this.tableData=res.data
        })
    },
    // 计算出当前页面展示哪些数据
    computed:{
        computedTableData(){
            return this.tableData.slice((this.currentPage-1)*5,(this.currentPage-1)*5+5)
        }
    }
}
</script>


<template>
    <div>
        <div class="header">
            管理员列表
            <el-button type="primary" @click="addClick" size="small">添加管理员</el-button>
        </div>
        
        <el-table :data="computedTableData" style="width: 100%">
            <!--type=index标记当前为索引序号-->
            <!--lable 列标题-->
            <el-table-column type="index" :index="(currentPage-1)*5+1" label="Date" width="80" />
            <!--prop 列的数据字段-->
            <el-table-column prop="adminname" label="管理员名称" width="180" />
            <el-table-column label="管理员权限" >
                <template #default="scope">
                    <!-- <div> -->
                        <!-- {{ scope.row.role==1 ? '管理员' : '超级管理员' }} -->
                        <!-- scope.row就是所有数据 -->
                        <el-tag :type="scope.row.role==1 ? 'warning' : 'success'">{{ scope.row.role==1 ? '管理员' : '超级管理员' }}</el-tag>
                    <!-- </div> -->
                </template>
            </el-table-column>

            <el-table-column label="操作" >
                <template #default="scope">
                    <el-button @click="editClick(scope.row)" size="small" type="primary" round>编辑</el-button>
                    <el-button @click="deleteClick(scope.row)" size="small" type="success" round>删除</el-button>
                </template>
            </el-table-column>


        </el-table>
        <!-- 分页显示 -->
        <el-pagination background :page-size=5 v-model:current-page="currentPage" layout="prev, pager, next" 
        :total="tableData.length" />

        <!-- 抽屉效果 -->
        <el-drawer @close="close" v-model="drawer" >

            <template #header>
                <h4>{{ interfaceType=='10086'?'添加管理员':'编辑管理员' }}</h4>
            </template>

            <el-form label-width="auto" style="max-width: 600px">
                <el-form-item label="管理员账号">
                    <el-input placeholder="请输入管理员账号" v-model="FormData.adminname"/>
                </el-form-item>
                <el-form-item label="管理员密码">
                    <el-input placeholder="请输入管理员密码" v-model="FormData.password"/>
                </el-form-item>
                <el-form-item label="管理员角色">
                    <el-select placeholder="请选择角色" v-model="FormData.role">
                        <el-option label="管理员" value="管理员" />
                        <el-option label="超级管理员" value="超级管理员" />
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-tree show-checkbox ref="treeRef" :data="menus" node-key="path" :default-checked-keys="defaultCheckedKeys" default-expand-all="true"/>
                </el-form-item>

            </el-form>
            <!-- 添加按钮 -->
            <el-button v-if="interfaceType=='10086'" @click="add" size="small" type="success" round>添加</el-button>
            <el-button v-else size="small" type="success" @click="update" round>修改</el-button>
        </el-drawer>

    </div>
</template>

<style lang="scss" scoped>
.header{
    margin-bottom: 16px;
}
</style>