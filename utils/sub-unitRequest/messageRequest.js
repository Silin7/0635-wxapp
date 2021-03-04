let messageRequest = {
  permessage_list: {
    apiMethod: 'GET',
    apiName: '/message/permessage_list',
    name: '消息列表（参数：receiver_id）'
  },
  permessage_details: {
    apiMethod: 'GET',
    apiName: '/message/permessage_details',
    name: '消息详情（参数：id）'
  },
  permessage_send: {
    apiMethod: 'POST',
    apiName: '/message/permessage_send',
    name: '消息详情（参数：receiver_id, sender_id, sender_name, sender_img, message_title, message_content）'
  },
  permessage_active: {
    apiMethod: 'POST',
    apiName: '/message/permessage_active',
    name: '消息详情（参数：receiver_id, sender_id, sender_name, sender_img, message_title, message_content）'
  },
  permessage_delete: {
    apiMethod: 'GET',
    apiName: '/message/permessage_delete',
    name: '消息详情（参数：id）'
  },
  sysmessage_list: {
    apiMethod: 'GET',
    apiName: '/message/sysmessage_list',
    name: '消息列表'
  },
  sysmessage_details: {
    apiMethod: 'GET',
    apiName: '/message/sysmessage_details',
    name: '消息详情'
  },
}
module.exports = messageRequest