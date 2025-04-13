import ajax from '@/utils/request.js';

// 查询优惠券
export function queryCoupons(data) {
  return ajax({
    url: '/discount-coupons/query',
    method: 'post',
    data,
  });
}

// 新增或更新优惠券
export function addOrUpdateCoupon(data) {
  return ajax({
    url: '/discount-coupons/addOrUpdate',
    method: 'post',
    data,
  });
}

// 删除优惠券
export function deleteCouponById(discountId) {
  return ajax({
    url: `/discount-coupons/delete?discountId=${discountId}`,
    method: 'delete',
    params: { discountId },
  });
}

// 获取优惠券列表
export function fetchCouponList() {
  return ajax({
    url: '/discount-coupons/list',
    method: 'post',
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