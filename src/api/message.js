import ajax from '@/utils/request.js';

// 获取消息列表
export function getMessages(params) {
  return ajax({
    url: '/messages/list',
    method: 'get',
    params,
  });
}

// 添加新消息
export function addMessage(data) {
  return ajax({
    url: '/messages',
    method: 'post',
    data,
  });
}

// 更新消息
export function updateMessage(id, data) {
  return ajax({
    url: `/messages/${id}`,
    method: 'put',
    data,
  });
}

// 删除消息
export function deleteMessage(id) {
  return ajax({
    url: `/messages/${id}`,
    method: 'delete',
  });
}

// 批量删除消息
export function batchDeleteMessages(ids) {
  return ajax({
    url: `/messages/batch-delete`,
    method: 'post',
    data: { ids },
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