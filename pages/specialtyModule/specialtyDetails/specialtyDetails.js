import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id: '',
    windowWidth: 0,
    windowHeight: 0,
    specialtyDetails: {}
  },

  onLoad: function (options) {
    this.data.id = options.id ? options.id : '1'
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.getSpecialtyDetails()
  },

  // 特产详情
  getSpecialtyDetails: function () {
    let data = {
      id: this.data.id
    }
    esRequest('specialty_details', data).then(res => {
      if (res && res.data.code === 0) {
        res.data.data.specialty_image = JSON.parse(res.data.data.specialty_image)
        this.setData({
          specialtyDetails: res.data.data,
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