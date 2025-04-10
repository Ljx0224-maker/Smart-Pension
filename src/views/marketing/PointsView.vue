<template>
    <div class="points-container">
      <div class="points-header">
        <h2>积分规则</h2>
      </div>
  
      <div class="points-form">
        <el-form :model="pointsForm" label-width="120px">
          <div class="form-group">
            <el-form-item label="获取规则">
              <div class="rule-item">
                <el-radio v-model="pointsForm.acquisitionRule" label="perAmount">每消费</el-radio>
                <el-input v-model="pointsForm.amount" style="width: 200px;"></el-input>
                <span>元</span>
                <span>获取</span>
                <el-input v-model="pointsForm.pointsPerAmount" style="width: 200px;"></el-input>
                <span>分</span>
              </div>
              <div class="rule-item">
                <el-radio v-model="pointsForm.acquisitionRule" label="perOrder">每消费</el-radio>
                <el-input v-model="pointsForm.orders" style="width: 200px;"></el-input>
                <span>笔</span>
                <span>获取</span>
                <el-input v-model="pointsForm.pointsPerOrder" style="width: 200px;"></el-input>
                <span>分</span>
              </div>
            </el-form-item>
          </div>
  
          <el-form-item label="积分有效期">
            <el-radio v-model="pointsForm.expirationRule" label="permanent">永久有效</el-radio>
            <div>
              <el-radio v-model="pointsForm.expirationRule" label="days">获取后</el-radio>
              <el-input v-model="pointsForm.validDays" style="width: 200px;"></el-input>
              <span>天内有效</span>
            </div>
          </el-form-item>
  
          <el-form-item label="抵扣比例">
            <span>获取</span>
            <el-input v-model="pointsForm.deductionRatio" style="width: 200px;"></el-input>
            <span>分可抵扣1元</span>
          </el-form-item>
  
          <el-form-item label="抵扣限制">
            <el-checkbox v-model="pointsForm.maxDeductionEnabled">最多抵扣</el-checkbox>
            <el-input
              v-model="pointsForm.maxDeductionPoints"
              :disabled="!pointsForm.maxDeductionEnabled"
              style="width: 200px; margin-left: 10px;"
            ></el-input>
            <span>分</span>
          </el-form-item>
  
          <el-form-item label="指定商品可用">
            <el-checkbox v-model="pointsForm.specificProductsEnabled">+选择商品</el-checkbox>
          </el-form-item>
  
          <el-form-item>
            <el-button type="primary" @click="savePointsRules">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </template>
  
  <script>
  import { ElMessage } from 'element-plus';
  import { savePointsRules, getPointsRules } from '@/api/marketing';
  
  export default {
    data() {
      return {
        pointsForm: {
          acquisitionRule: 'perAmount',
          amount: '100',
          pointsPerAmount: '10',
          orders: '1',
          pointsPerOrder: '5',
          expirationRule: 'permanent',
          validDays: '30',
          deductionRatio: '100',
          maxDeductionEnabled: false,
          maxDeductionPoints: '500',
          specificProductsEnabled: false,
        },
      };
    },
    methods: {
      savePointsRules() {
        savePointsRules(this.pointsForm).then(res => {
          if (res.code === 200) {
            ElMessage.success('保存成功');
          } else {
            ElMessage.error('保存失败');
          }
        });
      },
    },
    mounted() {
      // 初始化积分规则
      getPointsRules().then(res => {
        if (res.code === 200) {
          this.pointsForm = res.data;
        }
      });
    },
  };
  </script>
  
  <style scoped>
  .points-container {
    padding: 20px;
    background-color: #f5f7fa;
  }
  
  .points-header {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .points-form {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
  }
  
  .rule-item {
    margin-bottom: 15px;
  }
  
  .el-form-item {
    margin-bottom: 20px;
  }
  </style>