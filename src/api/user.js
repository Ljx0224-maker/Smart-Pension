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

// 获取用户数据列表
// export function getUserList(){
//     return ajax({
//         url:'/users/list',
//         method:'get'
//     })
// } 

export function getUserList(params) {
    return ajax({
      url: '/users/list',
      method: 'POST',
      data: params
    })
  }