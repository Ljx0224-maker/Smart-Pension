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
      <!-- 修改按钮文本并绑定跳转方法 -->
      <el-button type="primary" @click="goToEditPage">编辑</el-button>
    </div>
  </div>
</template>

<script>
import { getPolicyDetail } from '@/api/setting'; 
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      activeTab: 'user',
      content: '', 
      // 更新ID为POL001，确保跳转时使用此ID
      policyIdMap: {
        user: 'POL001', 
        server: 'POL002' // 你可以为服务端隐私政策提供不同的ID
      }
    };
  },
  setup() {
    const router = useRouter();
    return {
      router
    };
  },
  mounted() {
    this.fetchPolicyDetail(); 
  },
  watch: {
    activeTab(newVal) {
      this.fetchPolicyDetail();
    }
  },
  methods: {
    fetchPolicyDetail() {
      const policyId = this.policyIdMap[this.activeTab];
      console.log('请求的协议 ID:', policyId);
      if (!policyId) {
        console.error('未找到对应的协议 ID');
        return;
      }
      getPolicyDetail(policyId)
        .then(response => {
          console.log('接口返回数据:', response);
          if (response && response.content) {
            this.content = response.content;
          } else {
            console.error('没有获取到协议内容，接口返回数据:', response);
          }
        })
        .catch(error => {
          console.error('获取隐私政策失败:', error);
        });
    },
    // 新增跳转方法
    goToEditPage() {
      const policyId = this.policyIdMap[this.activeTab];
      // 确保使用POL001等实际的ID值
      this.router.push({
        name: 'editprotocol', // 确保路由配置中有对应的路由名称
        query: { policyId } // 传递具体的policyId
      });
    },
   
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






.button-container {
  text-align: left;
}
</style>
