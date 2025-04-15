import ajax from '@/utils/request.js';

// 获取员工列表（带分页）
export function getStaffList(params) {
    return ajax({
      url: '/setting/staff-info/list',
      method: 'POST',
      data: params // 参数示例: { pageNum: 1, pageSize: 10, keyword: '' }
    });
  }
  
  // 添加或更新员工
  export function addOrUpdateStaff(staffData) {
    return ajax({
      url: '/setting/staff-info/addOrUpdate',
      method: 'POST',
      data: staffData // 字段需与StaffInfo实体类一致
    });
  }
  
  // 删除员工
  export function deleteStaff(staffId) {
    return ajax({
      url: '/setting/staff-info/delete?staffId=' + staffId,
      method: 'DELETE',
      params: { staffId } // 参数名必须与Java接口的@RequestParam一致
    });
  }

  // 获取用户隐私协议详情
export function getPolicyDetail(policyId) {
  return ajax({
    url: '/setting/policy/detail?policyId=' + policyId,
    method: 'GET',
    params: { policyId } // 参数名必须与Java接口的@RequestParam一致
  });
}

// 编辑用户隐私协议信息
export function updatePolicyInfo(userPolicyInfo) {
  return ajax({
    url: '/setting/policy/update',
    method: 'POST',
    data: userPolicyInfo, // 使用POST请求的请求体传递用户隐私协议信息
  });
}
// 重置员工密码

// 重置员工密码
export const updatePassword = (staffId, oldPassword, newPassword) => {
  const querystring = `staff_id=${encodeURIComponent(staffId)}&oldPassword=${encodeURIComponent(oldPassword)}&newPassword=${encodeURIComponent(newPassword)}`;
  
  return ajax({
    method: 'POST',
    url: `/updatePassword?${querystring}`,  // 将查询参数添加到 URL 后面
  });
};