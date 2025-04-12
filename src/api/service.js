// service.js
import ajax from '@/utils/request.js'

// 获取商品列表
export function getProductList(params) {
  return ajax({
    url: '/products/list',
    method: 'POST',
    data: params
  });
}

// 新增商品
// export function addProduct(productData) {
//   return ajax({
//     url: '/products/addOrUpdate',
//     method: 'POST',
//     data: productData
//   });
// }

// 删除商品
// export function deleteProduct(productId) {
//   return ajax({
//     url: '/products/delete',
//     method: 'DELETE',
//     params: { productId }
//   });
// }

// 更新商品
// export function updateProduct(productData) {
//   return ajax({
//     url: '/products/addOrUpdate',
//     method: 'POST',
//     data: productData
//   });
// }


// 获取商品列表
export function getJZProductList(params) {
  return ajax({
    url: '/products/homekeep/list', 
    method: 'POST',
    data: params
  });
}

export function getKFProductList(params) {
    return ajax({
      url: '/products/pt/list', 
      method: 'POST',
      data: params
    });
  }

  export function getSMProductList(params) {
    return ajax({
      url: '/products/pe/list', 
      method: 'POST',
      data: params
    });
  }

// 新增商品
export function addProduct(productData) {
  return ajax({
    url: '/products/addOrUpdate', 
    method: 'POST',
    data: productData
  });
}

// 删除商品
export function deleteProduct(productId) {
  return ajax({
    url: `/products/delete?productId=${productId}`, // 修复拼接错误
    method: 'DELETE',
    params: {productId},
  });
}

// 更新商品
export function updateProduct(productData) {
  return ajax({
    url: '/products/addOrUpdate', 
    method: 'POST',
    data: productData
  });
}

// 获取商品分类统计列表
export function getProductClassList() {
  return ajax({
    url: '/products/class/list',
    method: 'GET',
  });
}

export function editProduct(editData) {
  return ajax({
    url: `/products/class/edit`,
    method: 'POST',
    data: {
      serviceType: editData.serviceType,
      oldCategory: editData.oldCategory, // 添加旧分类参数
      category: editData.category,
      status: editData.status,
    },
  });
}

export function deleteClassProduct(deleteData) {
  return ajax({
    url: `/products/class/delete?serviceType=${deleteData.serviceType}&category=${deleteData.category}`,
    method: 'delete',
    params: { serviceType: deleteData.serviceType, category: deleteData.category }
  });
}

