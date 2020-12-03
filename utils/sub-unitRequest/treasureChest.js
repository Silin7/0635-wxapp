let treasureChest = {
  other_history_today: {
    apiMethod: 'GET',
    apiName: '/other/history_today',
    name: '历史上的今天'
  },
  other_weather_current: {
    apiMethod: 'GET',
    apiName: '/other/weather_current',
    name: '获取特定城市今日天气信息'
  },
  other_weather_forecast: {
    apiMethod: 'GET',
    apiName: '/other/weather_forecast',
    name: '获取特定城市今天及未来天气信息'
  },
  other_news_types: {
    apiMethod: 'GET',
    apiName: '/other/news_types',
    name: '获取所有新闻类型列表'
  },
  other_news_list: {
    apiMethod: 'GET',
    apiName: '/other/news_list',
    name: '根据新闻类型获取新闻列表'
  },
  other_news_details: {
    apiMethod: 'GET',
    apiName: '/other/news_details',
    name: '根据新闻id获取新闻详情'
  },
  other_translate: {
    apiMethod: 'GET',
    apiName: '/other/translate',
    name: '文本多语种翻译'
  }
}
module.exports = treasureChest