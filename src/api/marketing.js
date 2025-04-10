import ajax from '@/utils/request.js';

// 获取优惠券列表
export function getCoupons(params) {
  return ajax({
    url: '/coupons/list',
    method: 'get',
    params,
  });
}

// 添加新优惠券
export function addCoupon(data) {
  return ajax({
    url: '/coupons',
    method: 'post',
    data,
  });
}

// 更新优惠券
export function updateCoupon(id, data) {
  return ajax({
    url: `/coupons/${id}`,
    method: 'put',
    data,
  });
}

// 删除优惠券
export function deleteCoupon(id) {
  return ajax({
    url: `/coupons/${id}`,
    method: 'delete',
  });
}

// 批量删除优惠券
export function batchDeleteCoupons(ids) {
  return ajax({
    url: `/coupons/batch-delete`,
    method: 'post',
    data: { ids },
  });
}

// 获取积分规则
export function getPointsRules() {
    return ajax({
      url: '/points/rules',
      method: 'get',
    });
  }
  
  // 保存积分规则
  export function savePointsRules(data) {
    return ajax({
      url: '/points/rules',
      method: 'post',
      data,
    });
  }