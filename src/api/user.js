// 导入我们刚封装的axios
// ajax是自己在request.js中设的，可以改，不一定要叫这个名字
import ajax from '@/utils/request.js'


// 管理系统登录接口的封装
export function loginFn(params){

    return ajax({
        method:'POST',
        url:'/admin/login',
        data:params
    })
}


// 获取管理员列表
export function adminList(){
    return ajax({
        url:'/admin/list',
        method:'get'
    })
}

// 添加管理员
export function addAdmin(params){
    return ajax({
        url:'/admin/add',
        method:'POST',
        data:params
    })
}
// 修改管理员
export function updateAdmin(params){
    return ajax({
        url:'/admin/update',
        method:'POST',
        data:params
    })
}

// 删除管理员
export function deleteAdmin(params){
    return ajax({
        url:'/admin/delete',
        method:'POST',
        data:params
    })
}


// 用户列表（带分页和搜索）
export function getUserList(params) {
  return ajax({
    url: '/users/list',
    method: 'POST',
    data: params
  });
}

// 添加/修改用户
export function addUser(userData) {
  return ajax({
    url: '/users/addOrUpdate',
    method: 'POST',
    data: userData
  });
}

// 删除用户
export function deleteUser(userId) {
  return ajax({
    url: '/users/delete?userId=' + userId,
    method: 'DELETE',
    params: { userId }
  });
}

// 获取用户详情
export function getUserDetail(userId) {
  return ajax({
    url: '/users/detail?userId=' + userId,
    method: 'GET',
    params: { userId }
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

// 标签列表（分页）
export function getTagsList() {
  return ajax({
    url: '/users/tags/list',
    method: 'GET',
  });
}

// 添加或修改标签
export function addOrUpdateTag(tagData) {
  return ajax({
    url: '/users/tags/addOrUpdate',
    method: 'POST',
    data: tagData,
  });
}

// 删除标签
export function deleteTag(tagId) {
  return ajax({
    url: '/users/tags/delete',
    method: 'DELETE',
    params: { tagId },
  });
}
