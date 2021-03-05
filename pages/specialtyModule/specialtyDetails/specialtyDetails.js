import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id: '',
    windowWidth: 0,
    windowHeight: 0,
    specialtyDetails: {},
    specialty_image: []
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
        this.setData({
          specialtyDetails: res.data.data,
          specialty_image: res.data.data.specialty_image.split('，')
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