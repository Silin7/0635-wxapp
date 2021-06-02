import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id: '',
    windowWidth: 0,
    windowHeight: 0,
    workDetails: {}
  },

  onLoad: function (options) {
    this.data.id = options.id ? options.id : ''
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.getWorkDetails()
  },

  // 工作详情
  getWorkDetails: function () {
    let data = {
      id: this.data.id
    }
    esRequest('location_work_details', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          workDetails: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // xxx
  xxx: function (e) {
    console.log(e.currentTarget.dataset.xxx)
  },

  btnDH: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.workDetails.basic_phone
    }).catch((e) => {
      Toast.fail('取消')
    })
  }

})