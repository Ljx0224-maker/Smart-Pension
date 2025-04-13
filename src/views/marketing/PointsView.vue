<template>
  <div class="points-container">
    <div class="points-box">
      <div class="page-header">
        <h2>积分规则</h2>
      </div>

      <el-form :model="pointsForm" label-width="130px">
        <div class="form-row">
          <el-form-item label="获取规则">
            <div class="rule-item">
              <el-radio v-model="pointsForm.acquisitionRule" label="perAmount">每消费</el-radio>
              <el-input v-model="pointsForm.amount" style="width: 100px;"></el-input>
              <span style="margin-left: 10px;margin-right: 20px;">  元  </span>
              <span style="margin-left: 10px;margin-right: 10px;">  获取  </span>
              <el-input v-model="pointsForm.pointsPerAmount" style="width: 100px;"></el-input>
              <span style="margin-left: 10px;margin-right: 20px;">  分  </span>
            </div>
          </el-form-item>
        </div>
        <div class="form-row">
          <el-form-item>
            <div class="rule-item">
              <el-radio v-model="pointsForm.acquisitionRule" label="perOrder">每消费</el-radio>
              <el-input v-model="pointsForm.orders" style="width: 100px;"></el-input>
              <span style="margin-left: 10px;margin-right: 20px;">笔</span>
              <span style="margin-left: 10px;margin-right: 10px;">获取</span>
              <el-input v-model="pointsForm.pointsPerOrder" style="width: 100px;"></el-input>
              <span style="margin-left: 10px;margin-right: 20px;">分</span>
            </div>
          </el-form-item>
        </div>

        <div class="form-row">
          <el-form-item label="积分有效期" style="margin-left: 14px;">
            <el-radio v-model="pointsForm.expirationRule" label="permanent">永久有效</el-radio>
            <div class="form-item-content">
              <el-radio v-model="pointsForm.expirationRule" label="days" style="margin-left: 30px;margin-right: 20px;">获取后</el-radio>
              <el-input v-model="pointsForm.validDays" style="width: 100px;"></el-input>
              <span>天内有效</span>
            </div>
          </el-form-item>
        </div>

        <div class="form-row">
          <el-form-item label="抵扣比例">
            <div class="form-item-content">
              <span>获取</span>
              <el-input v-model="pointsForm.deductionRatio" style="width: 100px;"></el-input>
              <span>分可抵扣1元</span>
            </div>
          </el-form-item>
        </div>

        <div class="form-row">
          <el-form-item label="抵扣限制">
            <el-checkbox v-model="pointsForm.maxDeductionEnabled">最多抵扣</el-checkbox>
            <el-input
              v-model="pointsForm.maxDeductionPoints"
              :disabled="!pointsForm.maxDeductionEnabled"
              style="width: 100px; margin-left: 10px;"
            ></el-input>
            <span style="margin-left: 10px;margin-right: 20px;">分</span>
          </el-form-item>
        </div>

        <div class="form-row">
          <el-form-item label="指定商品可用" style="margin-left: 28px;">
            <el-checkbox v-model="pointsForm.specificProductsEnabled">+选择商品</el-checkbox>
          </el-form-item>
        </div>

        <div class="action-section">
          <el-button type="primary" @click="savePointsRules">保存</el-button>
        </div>
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

.page-header {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.page-header::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 20px;
  background-color: #4fc3f7;
  margin-right: 10px;
  border-radius: 2px;
}

.points-box {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-row {
  margin-bottom: 40px;
  display: flex;
  align-items: center;
}

.rule-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.form-item-content {
  display: flex;
  align-items: center;
}

.form-item-content span {
  margin: 0 5px;
}

.action-section {
  text-align: center;
  margin-top: 20px;
}

.el-button {
  width: 100px;
  height: 40px;
  background-color: #4fc3f7;
  color: #fff;
  border-radius: 20px;
}
</style>