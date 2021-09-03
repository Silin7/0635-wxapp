let specialtyRequest = {
  specialty_list: {
    apiMethod: 'GET',
    apiName: '/specialty/specialty_list',
    name: '特产列表'
  },
  specialty_details: {
    apiMethod: 'GET',
    apiName: '/specialty/specialty_details',
    name: '特产详情（参数：id）'
  },
}

module.exports = specialtyRequest