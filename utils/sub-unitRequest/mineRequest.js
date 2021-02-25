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
    name: '我关注的人列表（参数：followers_id）'
  },
  is_follow_users: {
    apiMethod: 'GET',
    apiName: '/mine/is_follow_users',
    name: '是否关注此用户（参数：followers_id, watched_id）,已关注返回：1，未关注返回：0'
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
  }
}
module.exports = mineRequest