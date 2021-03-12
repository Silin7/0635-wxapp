let otherRequest = {
  history_today: {
    apiMethod: 'GET',
    apiName: '/other/history_today',
    name: '历史上的今天'
  },
  rubbish: {
    apiMethod: 'GET',
    apiName: '/other/rubbish',
    name: '垃圾分类查询'
  },
  girl_random: {
    apiMethod: 'GET',
    apiName: '/other/girl_random',
    name: '随机获取美女福利图片'
  },
  jokes_random: {
    apiMethod: 'GET',
    apiName: '/other/jokes_random',
    name: '随机获取笑话段子列表'
  },
  weather_current: {
    apiMethod: 'GET',
    apiName: '/other/weather_current',
    name: '获取特定城市今日天气信息'
  },
  weather_forecast: {
    apiMethod: 'GET',
    apiName: '/other/weather_forecast',
    name: '获取特定城市今天及未来天气信息'
  },
  news_types: {
    apiMethod: 'GET',
    apiName: '/other/news_types',
    name: '获取所有新闻类型列表'
  },
  news_list: {
    apiMethod: 'GET',
    apiName: '/other/news_list',
    name: '根据新闻类型获取新闻列表'
  },
  news_details: {
    apiMethod: 'GET',
    apiName: '/other/news_details',
    name: '根据新闻id获取新闻详情'
  },
}
module.exports = otherRequest