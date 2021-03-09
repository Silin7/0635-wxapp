let mineRequest = {
  mine_info: {
    apiMethod: 'GET',
    apiName: '/mine/mine_info',
    name: '获取个人详细信息（参数：id）'
  },
  update_mineInfo: {
    apiMethod: 'POST',
    apiName: '/mine/update_mineInfo',
    name: '修改保存个人信息'
  },
  concerns_count: {
    apiMethod: 'GET',
    apiName: '/mine/concerns_count',
    name: '我关注的人数量（参数：followers_id）'
  },
  concerns_list: {
    apiMethod: 'GET',
    apiName: '/mine/concerns_list',
    name: '我关注的人列表（参数：page, limit, followers_id）'
  },
  follow_users: {
    apiMethod: 'POST',
    apiName: '/mine/follow_users',
    name: '关注此用户（参数：followers_id, watched_id, nick_name, gender, photo, introduce）'
  },
  cancel_users: {
    apiMethod: 'GET',
    apiName: '/mine/cancel_users',
    name: '取消关注此用户（参数：followers_id, watched_id）'
  },
  collection_count: {
    apiMethod: 'GET',
    apiName: '/mine/collection_count',
    name: '我的收藏数量（参数：followers_id）'
  },
  collection_list: {
    apiMethod: 'GET',
    apiName: '/mine/collection_list',
    name: '我的收藏列表（参数：page, limit, followers_id）'
  },
  follow_collection: {
    apiMethod: 'POST',
    apiName: '/mine/follow_collection',
    name: '收藏本菜谱（参数：followers_id, menu_id, menu_name, menu_info, menu_image）'
  },
  cancel_collection: {
    apiMethod: 'GET',
    apiName: '/mine/cancel_collection',
    name: '取消收藏菜谱（参数：followers_id, menu_id'
  }
}
module.exports = mineRequest