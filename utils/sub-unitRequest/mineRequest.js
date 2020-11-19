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
  }
}
module.exports = mineRequest