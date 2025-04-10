<template>
    <div class="add-service-view">
      <el-form :model="serviceForm" label-width="120px">
        <el-form-item label="商品名称" required>
          <el-input v-model="serviceForm.productName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="商品编码" required>
          <el-input v-model="serviceForm.productCode" placeholder="自动生成"></el-input>
        </el-form-item>
        <el-form-item label="分类" required>
          <el-select v-model="serviceForm.category" placeholder="请选择">
            <el-option label="分类1" value="1"></el-option>
            <el-option label="分类2" value="2"></el-option>
            <!-- Add more categories as needed -->
          </el-select>
        </el-form-item>
        <el-form-item label="图片" required>
          <el-upload
            class="upload-component"
            action="#"
            :on-success="handleSuccess"
            :auto-upload="false"
            list-type="picture-card">
            <el-icon><Plus /></el-icon>
  
            <template #file="{ file }">
              <div>
                <img class="el-upload-list__thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                    <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                        >
                        <el-icon><zoom-in /></el-icon>
                    </span>
                    <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                        >
                        <el-icon><Delete /></el-icon>
                    </span>
                </span>
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品备注">
          <el-input type="textarea" v-model="serviceForm.productNote" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" required>
          <el-input v-model="serviceForm.price" placeholder="元"></el-input>
        </el-form-item>
        <el-form-item label="划线价">
          <el-input v-model="serviceForm.strikePrice" placeholder="元"></el-input>
        </el-form-item>
        <el-form-item label="销量">
          <el-input v-model="serviceForm.salesVolume" placeholder="0"></el-input>
        </el-form-item>
        <el-form-item label="佣金（元）" required>
          <el-input v-model="serviceForm.commission" placeholder="元"></el-input>
        </el-form-item>
        <el-form-item label="服务时长" required>
          <el-input v-model="serviceForm.serviceDuration" placeholder="h"></el-input>
        </el-form-item>
        <el-form-item label="服务人数" required>
          <el-input v-model="serviceForm.servicePeople" placeholder="人"></el-input>
        </el-form-item>
        <el-form-item label="售卖时间">
          <el-radio-group v-model="serviceForm.sellTime">
            <el-radio label="上架">立即上架</el-radio>
            <el-radio label="notList">暂不上架</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="限时优惠">
          <el-checkbox v-model="serviceForm.limitedOffer"></el-checkbox>
        </el-form-item>
        <el-form-item label="有效期">
          <el-date-picker
            v-model="serviceForm.validity"
            type="daterange"
            placeholder="请选择日期范围">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预约规则">
          <el-input v-model="serviceForm.bookingRule" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交审核</el-button>
          <el-button @click="resetForm">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        serviceForm: {
          productName: '',
          productCode: '',
          category: '',
          productNote: '',
          price: '',
          strikePrice: '',
          salesVolume: 0,
          commission: '',
          serviceDuration: '',
          servicePeople: '',
          sellTime: '上架',
          limitedOffer: false,
          validity: [],
          bookingRule: ''
        }
      };
    },
    methods: {
      handleSuccess(response, file, fileList) {
       // Handle upload success
      },
      submitForm() {
        console.log('Submitting form:', this.serviceForm);
        // Add your submission logic here
      },
      resetForm() {
        this.$refs.serviceForm.resetFields();
      }
    }
  };
  </script>
  
  <style scoped>
  .add-service-view {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  .upload-component .el-upload {
    display: inline-block;
  }
  </style>