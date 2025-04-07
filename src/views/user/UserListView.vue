<!--用户列表-->
<script>
import {getUserList} from '@/api/user'

export default {
    data(){
        return{
            userList:[]
        }
    },
    mounted(){
        getUserList().then(res=>{
            console.log(res.data);
            this.userList=res.data
        })
    }
}
</script>



<template>
    <div>
        <div>
            用户列表
        </div>
        
    </div>
</template>