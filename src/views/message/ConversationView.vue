<template>
  <div class="conversation-container">
    <div class="conversation-sidebar">
      <div class="page-header">
        <h2>会话</h2>
        <div class="header-line"></div>
      </div>
      <div class="search-box">
        <el-input
          placeholder="搜索会话"
          v-model="searchConversation"
          prefix-icon="el-icon-search"
          style="width: 100%;"
        ></el-input>
      </div>
      <div class="conversation-list">
        <div
          class="conversation-item"
          v-for="conversation in conversations"
          :key="conversation.id"
          :class="{ active: activeConversationId === conversation.id }"
          @click="selectConversation(conversation)"
        >
          <div class="avatar">
            <img :src="conversation.avatar" alt="用户头像">
          </div>
          <div class="info">
            <div class="name">{{ conversation.name }}</div>
            <div class="message">{{ conversation.lastMessage }}</div>
          </div>
          <div class="time">{{ conversation.time }}</div>
          <div class="unread" v-if="conversation.unread > 0">{{ conversation.unread }}</div>
        </div>
      </div>
    </div>

    <div class="conversation-main">
      <div class="page-header1">
        <h2>  </h2>
      </div>
      <div class="conversation-header">
        <div class="user-info">
          <div class="name">笑看人生</div>
        </div>
        <div class="actions">
          <el-button type="text" @click="endConversation">
            <i class="el-icon-more"></i> 结束会话
          </el-button>
          <el-button type="text">
            <i class="el-icon-more"></i> 客户资料
          </el-button>
          <el-button type="text">
            <i class="el-icon-more"></i> 商品列表
          </el-button>
        </div>
      </div>

      <div class="chat-window">
        <div class="message-item" v-for="message in currentMessages" :key="message.id">
          <div class="message-time">{{ message.time }}</div>
          <div class="message-content" :class="{ 'is-user': message.isUser }">
            <div class="avatar">
              <img :src="message.avatar" alt="用户头像">
            </div>
            <div class="bubble">{{ message.content }}</div>
          </div>
        </div>
      </div>

      <div class="input-box">
        <el-input
          type="textarea"
          placeholder="请输入"
          v-model="newMessage"
          @keyup.enter.native="sendMessage"
          style="width: 100%; margin-right: 10px;"
        ></el-input>
        <el-button type="primary" @click="sendMessage">发送</el-button>
      </div>
    </div>

    <div class="customer-sidebar">
      <div class="page-header1">
        <h2>  </h2>
      </div>
      <div class="customer-info">
        <div class="avatar">
          <img :src="currentCustomer.avatar" alt="客户头像">
        </div>
        <div class="name">
          {{ currentCustomer.name }}
          <el-button type="text" @click="viewCustomerDetails">查看资料</el-button>
        </div>
        <div class="tags">
          <el-tag v-for="tag in currentCustomer.tags" :key="tag" size="small">{{ tag }}</el-tag>
        </div>
        <div class="stats">
          <div>累计订单数 {{ currentCustomer.orderCount }}</div>
          <div>累计消费金额（元）{{ currentCustomer.totalAmount }}</div>
        </div>
      </div>

      <div class="order-list">
        <div class="title">订单列表 ({{ currentCustomer.orderCount }})</div>
        <div class="order-item" v-for="order in currentCustomer.orders" :key="order.id">
          <div class="order-status">{{ order.status }}</div>
          <div class="order-details">
            <div class="product">
              <img :src="order.productImage" alt="商品图片">
              <div class="product-info">
                <div class="product-name">{{ order.productName }}</div>
                <div class="order-detail">
                  <el-button type="text" @click="viewOrderDetails(order)">订单详情</el-button>
                </div>
              </div>
            </div>
            <div class="order-time">下单时间: {{ order.orderTime }}</div>
            <div class="order-amount">订单金额: {{ order.amount }}元</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import { ElMessage } from 'element-plus';
  
  export default {
    data() {
      return {
        searchConversation: '',
        activeConversationId: 1,
        newMessage: '',
        conversations: [
          {
            id: 1,
            name: '笑看人生',
            avatar: 'https://via.placeholder.com/50',
            lastMessage: '您好',
            time: '09:09',
            unread: 3,
          },
          {
            id: 2,
            name: '刘小华',
            avatar: 'https://via.placeholder.com/50',
            lastMessage: '请问您要咨询什么问题呢？',
            time: '09:09',
            unread: 0,
          },
          {
            id: 3,
            name: '赵丽珍',
            avatar: 'https://via.placeholder.com/50',
            lastMessage: '299元',
            time: '09:09',
            unread: 0,
          },
          {
            id: 4,
            name: '王小倩',
            avatar: 'https://via.placeholder.com/50',
            lastMessage: '好的',
            time: '09:09',
            unread: 0,
          },
        ],
        currentMessages: [
          {
            id: 1,
            isUser: true,
            avatar: 'https://via.placeholder.com/50',
            time: '09:09',
            content: '您好',
          },
          {
            id: 2,
            isUser: false,
            avatar: 'https://via.placeholder.com/50',
            time: '09:09',
            content: '请问您要咨询什么问题呢？',
          },
          {
            id: 3,
            isUser: true,
            avatar: 'https://via.placeholder.com/50',
            time: '10:10',
            content: '您好！',
          },
          {
            id: 4,
            isUser: false,
            avatar: 'https://via.placeholder.com/50',
            time: '10:10',
            content: '您好！请问康复项目适合多大年龄的老人？',
          },
          {
            id: 5,
            isUser: true,
            avatar: 'https://via.placeholder.com/50',
            time: '10:15',
            content: '60-80岁',
          },
        ],
        currentCustomer: {
          id: 1,
          name: '笑看人生',
          avatar: 'https://via.placeholder.com/50',
          tags: ['高血压', '糖尿病', '多次购买'],
          orderCount: 2,
          totalAmount: 1004.00,
          orders: [
            {
              id: 1,
              status: '已完成',
              productImage: 'https://via.placeholder.com/100',
              productName: '日常清洁 2小时1人急速清洁全程质保',
              orderTime: '2022-12-09 14:12:07',
              amount: 300.00,
            },
            {
              id: 2,
              status: '已完成',
              productImage: 'https://via.placeholder.com/100',
              productName: '日常清洁 2小时1人急速清洁全程质保',
              orderTime: '2022-12-09 14:12:07',
              amount: 300.00,
            },
          ],
        },
      };
    },
    methods: {
      selectConversation(conversation) {
        this.activeConversationId = conversation.id;
        // 在实际应用中，这里可以加载对应会话的消息
      },
      endConversation() {
        this.$confirm('确定要结束当前会话吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info',
        }).then(() => {
          ElMessage.success('会话已结束');
          this.activeConversationId = null;
        }).catch(() => {
          ElMessage.info('已取消结束会话');
        });
      },
      sendMessage() {
        if (!this.newMessage.trim()) {
          return;
        }
  
        const newMessage = {
          id: this.currentMessages.length + 1,
          isUser: false,
          avatar: 'https://via.placeholder.com/50',
          time: this.getCurrentTime(),
          content: this.newMessage,
        };
  
        this.currentMessages.push(newMessage);
        this.newMessage = '';
  
        // 在实际应用中，这里可以发送消息到后端
      },
      viewCustomerDetails() {
        ElMessage.info('查看客户详细资料');
        // 在实际应用中，这里可以跳转到客户详情页面
      },
      viewOrderDetails(order) {
        ElMessage.info(`查看订单 ${order.id} 的详细信息`);
        // 在实际应用中，这里可以跳转到订单详情页面
      },
      getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      },
    },
  };
  </script>
  
  <style scoped>
  .conversation-container {
    display: flex;
    height: 100vh;
  }
  
  .conversation-sidebar {
    width: 300px;
    background-color: #fff;
    border-right: 1px solid #eee;
    padding: 20px;
    overflow-y: auto;
  }
  
  .search-box {
    margin-bottom: 20px;
  }
  
  .conversation-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .conversation-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .conversation-item:hover {
    background-color: #f5f7fa;
  }
  
  .conversation-item.active {
    background-color: #e8f8f5;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
  }
  
  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .info {
    flex: 1;
  }
  
  .name {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .message {
    font-size: 12px;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .time {
    font-size: 12px;
    color: #999;
    margin-left: 10px;
  }
  
  .unread {
    background-color: #ff4d4f;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    margin-left: 10px;
  }
  
  .conversation-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-right: 1px solid #eee;
  }
  
  .conversation-header {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .actions {
    display: flex;
    gap: 20px;
  }
  
  .chat-window {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background-color: #f9f9f9;
  }
  
  .message-item {
    margin-bottom: 20px;
  }
  
  .message-time {
    text-align: center;
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
  
  .message-content {
    display: flex;
  }
  
  .message-content.is-user {
    justify-content: flex-end;
  }
  
  .bubble {
    max-width: 70%;
    padding: 10px 15px;
    border-radius: 18px;
    font-size: 14px;
    position: relative;
  }
  
  .message-content:not(.is-user) .bubble {
    background-color: #fff;
    color: #333;
    border-bottom-left-radius: 4px;
  }
  
  .message-content.is-user .bubble {
    background-color: #4fc3f7;
    color: white;
    border-bottom-right-radius: 4px;
  }
  
  .input-box {
    display: flex;
    padding: 15px;
    border-top: 1px solid #eee;
  }
  
  .customer-sidebar {
    width: 300px;
    background-color: #fff;
    padding: 20px;
    border-left: 1px solid #eee;
    overflow-y: auto;
  }
  
  .customer-info {
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
  }
  
  .tags {
    display: flex;
    gap: 8px;
    margin: 10px 0;
  }
  
  .stats {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 14px;
    color: #666;
  }
  
  .order-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .title {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .order-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .order-status {
    font-size: 14px;
    color: #999;
  }
  
  .product {
    display: flex;
    gap: 10px;
  }
  
  .product img {
    width: 60px;
    height: 60px;
    object-fit: cover;
  }
  
  .product-info {
    flex: 1;
  }
  
  .order-time,
  .order-amount {
    font-size: 12px;
    color: #999;
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

.page-header1 {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
  </style>