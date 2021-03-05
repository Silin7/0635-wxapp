let journalismRequest = {
  journalism_list: {
    apiMethod: 'GET',
    apiName: '/journalism/journalism_list',
    name: '动态列表（参数: page, limit, type, area, class）'
  },
  journalism_details: {
    apiMethod: 'GET',
    apiName: '/journalism/journalism_details',
    name: '动态详情（参数: id）'
  },
}
module.exports = journalismRequest