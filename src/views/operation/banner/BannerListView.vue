<script>
import { getBannerList } from '@/api/banner'
export default {
    data () {
        return {
               bannerList: []
        }
    },
    mounted () {
        getBannerList().then(res => {
            //console.log(res);
            this.bannerList = res.data
        })
    }
}

</script>

<template>
       <el-table :data="bannerList" style="width: 100%">
    <el-table-column prop="index" label="序号"/>
    <el-table-column prop="img" label="图片">
    <template #default="scope">
        <div style="display: flex; align-items: center">
            <el-image :src="scope.row.img" />
        </div>
        </template>

    </el-table-column>

    <el-table-column prop="alt" label="提示信息" />
    <el-table-column prop="link" label="链接" />

  </el-table>

</template>
<style lang="scss" scoped>
.el-image {
    width: 80px;
}</style>