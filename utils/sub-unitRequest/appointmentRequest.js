let appointmentRequest = {
  appointment_list: {
    apiMethod: 'GET',
    apiName: '/appointment/appointment_list',
    name: '线下活动列表（参数: page, limit, sponsor_gender, appointment_type, area_type）'
  },
  appointment_details: {
    apiMethod: 'GET',
    apiName: '/appointment/appointment_details',
    name: '线下活动详情（参数: id）'
  },
  appointment_issign: {
    apiMethod: 'GET',
    apiName: '/appointment/appointment_issign',
    name: '是否报名参加活动（参数: active_id, followers_id）'
  },
  appointment_sign: {
    apiMethod: 'GET',
    apiName: '/appointment/appointment_sign',
    name: '报名参加活动（参数: active_id, followers_id）'
  },
}
module.exports = appointmentRequest