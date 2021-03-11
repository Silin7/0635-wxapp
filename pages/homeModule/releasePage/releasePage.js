import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    loginShow: '',
    windowWidth: 0,
    windowHeight: 0,
  },

  onLoad: function (options) {
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    if (!wx.getStorageSync('id_key')) {
      this.setData({
        loginShow: true
      })
    }
  },

  // xxx
  xxx: function () {
    let data = {
    }
    esRequest('xxx', data).then(res => {
      if (res && res.data.code === 0) {
        console.log(res)
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 发动态
  releaseDynamic: function () {
    wx.navigateTo({
      url: '/pages/releaseModule/releaseDynamic/releaseDynamic',
    })
  }

})