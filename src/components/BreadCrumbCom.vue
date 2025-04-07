<script>
import {routes} from '@/router/index'
import { mapMutations } from 'vuex'
export default{
    data(){
        // 用来记录所有路由name对应的label
        this.routesMap=new Map()
        // 用来处理将路由处理成map
        this.initRoutesMap(routes)

        console.log(this.routesMap);
        

        return{
            list:[]
        }
    },
    mounted(){
        // this.$router.push()   带r就是用来做页面路由跳转用的
        // this.$route           不带r的是用来做路由信息查询用的
        // console.log(this.$route);
        
    },
    methods:{
        ...mapMutations(['updateCurrentPath']),
        initRoutesMap(routes){
            routes.forEach(route => {
                this.routesMap.set(route.name,route.label)
                // 如果有子路由
                if (route.children){
                    this.initRoutesMap(route.children)
                }
            });
        }
    },
    // 路由侦听器
    watch:{
        $route:{
            immediate:true,
            handler(route){
                // 处理路径
                // 记录当前的页面路由路径
                this.updateCurrentPath(route.path)

                this.list=route.matched.map(item=>{

                    return{
                        neme:item.name,
                        label:this.routesMap.get(item.name)
                    }
                })
            }
        }
    }
}
</script>

<template>
    <el-breadcrumb separator=">">
        <el-breadcrumb-item v-for="item in list" :key="item.name" :to="{ name:item.name }">{{item.label}}</el-breadcrumb-item>
      <!-- <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">promotion management</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item> -->
    </el-breadcrumb>
  </template>

<style lang="scss" scoped>
.el-breadcrumb{
    margin-bottom:20px;
}
</style>