import ajax from '@/utils/request'

// 获取轮播图列表
export function getBanners(params) {
  return ajax({
    url: '/operation/life-circle/carousel/list',
    method: 'post',
    data: params,
  });
}

// 添加或更新轮播图
export function addOrUpdateBanner(data) {
  return ajax({
    url: '/operation/life-circle/carousel/addOrUpdate',
    method: 'post',
    data,
  });
}

// 删除轮播图
export function deleteBanner(id) {
  return ajax({
    url: `/operation/life-circle/carousel/delete?carouselId=${id}`,
    method: 'delete',
    params: { carouselId: id },
  });
}

// 批量删除轮播图
export function batchDeleteBanners(ids) {
  return ajax({
    url: `/operation/life-circle/carousel/batch-delete`,
    method: 'post',
    data: { ids },
  });
}

// 获取动态列表
export function getDynamics(params) {
  return ajax({
    url: '/operation/life-circle/dynamic/list',
    method: 'post',
    data: params,
  });
}

// 删除动态
export function deleteDynamic(id) {
  return ajax({
    url: `/operation/life-circle/dynamic/delete?dynamicId=${id}`,
    method: 'delete',
    params: { dynamicId: id },
  });
}

// 批量删除动态
export function batchDeleteDynamics(ids) {
  return ajax({
    url: `/operation/life-circle/dynamic/batch-delete`,
    method: 'post',
    data: { ids },
  });
}

// 获取活动列表
export function getEvents(params) {
  return ajax({
    url: '/operation/elder-activity/activity/list',
    method: 'post',
    data: params,
  });
}

// 添加新活动
export function addEvent(data) {
  return ajax({
    url: '/operation/elder-activity/activity/addOrUpdate',
    method: 'post',
    data,
  });
}

// 更新活动
export function updateEvent(id, data) {
  return ajax({
    url: `/operation/elder-activity/activity/addOrUpdate`,
    method: 'post',
    data: { ...data, activityId: id },
  });
}

// 删除活动
export function deleteEvent(id) {
  return ajax({
    url: `/operation/elder-activity/activity/delete?activityId=${id}`,
    method: 'delete',
    params: { activityId: id },
  });
}

// 批量删除活动
export function batchDeleteEvents(ids) {
  return ajax({
    url: `/operation/elder-activity/activity/batch-delete`,
    method: 'post',
    data: { ids },
  });
}

// 获取报名信息列表
export function getRegistrations(params) {
  return ajax({
    url: '/operation/elder-activity/registration/list',
    method: 'post',
    data: params,
  });
}

// 删除报名信息
export function deleteRegistration(id) {
  return ajax({
    url: `/operation/elder-activity/registration/delete?registrationId=${id}`,
    method: 'delete',
    params: { registrationId: id },
  });
}

// 批量删除报名信息
export function batchDeleteRegistrations(ids) {
  return ajax({
    url: `/operation/elder-activity/registration/batch-delete`,
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
    url: '/operation/health-diet/addOrUpdate',
    method: 'post',
    data,
  });
}

// 更新菜谱
export function updateDish(id, data) {
  return ajax({
    url: `/operation/health-diet/addOrUpdate`,
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
export function getHealthNewsList(params) {
  return ajax({
    url: '/operation/health-news/list',
    method: 'post',
    data: params,
  });
}

// 添加或更新健康资讯
export function addOrUpdateHealthNews(data) {
  return ajax({
    url: '/operation/health-news/addOrUpdate',
    method: 'post',
    data,
  });
}

// 删除健康资讯
export function deleteHealthNews(id) {
  return ajax({
    url: `/operation/health-news/delete?healthNewsId=${id}`,
    method: 'delete',
    params: { healthNewsId: id },
  });
}

// 搜索健康资讯
export function queryHealthNews(params) {
  return ajax({
    url: '/operation/health-news/query',
    method: 'post',
    data: params,
  });
}

// 获取疾病列表
export function getDiseases(params) {
  return ajax({
    url: '/operation/disease-guide/list',
    method: 'post',
    data: params,
  });
}

// 添加新疾病
export function addDisease(data) {
  return ajax({
    url: '/operation/disease-guide/addOrUpdate',
    method: 'post',
    data,
  });
}

// 更新疾病
export function updateDisease(id, data) {
  return ajax({
    url: `/operation/disease-guide/addOrUpdate`,
    method: 'post',
    data: { ...data, healthDietId: id },
  });
}

// 删除疾病
export function deleteDisease(id) {
  return ajax({
    url: `/operation/disease-guide/delete?diseaseGuideId=${id}`,
    method: 'delete',
    params: { diseaseGuideId: id },
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
    url: '/operation/rest-home/list',
    method: 'post',
    data: params,
  });
}

// 添加新机构
export function addInstitution(data) {
  return ajax({
    url: '/operation/rest-home/addOrUpdate',
    method: 'post',
    data,
  });
}

// 更新机构
export function updateInstitution(id, data) {
  return ajax({
    url: `/operation/rest-home/addOrUpdate`,
    method: 'post',
    data: { ...data, restHomeId: id },
  });
}

// 删除机构
export function deleteInstitution(id) {
  return ajax({
    url: `/operation/rest-home/delete?restHomeId=${id}`,
    method: 'delete',
    params: { restHomeId: id },
  });
}

// 批量删除机构
export function batchDeleteInstitutions(ids) {
  return ajax({
    url: `/operation/rest-home/batch-delete`,
    method: 'post',
    data: { ids },
  });
}


// 获取视频列表
export function getVideos(params) {
  return ajax({
    url: '/operation/health_lecture/list',
    method: 'post',
    data: params,
  });
}

// 添加新视频
export function addVideo(data) {
  return ajax({
    url: '/operation/health_lecture/addOrUpdate',
    method: 'post',
    data,
  });
}

// 更新视频
export function updateVideo(id, data) {
  return ajax({
    url: `/operation/health_lecture/addOrUpdate`,
    method: 'post',
    data: { ...data, healthLectureId: id },
  });
}

// 删除视频
export function deleteVideo(id) {
  return ajax({
    url: `/operation/health_lecture/delete?healthLectureId=${id}`,
    method: 'delete',
    params: { healthLectureId: id },
  });
}

// 批量删除视频
export function batchDeleteVideos(ids) {
  return ajax({
    url: `/operation/health_lecture/batch-delete`,
    method: 'post',
    data: { ids },
  });
}

// 获取评论列表
export function getComments(params) {
  return ajax({
    url: '/operation/review/list',
    method: 'get',
    params,
  });
}

// 删除评论
export function deleteComment(reviewId) {
  return ajax({
    url: '/operation/review/delete?reviewId=' + reviewId,
    method: 'delete',
    params: { reviewId },
  });
}


  
// 更新评论显示状态
export function updateCommentVisibility(reviewId,status) {
  return ajax({
    url: `/operation/review/updateStatus?reviewId=${reviewId}&status=${status}`,
    method: 'post',
    params: { reviewId, status}, // 使用 params 传递参数
  });
}

// 批量删除评论（如果需要实现批量删除功能，可以扩展后端接口）
export function batchDeleteComments(ids) {
  return ajax({
    url: '/operation/review/batch-delete', // 假设后端支持批量删除
    method: 'post',
    data: { ids },
  });
}

