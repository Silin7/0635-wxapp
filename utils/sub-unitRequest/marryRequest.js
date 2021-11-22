let marryRequest = {
  marry_release: {
    apiMethod: 'GET',
    apiName: '/marry/marry_release',
    name: '新增社交信息'
  },
  marry_list: {
    apiMethod: 'GET',
    apiName: '/marry/marry_list',
    name: '社交列表'
  },
  marry_details: {
    apiMethod: 'GET',
    apiName: '/marry/marry_details',
    name: '社交详情'
  },
  is_marry_sign: {
    apiMethod: 'GET',
    apiName: '/marry/is_marry_sign',
    name: '是否报名参加社交'
  },
  marry_sign: {
    apiMethod: 'GET',
    apiName: '/marry/marry_sign',
    name: '报名参加社交'
  },
}

module.exports = marryRequest