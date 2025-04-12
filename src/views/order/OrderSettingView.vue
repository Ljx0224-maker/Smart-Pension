<template>
  <div class="settings-container">

    <div class="settings-box">
      <div class="page-header">
      <h2>通用设置</h2>
    </div>
      <el-form :model="settingsForm" label-width="160px">
        <div class="form-row">
          <el-form-item label="订单取消时间">
            <div class="form-item-content">
              <span>拍下订单</span>
              <el-input v-model="settingsForm.orderCancelTime" type="number" style="width: 100px;"></el-input>
              <span>分钟内未付款，自动取消订单</span>
            </div>
          </el-form-item>
        </div>

        <div class="form-row" style="margin-left: 26px;">
          <el-form-item label="允许用户申请退款">
            <el-switch
              v-model="settingsForm.allowRefund"
              active-text="启用"
              inactive-text="禁用" 
            ></el-switch>
            
          </el-form-item>
        </div>
        <div class="hint-text">启用后，用户可在订单完成后申请退款</div>

        <div class="form-row" style="margin-top: 38px;">
          <el-form-item label="售后关闭时间">
            <div class="form-item-content">
              <span>买家确认收货</span>
              <el-input v-model="settingsForm.afterSalesCloseTime" type="number" style="width: 100px;"></el-input>
              <span>天后，不支持买家申请退款</span>
            </div>
          </el-form-item>
        </div>

        <div class="form-row">
          <el-form-item label="自动退款时间">
            <div class="form-item-content">
              <span>买家申请退款，买家在</span>
              <el-input v-model="settingsForm.autoRefundTime" type="number" style="width: 100px;"></el-input>
              <span>小时内未处理，自动退款给买家</span>
            </div>
          </el-form-item>
        </div>

        <div class="form-row" style="margin-left: 28px;">
          <el-form-item label="自动同意退款申请">
            <el-switch
              v-model="settingsForm.autoApproveRefund"
              active-text="启用"
              inactive-text="禁用"
            ></el-switch>
            
          </el-form-item>
        </div>
        <div class="hint-text">启用后，用户申请退款无需卖家后台同意即可退款</div>
      </el-form>

      <div class="action-section" style="margin-top: 70px;">
        <el-button type="primary" @click="saveSettings">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import { saveOrderSettings, getOrderSettings } from '@/api/order';

export default {
  data() {
    return {
      settingsForm: {
        orderCancelTime: 15,
        allowRefund: true,
        afterSalesCloseTime: 15,
        autoRefundTime: 48,
        autoApproveRefund: false,
      },
    };
  },
  methods: {
    saveSettings() {
      saveOrderSettings(this.settingsForm).then(res => {
        if (res.code === 200) {
          ElMessage.success('保存成功');
        } else {
          ElMessage.error('保存失败');
        }
      });
    },
  },
  mounted() {
    // 初始化设置
    getOrderSettings().then(res => {
      if (res.code === 200) {
        this.settingsForm = res.data;
      }
    });
  },
};
</script>

<style scoped>
.settings-container {
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

.settings-box {
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

.form-item-content {
  display: flex;
  align-items: center;
}

.form-item-content span {
  margin: 0 5px;
}

.hint-text {
  font-size: 12px;
  color: #999;
  margin-top: -50px;
  margin-left: 187px;
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