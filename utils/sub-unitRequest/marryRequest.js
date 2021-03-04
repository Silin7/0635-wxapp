let marryRequest = {
  marry_list: {
    apiMethod: 'GET',
    apiName: '/marry/marry_list',
    name: '相亲列表（参数：is_top, gender, marry, friends）'
  },
  marry_details: {
    apiMethod: 'GET',
    apiName: '/marry/marry_details',
    name: '相亲详情（参数：register_id）'
  },
  marry_issign: {
    apiMethod: 'GET',
    apiName: '/marry/marry_issign',
    name: '相亲详情（参数：register_id, followers_id）'
  },
  marry_sign: {
    apiMethod: 'GET',
    apiName: '/marry/marry_sign',
    name: '相亲详情（参数：register_id, followers_id）'
  },
}
module.exports = marryRequest