let journalismRequest = {
  journalism_list: {
    apiMethod: 'GET',
    apiName: '/journalism/journalism_list',
    name: '新闻列表（参数: page, limit, type, area, class）'
  },
  journalism_details: {
    apiMethod: 'GET',
    apiName: '/journalism/journalism_details',
    name: '新闻详情（参数: id）'
  },
}
module.exports = journalismRequest