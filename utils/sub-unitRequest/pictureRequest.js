let pictureRequest = {
  wallportrait_series: {
    apiMethod: 'GET',
    apiName: '/picture/wallportrait_series',
    name: '头像系列（参数：type_id）'
  },
  wallportrait_list: {
    apiMethod: 'GET',
    apiName: '/picture/wallportrait_list',
    name: '头像列表（参数：series_id）'
  },
}
module.exports = pictureRequest