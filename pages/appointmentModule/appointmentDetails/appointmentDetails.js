import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id_key: '',
    windowWidth: 0,
    windowHeight: 0,
    signUp: false,
    appointmentId: '',
    appointmentDetails: {},
  },

  onLoad: function (options) {
    this.data.id_key = wx.getStorageSync('id_key').toString()
    this.data.appointmentId = options.id ? options.id : ''
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.getAppointmentDetails()
  },

  // 线下活动详情
  getAppointmentDetails: function () {
    let data = {
      id: this.data.appointmentId
    }
    esRequest('appointment_details', data).then(res => {
      if (res && res.data.code === 0) {
        if (res.data.data.appointment_details != null) {
          res.data.data.appointment_details = res.data.data.appointment_details.toString().replace(/\<img/gi, '<img style="max-width:100%; height:auto"')
        }
        this.setData({
          appointmentDetails: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 查看微信
  sponsorWx: function () {
    if (this.data.signUp) {

    } else {
      Toast.fail('报名后查看')
    }
  },

  binSign: function () {
    console.log(this.data.id_key)
    console.log(this.data.appointmentDetails.id)
    wx.navigateTo({
      url: `/pages/components/signUp/signUp?receiver_id=${this.data.appointmentDetails.sponsor_id}&active_title=${this.data.appointmentDetails.appointment_title}`
    })
  },

  // xxx
  xxx: function (e) {
    console.log(e.currentTarget.dataset.xxx)
  }

})