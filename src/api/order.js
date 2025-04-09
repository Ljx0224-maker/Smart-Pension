import ajax from '@/utils/request.js';

// 获取订单列表
export function orderList(params) {
  return ajax({
    url: '/order/list',
    method: 'get',
    params,
  });
}

// 更新订单
export function updateOrder(data) {
  return ajax({
    url: '/order/update',
    method: 'post',
    data,
  });
}

// 删除订单
export function deleteOrder(data) {
  return ajax({
    url: '/order/delete',
    method: 'post',
    data,
  });
}

// 添加订单
export function addOrder(data) {
  return ajax({
    url: '/order/create',
    method: 'post',
    data,
  });
}

// 获取售后列表
export function afterSalesList(params) {
    return ajax({
      url: '/after-sales/list',
      method: 'get',
      params,
    });
  }
  
  // 更新售后状态
  export function updateAfterSalesStatus(data) {
    return ajax({
      url: '/after-sales/update-status',
      method: 'post',
      data,
    });
  }
  
  // 关闭售后
  export function closeAfterSales(data) {
    return ajax({
      url: '/after-sales/close',
      method: 'post',
      data,
    });
  }
  
  // 获取售后详情
  export function getAfterSalesDetails(id) {
    return ajax({
      url: `/after-sales/details/${id}`,
      method: 'get',
    });
  }

// 获取退款原因列表
export function getRefundReasons(params) {
    return ajax({
      url: '/refund-reasons/list',
      method: 'get',
      params,
    });
  }
  
  // 更新退款原因状态
  export function updateRefundReasonStatus(id, data) {
    return ajax({
      url: `/refund-reasons/${id}/status`,
      method: 'put',
      data,
    });
  }
  
  // 删除退款原因
  export function deleteRefundReason(id) {
    return ajax({
      url: `/refund-reasons/${id}`,
      method: 'delete',
    });
  }
  
  // 批量删除退款原因
  export function batchDeleteRefundReasons(ids) {
    return ajax({
      url: `/refund-reasons/batch-delete`,
      method: 'post',
      data: { ids },
    });
  }
  
  // 添加新退款原因
  export function addRefundReason(data) {
    return ajax({
      url: '/refund-reasons',
      method: 'post',
      data,
    });
  }
  
  // 更新退款原因
  export function updateRefundReason(id, data) {
    return ajax({
      url: `/refund-reasons/${id}`,
      method: 'put',
      data,
    });
  }

  // 获取订单设置
export function getOrderSettings() {
    return ajax({
      url: '/order/settings',
      method: 'get',
    });
  }
  
  // 保存订单设置
  export function saveOrderSettings(data) {
    return ajax({
      url: '/order/settings',
      method: 'post',
      data,
    });
  }

  // 获取交易记录列表
export function getTransactionList(params) {
    return ajax({
      url: '/transactions/list',
      method: 'get',
      params,
    });
  }
  
  // 批量删除交易记录
  export function batchDeleteTransactions(ids) {
    return ajax({
      url: `/transactions/batch-delete`,
      method: 'post',
      data: { ids },
    });
  }