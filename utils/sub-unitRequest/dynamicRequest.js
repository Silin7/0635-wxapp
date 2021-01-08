let dynamicRequest = {
  dynamic_news_list: {
    apiMethod: 'GET',
    apiName: '/dynamic/dynamic_news_list',
    name: '县市新闻列表'
  },
  dynamic_news_details: {
    apiMethod: 'GET',
    apiName: '/dynamic/dynamic_news_details',
    name: '县市新闻详情'
  },
  dynamic_list: {
    apiMethod: 'GET',
    apiName: '/dynamic/dynamic_list',
    name: '动态列表'
  },
  dynamic_details: {
    apiMethod: 'GET',
    apiName: '/dynamic/dynamic_details',
    name: '动态详情'
  },
}
module.exports = dynamicRequest