import ajax from '@/utils/request.js'


// 获取优惠券列表
export function getCouponList(){
    return ajax({
        url:'/marketing/couponlist',
        method:'get'
    })
}


// 获取积分列表
export function points(){
    return ajax({
        url:'/marketing/points',
        method:'get'
    })
}
