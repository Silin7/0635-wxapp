let scenicspotRequest = {
  scenicspot_list: {
    apiMethod: 'GET',
    apiName: '/scenicspot/scenicspot_list',
    name: '景点列表'
  },
  scenicspot_info: {
    apiMethod: 'GET',
    apiName: '/scenicspot/scenicspot_info',
    name: '景点详情'
  },
  mine_scenicspot_list: {
    apiMethod: 'GET',
    apiName: '/scenicspot/mine_scenicspot_list',
    name: '我关注的景点列表'
  },
  is_follow_scenicspot: {
    apiMethod: 'POST',
    apiName: '/scenicspot/is_follow_scenicspot',
    name: '是否关注此景点'
  },
  follow_scenicspot: {
    apiMethod: 'POST',
    apiName: '/scenicspot/follow_scenicspot',
    name: '关注此景点'
  },
  cancel_scenicspot: {
    apiMethod: 'POST',
    apiName: '/scenicspot/cancel_scenicspot',
    name: '取消关注此景点'
  },
}
module.exports = scenicspotRequest