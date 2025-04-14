<template>
    <div class="protocol-management">
      <div class="page-header">
        <span>编辑协议管理</span>
      </div>
      <el-tabs v-model="activeTab" class="protocol-tabs">
        <el-tab-pane label="用户端隐私政策" name="user"></el-tab-pane>
        <el-tab-pane label="服务端隐私政策" name="server"></el-tab-pane>
      </el-tabs>
      <div class="editor-container">
        <el-input
          v-model="content"
          type="textarea"
          :rows="15"
          placeholder="请输入内容"
          class="editor-textarea"
        ></el-input>
      </div>
      <div class="button-container">
        <el-button type="primary" @click="savePolicy">保存</el-button>
        <!-- 添加返回按钮 -->
        <el-button @click="goBack" style="margin-left: 10px;">返回</el-button>
      </div>
    </div>
  </template>
  
  <script>
  import { updatePolicyInfo } from '@/api/setting';  // 导入更新协议信息的函数
  
  export default {
    props: {
      policyId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        content: '',  // 存储协议内容
        activeTab: 'user',  // 默认激活的标签
        policyIdMap: {
          user: 'POL001',  // 示例映射：用户端隐私政策对应的 policyId
          server: 'POL002',  // 示例映射：服务端隐私政策对应的 policyId
        }
      };
    },
    mounted() {
      console.log('Received policyId:', this.policyId);
      // 使用 policyId 来加载或编辑相应的协议内容
      this.loadPolicyContent();
    },
    methods: {
      async loadPolicyContent() {
        // 假设我们有 API 来获取内容
        const policyId = this.policyIdMap[this.activeTab];
        // 在这里通过 policyId 获取协议内容，并填充到 content 中
        // 例如：this.content = await fetchPolicyContent(policyId);
      },
      
      async savePolicy() {
        const policyId = this.policyIdMap[this.activeTab];
        const userPolicyInfo = {
          policyId,
          content: this.content,
        };
  
        try {
          // 调用 updatePolicyInfo 来更新协议信息
          const response = await updatePolicyInfo(userPolicyInfo);
          console.log('Policy saved successfully:', response);
          
          // 保存成功后，跳转到指定的页面
          this.$router.push({
            path: '/settings/protocol',
            query: { policyId }  // 传递当前的 policyId
          });
  
        } catch (error) {
          console.error('Failed to save policy:', error);
        }
      },
  
      goBack() {
        // 获取当前激活标签对应的 policyId
        const policyId = this.policyIdMap[this.activeTab];
        console.log('Navigating to protocol with policyId:', policyId);
  
        // 跳转到协议页面，传递 policyId
        this.$router.push({
          name: 'protocol',
          query: { policyId }
        });
      }
    }
  };
  </script>
  
  
  
  <style scoped>
  .protocol-management {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  
  .page-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .page-header::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 24px;
    background-color: #4fc3f7;
    margin-right: 15px;
    border-radius: 2px;
  }
  
  .page-header span {
    font-size: 24px;
    font-weight: bold;
  }
  
  .protocol-tabs {
    margin-bottom: 20px;
  }
  
  .editor-container {
    margin-bottom: 20px;
  }
  
  .editor-textarea {
    width: 100%;
    font-size: 16px;
  }
  
  .button-container {
    text-align: left;
  }
  </style>
  