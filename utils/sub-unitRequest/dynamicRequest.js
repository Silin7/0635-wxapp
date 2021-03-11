let dynamicRequest = {
  dynamic_release_img: {
    apiMethod: 'POST',
    apiName: '/dynamic/dynamic_release_img',
    name: '发动态-图片（参数: author_id, author_name, author_avatar_url, content, image）'
  },
  dynamic_release_txt: {
    apiMethod: 'POST',
    apiName: '/dynamic/dynamic_release_txt',
    name: '发动态-文字（参数: author_id, author_name, author_avatar_url, content）'
  },
  dynamic_list: {
    apiMethod: 'GET',
    apiName: '/dynamic/dynamic_list',
    name: '动态列表（参数: page, limit, is_pass）'
  },
  dynamic_details: {
    apiMethod: 'GET',
    apiName: '/dynamic/dynamic_details',
    name: '动态详情（参数: id）'
  },
  cancel_dynamic: {
    apiMethod: 'GET',
    apiName: '/dynamic/cancel_dynamic',
    name: '动态详情（参数: id, author_id）'
  },
  write_comment: {
    apiMethod: 'POST',
    apiName: '/dynamic/write_comment',
    name: '动态列表（参数: dynamic_id, comment_content, reviewer_id, reviewer_name, reviewer_image）'
  },
  comment_list: {
    apiMethod: 'GET',
    apiName: '/dynamic/comment_list',
    name: '动态详情（参数: page, limit, dynamic_id）'
  },
}
module.exports = dynamicRequest