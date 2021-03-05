import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    loginShow: false,
    windowWidth: 0,
    windowHeight: 0,
    signUp: false,
    appointmentId: '',
    appointmentDetails: {},
  },

  onLoad: function (options) {
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
    if (!wx.getStorageSync('id_key')) {
      this.setData({
        loginShow: true
      })
    } else {
      let _this = this
      let data = {
        active_id: this.data.appointmentDetails.id,
        followers_id: wx.getStorageSync('id_key').toString()
      }
      esRequest('appointment_issign', data).then(res => {
        if (res && res.data.code === 0) {
          if (res.data.type === '0') {
            Toast.fail('报名后查看')
          }
          if (res.data.type === '1') {
            _this.setData({
              signUp: true
            })
          }
        } else {
          Toast.fail('系统错误')
        }
      })
    }
  },

  // 活动报名
  binSign: function () {
    if (!wx.getStorageSync('id_key')) {
      this.setData({
        loginShow: true
      })
    } else {
      let data = {
        active_id: this.data.appointmentDetails.id,
        followers_id: wx.getStorageSync('id_key').toString()
      }
      esRequest('appointment_issign', data).then(res => {
        if (res && res.data.code === 0) {
          if (res.data.type === '0') {
            wx.navigateTo({
              url: `/pages/appointmentModule/activityRegistration/activityRegistration?receiver_id=${this.data.appointmentDetails.sponsor_id}&active_id=${this.data.appointmentDetails.id}&active_title=${this.data.appointmentDetails.appointment_title}`
            })
          }
          if (res.data.type === '1') {
            Toast.success('您已经报名')
          }
        } else {
          Toast.fail('系统错误')
        }
      })
    }
  },

  // 未登录跳转倒登录界面
  dialogButtontap() {
    wx.redirectTo({
      url: '/pages/loginModule/loginPage/loginPage',
    })
  }

})