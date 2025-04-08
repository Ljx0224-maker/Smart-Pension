<template>
    <div class="container">
      <!-- 隐私政策切换按钮 -->
      <div class="privacy-buttons">
        <el-button @click="togglePrivacyPolicy('user')" :type="activePolicy === 'user' ? 'primary' : 'default'">
          用户端隐私政策
        </el-button>
        <el-button @click="togglePrivacyPolicy('server')" :type="activePolicy === 'server' ? 'primary' : 'default'">
          服务端隐私政策
        </el-button>
      </div>
  
      <!-- 输入框 -->
      <el-input
        v-model="textarea"
        style="width: 500px"
        :rows="2"
        type="textarea"
        placeholder="Please input"
        :style="inputStyle"
      />
  
      <!-- 字体样式调节 -->
      <div class="font-controls">
        <el-button @click="toggleBold" :type="isBold ? 'primary' : 'default'">
          <el-icon> </el-icon>加粗
        </el-button>
        <el-button @click="increaseFontSize">
          <el-icon><Plus /></el-icon>
        </el-button>
        <el-button @click="decreaseFontSize">
          <el-icon><Minus /></el-icon>
        </el-button>
        <el-button @click="copyText">
          <el-icon><CopyDocument /></el-icon>
        </el-button>

      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { Plus, Minus, CopyDocument, Link, Delete } from '@element-plus/icons-vue' // Import icons from Element Plus
  
  const textarea = ref('')
  const activePolicy = ref<'user' | 'server'>('user') // 默认为用户端隐私政策
  const isBold = ref(false)
  const fontSize = ref(14) // 默认字体大小
  
  // 控制输入框样式
  const inputStyle = computed(() => ({
    fontWeight: isBold.value ? 'bold' : 'normal',
    fontSize: `${fontSize.value}px`
  }))
  
  // 切换隐私政策
  const togglePrivacyPolicy = (policy: 'user' | 'server') => {
    activePolicy.value = policy
    console.log(`Current active policy: ${policy}`)
  }
  
  // 加粗字体
  const toggleBold = () => {
    isBold.value = !isBold.value
  }
  
  // 增大字体
  const increaseFontSize = () => {
    fontSize.value += 2
  }
  
  // 减小字体
  const decreaseFontSize = () => {
    if (fontSize.value > 10) fontSize.value -= 2
  }
  
  // 复制文本
  const copyText = () => {
    navigator.clipboard.writeText(textarea.value)
    alert('文本已复制！')
  }
  

  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
  }
  
  .privacy-buttons {
    margin-bottom: 20px;
  }
  
  .font-controls {
    margin-top: 10px;
  }
  
  .el-button {
    margin: 5px;
  }
  </style>
  