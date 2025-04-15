// 导入我们刚封装的axios
// ajax是自己在request.js中设的，可以改，不一定要叫这个名字
import request from '@/utils/request';

//管理系统登录接口的封装
export function loginFn(staffId, password){

    return request({
        method:'POST',
        url:`/login?staffId=${staffId}&password=${password}`,
        params: { staffId, password},
    })
}
// export function loginFn(staffId, password) {
//   return request({
//     method: 'POST',
//     url: '/login', // 移除 URL 参数拼接
//     data: { staffId, password }, // 参数通过 data 传递
//   });
// }


// 获取管理员列表
export function adminList(){
    return request({
        url:'/admin/list',
        method:'get'
    })
}

// 添加管理员
export function addAdmin(params){
    return request({
        url:'/admin/add',
        method:'POST',
        data:params
    })
}
// 修改管理员
export function updateAdmin(params){
    return request({
        url:'/admin/update',
        method:'POST',
        data:params
    })
}

// 删除管理员
export function deleteAdmin(params){
    return request({
        url:'/admin/delete',
        method:'POST',
        data:params
    })
}

// 获取用户列表
export function getUserList(params) {
  return request({
    url: '/users/list',
    method: 'get',
    params, // 传递分页参数
  });
}

// 新增或更新用户
export function addOrUpdateUser(data) {
  return request({
    url: '/users/addOrUpdate',
    method: 'post',
    data,
  });
}

// 删除用户
export function deleteUser(userId) {
  return request({
    url: '/users/delete?userId=' + userId,
    method: 'delete',
    params: { userId }, // 确保参数名为 userId
  });
}

// 获取用户详情
export function getUserDetail(userId) {
  return request({
    url: 'users/detail?userId=' + userId,
    method: 'get',
    params: { userId },
  });
}

// 获取标签列表
export function getTagsList() {
  return request({
    url: 'users/tags/list',
    method: 'get',
  });
}
// 查询用户（关键字搜索）
export function searchUser(query) {
  return ajax({
    url: '/users/query',
    method: 'POST',
    data: query
  });
}


// 新增或更新标签
export function addOrUpdateTag(data) {
  return request({
    url: 'users/tags/addOrUpdate',
    method: 'post',
    data,
  });
}

// 删除标签
export function deleteTag(tagId) {
  return request({
    url: 'users/tags/delete?tagId=' + tagId,
    method: 'delete',
    params: { tagId },
  });
}

// 新增用户
export function addUser(data) {
  return request({
    url: 'users/addOrUpdate',
    method: 'post',
    data,
  });
}

// 获取健康信息
export function getHealthDetail(userId) {
  return request({
    url: '/users/detail/health-record?userId=' + userId,
    method: 'get',
    params: { userId },
  });
}

// 获取设备信息
export function getDeviceDetail(userId) {
  return request({
    url: '/users/detail/device?userId=' + userId,
    method: 'get',
    params: { userId },
  });
}

// 获取用药信息
export function getMedicineDetail(userId) {
  return request({
    url: '/users/detail/medication-information?userId=' + userId,
    method: 'get',
    params: { userId },
  }); 
}

// 获取订单信息
export function getOrderDetail(userId) {
  return request({
    url: '/orders/users/detail/order?userId=' + userId,
    method: 'get',
    params: { userId },
  }); 
}

// 获取内容信息
export function getContentDetail(userId) {
  return request({
    url: '/operation/users/detail/dynamic?userId=' + userId,
    method: 'get',
    params: { userId },
  }); 
}
