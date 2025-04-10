import ajax from '@/utils/request'

//获取轮播图
export function getBannerList () {
    return ajax ({
        url: '/banner/list'
    })
}

//添加轮播图
export function addBanner () {
    return ajax ({
        url: '/banner/add',
        method: 'post',
        data: params
    })
}


// 获取活动列表
export function getEvents(params) {
  return ajax({
    url: '/events/list',
    method: 'get',
    params,
  });
}

// 添加新活动
export function addEvent(data) {
  return ajax({
    url: '/events',
    method: 'post',
    data,
  });
}

// 更新活动
export function updateEvent(id, data) {
  return ajax({
    url: `/events/${id}`,
    method: 'put',
    data,
  });
}

// 删除活动
export function deleteEvent(id) {
  return ajax({
    url: `/events/${id}`,
    method: 'delete',
  });
}

// 批量删除活动
export function batchDeleteEvents(ids) {
  return ajax({
    url: `/events/batch-delete`,
    method: 'post',
    data: { ids },
  });
}

// 获取报名信息列表
export function getRegistrations(params) {
    return ajax({
      url: '/registrations/list',
      method: 'get',
      params,
    });
  }
  
  // 审核报名信息
  export function approveRegistration(id) {
    return ajax({
      url: `/registrations/${id}/approve`,
      method: 'post',
    });
  }
  
  // 删除报名信息
  export function deleteRegistration(id) {
    return ajax({
      url: `/registrations/${id}`,
      method: 'delete',
    });
  }
  
  // 批量操作报名信息
  export function batchOperateRegistrations(ids) {
    return ajax({
      url: `/registrations/batch-operate`,
      method: 'post',
      data: { ids },
    });
  }


// 获取动态列表
export function getNews(params) {
  return ajax({
    url: '/news/list',
    method: 'get',
    params,
  });
}

// 更新动态显示状态
export function updateNewsVisibility(id, data) {
  return ajax({
    url: `/news/${id}/visibility`,
    method: 'put',
    data,
  });
}

// 删除动态
export function deleteNews(id) {
  return ajax({
    url: `/news/${id}`,
    method: 'delete',
  });
}

// 批量删除动态
export function batchDeleteNews(ids) {
  return ajax({
    url: `/news/batch-delete`,
    method: 'post',
    data: { ids },
  });
}


// 获取菜谱列表
export function getDishes(params) {
  return ajax({
    url: '/operation/health-diet/list',
    method: 'post',
    data: params,
  });
}

// 添加新菜谱
export function addDish(data) {
  return ajax({
    url: '/operation/health-diet/addOrUpdata',
    method: 'post',
    data,
  });
}

// 更新菜谱
export function updateDish(id, data) {
  return ajax({
    url: `/operation/health-diet/addOrUpdata`,
    method: 'post',
    data: { ...data, healthDietId: id },
  });
}

// 删除菜谱
export function deleteDish(id) {
  return ajax({
    url: `/operation/health-diet/delete?healthDietId=${id}`,
    method: 'delete',
    params: { healthDietId: id },
  });
}

// 批量删除菜谱
export function batchDeleteDishes(ids) {
  return ajax({
    url: `/operation/health-diet/batch-delete`,
    method: 'post',
    data: { ids },
  });
}

// 获取健康资讯列表
export function getHealthInfo(params) {
  return ajax({
    url: '/health-info/list',
    method: 'get',
    params,
  });
}

// 添加新健康资讯
export function addHealthInfo(data) {
  return ajax({
    url: '/health-info',
    method: 'post',
    data,
  });
}

// 更新健康资讯
export function updateHealthInfo(id, data) {
  return ajax({
    url: `/health-info/${id}`,
    method: 'put',
    data,
  });
}

// 删除健康资讯
export function deleteHealthInfo(id) {
  return ajax({
    url: `/health-info/${id}`,
    method: 'delete',
  });
}

// 批量删除健康资讯
export function batchDeleteHealthInfo(ids) {
  return ajax({
    url: `/health-info/batch-delete`,
    method: 'post',
    data: { ids },
  });
}


// 获取疾病列表
export function getDiseases(params) {
  return ajax({
    url: '/diseases/list',
    method: 'get',
    params,
  });
}

// 添加新疾病
export function addDisease(data) {
  return ajax({
    url: '/diseases',
    method: 'post',
    data,
  });
}

// 更新疾病
export function updateDisease(id, data) {
  return ajax({
    url: `/diseases/${id}`,
    method: 'put',
    data,
  });
}

// 删除疾病
export function deleteDisease(id) {
  return ajax({
    url: `/diseases/${id}`,
    method: 'delete',
  });
}

// 批量删除疾病
export function batchDeleteDiseases(ids) {
  return ajax({
    url: `/diseases/batch-delete`,
    method: 'post',
    data: { ids },
  });
}


// 获取机构列表
export function getInstitutions(params) {
  return ajax({
    url: '/institutions/list',
    method: 'get',
    params,
  });
}

// 添加新机构
export function addInstitution(data) {
  return ajax({
    url: '/institutions',
    method: 'post',
    data,
  });
}

// 更新机构
export function updateInstitution(id, data) {
  return ajax({
    url: `/institutions/${id}`,
    method: 'put',
    data,
  });
}

// 删除机构
export function deleteInstitution(id) {
  return ajax({
    url: `/institutions/${id}`,
    method: 'delete',
  });
}

// 批量删除机构
export function batchDeleteInstitutions(ids) {
  return ajax({
    url: `/institutions/batch-delete`,
    method: 'post',
    data: { ids },
  });
}


// 获取视频列表
export function getVideos(params) {
  return ajax({
    url: '/videos/list',
    method: 'get',
    params,
  });
}

// 添加新视频
export function addVideo(data) {
  return ajax({
    url: '/videos',
    method: 'post',
    data,
  });
}

// 更新视频
export function updateVideo(id, data) {
  return ajax({
    url: `/videos/${id}`,
    method: 'put',
    data,
  });
}

// 删除视频
export function deleteVideo(id) {
  return ajax({
    url: `/videos/${id}`,
    method: 'delete',
  });
}

// 批量删除视频
export function batchDeleteVideos(ids) {
  return ajax({
    url: `/videos/batch-delete`,
    method: 'post',
    data: { ids },
  });
}


// 获取评论列表
export function getComments(params) {
  return ajax({
    url: '/comments/list',
    method: 'get',
    params,
  });
}

// 更新评论显示状态
export function updateCommentVisibility(id, data) {
  return ajax({
    url: `/comments/${id}/visibility`,
    method: 'put',
    data,
  });
}

// 删除评论
export function deleteComment(id) {
  return ajax({
    url: `/comments/${id}`,
    method: 'delete',
  });
}

// 批量删除评论
export function batchDeleteComments(ids) {
  return ajax({
    url: `/comments/batch-delete`,
    method: 'post',
    data: { ids },
  });
}