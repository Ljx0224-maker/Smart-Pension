import ajax from '@/utils/request.js';

// 获取服务人员列表
export function getStaffList(params) {
  return ajax({
    url: '/service-staff/list',
    method: 'POST',
    data: params
  });
}

// 删除服务人员
export function deleteStaff(staffId) {
  return ajax({
    url: '/service-staff/delete?staffId=' + staffId,
    method: 'DELETE',
    params: { staffId }
  });
}

// 添加或更新服务人员
export function addOrUpdateStaff(staffData) {
  return ajax({
    url: '/service-staff/addOrUpdate',
    method: 'POST',
    data: staffData
  });
}

// 获取服务人员详情
export function getStaffDetail(staffId) {
  return ajax({
    url: '/service-staff/query?staffId=' + staffId,
    method: 'POST',
     params: { staffId } ,
  });
}