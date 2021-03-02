import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id_key: '',
    windowWidth: 0,
    windowHeight: 0,
    appointmentId: '',
    appointmentDetails: {}
  },

  onLoad: function (options) {
    // this.data.id_key = wx.getStorageSync('id_key').toString()
    this.data.appointmentId = options.id ? options.id : '1'
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
        this.setData({
          appointmentDetails: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // xxx
  xxx: function (e) {
    console.log(e.currentTarget.dataset.xxx)
  }

})