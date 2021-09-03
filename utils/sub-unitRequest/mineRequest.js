let mineRequest = {
  mine_info: {
    apiMethod: 'GET',
    apiName: '/mine/mine_info',
    name: '获取用户基本信息'
  },
  update_mineInfo: {
    apiMethod: 'POST',
    apiName: '/mine/update_mineInfo',
    name: '修改保存用户基本信息'
  },
  concerns_count: {
    apiMethod: 'GET',
    apiName: '/mine/concerns_count',
    name: '我喜欢的用户数量'
  },
  concerns_list: {
    apiMethod: 'GET',
    apiName: '/mine/concerns_list',
    name: '我喜欢的用户列表'
  },
  is_follow_users: {
    apiMethod: 'GET',
    apiName: '/mine/is_follow_users',
    name: '是否喜欢了此用户'
  },
  follow_users: {
    apiMethod: 'POST',
    apiName: '/mine/follow_users',
    name: '喜欢此用户'
  },
  cancel_users: {
    apiMethod: 'GET',
    apiName: '/mine/cancel_users',
    name: '取消喜欢此用户'
  },
  collection_count: {
    apiMethod: 'GET',
    apiName: '/mine/collection_count',
    name: '我关注的用户数量'
  },
  collection_list: {
    apiMethod: 'GET',
    apiName: '/mine/collection_list',
    name: '我关注的用户列表'
  },
  is_follow_collection: {
    apiMethod: 'GET',
    apiName: '/mine/is_follow_collection',
    name: '是否关注了此用户'
  },
  follow_collection: {
    apiMethod: 'POST',
    apiName: '/mine/follow_collection',
    name: '关注此用户'
  },
  cancel_collection: {
    apiMethod: 'GET',
    apiName: '/mine/cancel_collection',
    name: '取消关注此用户'
  },
  my_dynamic_list: {
    apiMethod: 'GET',
    apiName: '/mine/my_dynamic_list',
    name: '我的动态列表'
  },
}

module.exports = mineRequest