import ajax from '@/utils/request.js';



// 获取消息列表
export function getMessageList() {
  return ajax({
    url: '/mass-message/list',
    method: 'post',
  });
}

// 添加或更新消息
export function addOrUpdateMessage(data) {
  return ajax({
    url: '/mass-message/addOrUpdate',
    method: 'post',
    data,
  });
}

// 删除单条消息
export function deleteMessage(id) {
  return ajax({
    url: '/mass-message/delete?massMessageId=' + id,
    method: 'delete',
    params: { massMessageId: id },
  });
}

// 分页查询消息
export function queryMessages(params) {
  return ajax({
    url: '/mass-message/query',
    method: 'post',
    data: params,
  });
}

// 获取会话列表
export function getConversations(params) {
    return ajax({
      url: '/conversations/list',
      method: 'get',
      params,
    });
  }
  
  // 获取当前会话的消息
  export function getConversationMessages(conversationId) {
    return ajax({
      url: `/conversations/${conversationId}/messages`,
      method: 'get',
    });
  }
  
  // 发送消息
  export function sendMessage(conversationId, message) {
    return ajax({
      url: `/conversations/${conversationId}/messages`,
      method: 'post',
      data: message,
    });
  }