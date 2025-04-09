<template>
    <div class="settings-container">
      <div class="settings-header">
        <h2>通用设置</h2>
      </div>
  
      <div class="settings-form">
        <el-form :model="settingsForm" label-width="160px">
          <el-form-item label="订单取消时间">
            <div class="form-item-content">
              <span>拍下订单</span>
              <el-input v-model="settingsForm.orderCancelTime" type="number" style="width: 100px;"></el-input>
              <span>分</span>
              <span>分钟内未付款，自动取消订单</span>
            </div>
          </el-form-item>
  
          <el-form-item label="允许用户申请退款">
            <el-switch
              v-model="settingsForm.allowRefund"
              active-text="启用"
              inactive-text="禁用"
            ></el-switch>
            <div class="hint-text">启用后，用户可在订单完成后申请退款</div>
          </el-form-item>
  
          <el-form-item label="售后关闭时间">
            <div class="form-item-content">
              <span>买家确认收货</span>
              <el-input v-model="settingsForm.afterSalesCloseTime" type="number" style="width: 100px;"></el-input>
              <span>天</span>
              <span>后，不支持买家申请退款</span>
            </div>
          </el-form-item>
  
          <el-form-item label="自动退款时间">
            <div class="form-item-content">
              <span>买家申请退款，买家在</span>
              <el-input v-model="settingsForm.autoRefundTime" type="number" style="width: 100px;"></el-input>
              <span>小时</span>
              <span>内未处理，自动退款给买家</span>
            </div>
          </el-form-item>
  
          <el-form-item label="自动同意退款申请">
            <el-switch
              v-model="settingsForm.autoApproveRefund"
              active-text="启用"
              inactive-text="禁用"
            ></el-switch>
            <div class="hint-text">启用后，用户申请退款无需卖家后台同意即可退款</div>
          </el-form-item>
        </el-form>
  
        <div class="save-button">
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
    background-color: #fff;
    border-radius: 8px;
  }
  
  .settings-header {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .settings-form {
    padding: 20px;
  }
  
  .form-item-content {
    display: flex;
    align-items: center;
  }
  
  .hint-text {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
  }
  
  .save-button {
    margin-top: 30px;
    text-align: left;
  }
  </style>