let pictureRequest = {
  wallportrait_series: {
    apiMethod: 'GET',
    apiName: '/picture/wallportrait_series',
    name: '头像系列（参数：type_id, page, limit）'
  },
  wallportrait_list: {
    apiMethod: 'GET',
    apiName: '/picture/wallportrait_list',
    name: '头像列表（参数：series_id, page, limit）'
  },
  wallpaper_series: {
    apiMethod: 'GET',
    apiName: '/picture/wallpaper_series',
    name: '壁纸系列（参数：type_id, page, limit）'
  },
  wallpaper_list: {
    apiMethod: 'GET',
    apiName: '/picture/wallpaper_list',
    name: '壁纸列表（参数：series_id, page, limit）'
  },
  wallwriting_series: {
    apiMethod: 'GET',
    apiName: '/picture/wallwriting_series',
    name: '文案系列（参数：type_id, page, limit）'
  },
  wallwriting_list: {
    apiMethod: 'GET',
    apiName: '/picture/wallwriting_list',
    name: '文案列表（参数：series_id, page, limit）'
  },
}
module.exports = pictureRequest