let messageRequest = {
  message_list: {
    apiMethod: 'GET',
    apiName: '/message/message_list',
    name: '消息列表'
  },
  message_details: {
    apiMethod: 'GET',
    apiName: '/message/message_details',
    name: '消息详情'
  },
}
module.exports = messageRequest