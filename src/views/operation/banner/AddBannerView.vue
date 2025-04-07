<script>
import { Plus } from '@element-plus/icons-vue'
import { addBanner } from '@/api/banner'
export default {
    data() {
        return {
             imageUrl: '',
             FormData: {
                alt: '',
                link: '',
                img: ''
             }
        }
    },
    components: {
        Plus
    },
    methods: {
        httpRequest (data) {
            console.log(data.file);

            
            //this.imageUrl = URL.createObjectURL(data.file)

            let reader = new FileReader()
            reader.readAsDataURL(data.file)
            reader.onload = () => {
                //console.log(reader.result);
                this.imageUrl = reader.result
                this.FormData.img = reader.result
            }
        },
        addBanner () {
           // console.log(this.formData);
           addBanner(this.formData).then(res => {
           //console.log(res);
           if (res.code == 200) {
            this.$router.push( '/operation/banner/bannerlist')
           }
           })
        }
    }
}
</script>

<template>
    <div>
        添加轮播图

        <br>

        <el-form>
    <el-form-item label="请输入 alt">
      <el-input v-model="FormData.alt" placeholder="请输入 alt" />
    </el-form-item>

    <el-form-item label="请输入 link">
      <el-input v-model="FormData.link" placeholder="请输入 link" />
    </el-form-item>

    <el-form-item>
        <el-upload :http-request="httpRequest" 
    class="avatar-uploader"

    :show-file-list="false"
   
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus />
    <Plus />
    </el-icon>
  </el-upload>
    </el-form-item>

    <el-button @click="addBanner"> 添加 </el-button>
 </el-form>
    </div>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>