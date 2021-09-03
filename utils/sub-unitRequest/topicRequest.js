let topicRequest = {
  topic_class: {
    apiMethod: 'GET',
    apiName: '/topic/topic_class',
    name: '话题分类列表'
  },
  topic_class_details: {
    apiMethod: 'GET',
    apiName: '/topic/topic_class_details',
    name: '话题分类详情'
  },
  topic_list: {
    apiMethod: 'GET',
    apiName: '/topic/topic_list',
    name: '话题列表'
  },
  topic_list_details: {
    apiMethod: 'GET',
    apiName: '/topic/topic_list_details',
    name: '话题详情'
  },
}

module.exports = topicRequest