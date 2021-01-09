// import esRequest from '../../../utils/esRequest';
// import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id_key: '',
    windowWidth: 0,
    windowHeight: 0,
  },

  onLoad: function (options) {
    this.data.id_key = wx.getStorageSync('id_key')
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
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
  }

})