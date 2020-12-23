let otherRequest = {
  history_today: {
    apiMethod: 'GET',
    apiName: '/other/history_today',
    name: '历史上的今天（参数：type[0: 简 1: 详]）'
  },
  rubbish: {
    apiMethod: 'GET',
    apiName: '/other/rubbish',
    name: '垃圾分类查询（name）'
  },
  
}
module.exports = otherRequest