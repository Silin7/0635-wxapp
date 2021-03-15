let mineRequest = {
  mine_info: {
    apiMethod: 'GET',
    apiName: '/mine/mine_info',
    name: '获取个人详细信息'
  },
  update_mineInfo: {
    apiMethod: 'POST',
    apiName: '/mine/update_mineInfo',
    name: '修改保存个人信息'
  },
  concerns_count: {
    apiMethod: 'GET',
    apiName: '/mine/concerns_count',
    name: '我关注的人数量'
  },
  concerns_list: {
    apiMethod: 'GET',
    apiName: '/mine/concerns_list',
    name: '我关注的人列表'
  },
  follow_users: {
    apiMethod: 'POST',
    apiName: '/mine/follow_users',
    name: '关注此用户'
  },
  cancel_users: {
    apiMethod: 'GET',
    apiName: '/mine/cancel_users',
    name: '取消关注此用户'
  },
  collection_count: {
    apiMethod: 'GET',
    apiName: '/mine/collection_count',
    name: '我的收藏数量'
  },
  collection_list: {
    apiMethod: 'GET',
    apiName: '/mine/collection_list',
    name: '我的收藏列表'
  },
  follow_collection: {
    apiMethod: 'POST',
    apiName: '/mine/follow_collection',
    name: '收藏本菜谱'
  },
  cancel_collection: {
    apiMethod: 'GET',
    apiName: '/mine/cancel_collection',
    name: '取消收藏菜谱'
  },
  my_dynamic_list: {
    apiMethod: 'GET',
    apiName: '/mine/my_dynamic_list',
    name: '我的动态列表'
  },
}
module.exports = mineRequest