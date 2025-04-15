import ajax from '@/utils/request.js';
import request from '@/utils/request';

// 获取订单列表
export function getOrders(params) {
  return ajax({
    url: '/orders/list',
    method: 'post',
    data: params,
  });
}

// 删除订单
export function deleteOrder(orderId) {
  return ajax({
    url: `/orders/delete?orderId=${orderId}`,
    method: 'delete',
    params: { orderId },
  });
}

// 添加或更新订单
export function addOrUpdateOrder(data) {
  return ajax({
    url: '/orders/addOrUpdate',
    method: 'post',
    data,
  });
}

// 获取售后订单列表
export function afterSalesList(params) {
  return ajax({
    url: '/orders/refund-list',
    method: 'post',
    data: params,
  });
}

// 获取售后订单详情
export function afterSalesDetail(orderId) {
  return ajax({
    url: '/orders/refund-detail?orderId=' + orderId,
    method: 'get',
    params: { orderId },
  });
}

// 查询售后订单
export function queryAfterSales(params) {
  return ajax({
    url: '/orders/refund-query',
    method: 'post',
    data: params,
  });
}


// 获取退款原因列表
export function getRefundReasons(params) {
  return request({
    url: '/orders/refund-reason/list',
    method: 'post',
    data: params,
  });
}

// 新增或编辑退款原因
export function addOrUpdateRefundReason(data) {
  return request({
    url: '/orders/refund-reason/addOrUpdate',
    method: 'post',
    data,
  });
}

// 删除退款原因
export function deleteRefundReason(refundReasonId) {
  return request({
    url: `/orders/refund-reason/delete?refundReasonId=${refundReasonId}`,
    method: 'delete',
    params: { refundReasonId },
  });
}

// 批量删除退款原因
export function batchDeleteRefundReasons(ids) {
  return request({
    url: '/orders/refund-reason/delete',
    method: 'delete',
    data: { ids },
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


    // 获取收支明细列表
  export function getTransactionList(params) {
    return ajax({
      url: '/orders/income-payment/list',
      method: 'post',
      data: params,
    });
  }
  
  // 查询收支明细
  export function queryTransaction(params) {
    return ajax({
      url: '/orders/income-payment/query',
      method: 'post',
      data: params,
    });
  }

  
  // 查看订单详情接口
  export function getOrderDetail(orderId) {
    return request({
      url: '/orders/detail?orderId=' + orderId,
      method: "get",
      params: { orderId }, // 通过查询参数传递订单ID
    });
  }


