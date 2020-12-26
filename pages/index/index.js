// import esRequest from '../../../utils/esRequest';
// import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
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
  },

  // xxx
  xxx: function () {
    let data = {
    }
    esRequest('xxx', data).then(res => {
      if (res && res.data.state === 'success') {
        console.log(res)
      } else {
        Toast.fail('系统错误')
      }
    })
  }

})