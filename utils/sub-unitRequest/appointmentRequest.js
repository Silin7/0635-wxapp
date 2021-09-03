let appointmentRequest = {
  appointment_release_img: {
    apiMethod: 'POST',
    apiName: '/appointment/appointment_release_img',
    name: '发起活动-图片'
  },
  appointment_release_txt: {
    apiMethod: 'POST',
    apiName: '/appointment/appointment_release_txt',
    name: '发起活动-文字'
  },
  appointment_list: {
    apiMethod: 'GET',
    apiName: '/appointment/appointment_list',
    name: '线下活动列表'
  },
  appointment_details: {
    apiMethod: 'GET',
    apiName: '/appointment/appointment_details',
    name: '线下活动详情'
  },
  appointment_issign: {
    apiMethod: 'GET',
    apiName: '/appointment/appointment_issign',
    name: '是否报名参加活动'
  },
  appointment_sign: {
    apiMethod: 'GET',
    apiName: '/appointment/appointment_sign',
    name: '报名参加活动'
  },
}

module.exports = appointmentRequest