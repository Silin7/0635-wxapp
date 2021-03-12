let dynamicRequest = {
  dynamic_release_img: {
    apiMethod: 'POST',
    apiName: '/dynamic/dynamic_release_img',
    name: '发动态-图片'
  },
  dynamic_release_txt: {
    apiMethod: 'POST',
    apiName: '/dynamic/dynamic_release_txt',
    name: '发动态-文字'
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
  cancel_dynamic: {
    apiMethod: 'GET',
    apiName: '/dynamic/cancel_dynamic',
    name: '动态详情'
  },
  write_comment: {
    apiMethod: 'POST',
    apiName: '/dynamic/write_comment',
    name: '动态列表'
  },
  comment_list: {
    apiMethod: 'GET',
    apiName: '/dynamic/comment_list',
    name: '动态详情'
  },
}
module.exports = dynamicRequest