<template>
  <div class="protocol-management">
    <div class="page-header">
      <span>协议管理</span>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'user',
      content: '',
    };
  },
  methods: {
    savePolicy() {
      console.log('Saving policy:', this.content);
      // 添加您的保存逻辑
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