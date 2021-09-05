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
  author_info: {
    apiMethod: 'GET',
    apiName: '/dynamic/author_info',
    name: '作者基本信息'
  },
  author_dynamic_list: {
    apiMethod: 'GET',
    apiName: '/dynamic/author_dynamic_list',
    name: '作者基本作者动态列表信息'
  },
  dynamic_details: {
    apiMethod: 'GET',
    apiName: '/dynamic/dynamic_details',
    name: '动态详情'
  },
  cancel_dynamic: {
    apiMethod: 'GET',
    apiName: '/dynamic/cancel_dynamic',
    name: '删除动态'
  },
  write_comment: {
    apiMethod: 'POST',
    apiName: '/dynamic/write_comment',
    name: '写评论'
  },
  comment_list: {
    apiMethod: 'GET',
    apiName: '/dynamic/comment_list',
    name: '动态评论的列表'
  },
}

module.exports = dynamicRequest