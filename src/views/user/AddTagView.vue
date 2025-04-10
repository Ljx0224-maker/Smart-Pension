<template>
    <div class="add-tag-view">
        <div class="form-title">添加标签</div>
      <el-form :model="tagForm" label-width="120px">
        <el-form-item label="标签名称" required>
          <el-input v-model="tagForm.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="tagForm.status"></el-switch>
        </el-form-item>
        <el-form-item label="标签类型">
          <el-radio-group v-model="tagForm.type">
            <el-radio label="自动标签">自动标签</el-radio>
            <el-radio label="手动标签">手动标签</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="满足条件">
          <el-radio-group v-model="tagForm.conditionType">
            <el-radio label="必须满足所有被选中的条件">必须满足所有被选中的条件</el-radio>
            <el-radio label="满足任意一个被选中的条件">满足任意一个被选中的条件</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-for="(condition, index) in tagForm.conditions" :key="index" label="条件">
          <el-checkbox v-model="condition.selected">{{ condition.label }}</el-checkbox>
          <el-input v-model="condition.value1" placeholder="请输入"></el-input>
          <span>-</span>
          <el-input v-model="condition.value2" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="购买指定商品">
          <el-checkbox v-model="tagForm.hasProduct">购买指定商品</el-checkbox>
          <el-select v-if="tagForm.hasProduct" v-model="tagForm.product" placeholder="请选择商品">
            <el-option
              v-for="product in products"
              :key="product.id"
              :label="product.name"
              :value="product.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveTag">保存</el-button>
          <el-button @click="resetForm">返回</el-button>
        </el-form-item>
      </el-form>
    
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tagForm: {
          name: '',
          status: true,
          type: '自动标签',
          conditionType: '必须满足所有被选中的条件',
          conditions: [
            { selected: false, label: '累计消费次数', value1: '', value2: '' },
            { selected: false, label: '累计消费金额', value1: '', value2: '' }
          ],
          hasProduct: false,
          product: ''
        },
        products: [
          { id: '1', name: '商品1' },
          { id: '2', name: '商品2' },
          // Add more products as needed
        ]
      };
    },
    methods: {
      saveTag() {
        console.log('Saving tag:', this.tagForm);
        // Add your save logic here
      },
      resetForm() {
        this.$refs.tagForm.resetFields();
      }
    }
  };
  </script>
  
  <style scoped>
  .add-tag-view {
    max-width: 600px;
    margin: 50px auto;
    padding: 50px;
    background-color: #f9f9f9;
    border-radius: 50px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  .form-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
 
}
  </style>