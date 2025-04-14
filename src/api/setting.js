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