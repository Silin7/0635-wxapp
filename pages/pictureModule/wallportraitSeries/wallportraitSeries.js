import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    type_id: '1007'
  },

  onLoad: function (options) {
    if (options.id) {
      this.data.type_id = options.id
    }
    if (options.name) {
      wx.setNavigationBarTitle({
        title: options.name
      })
    }
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.wallportraitSeries()
  },

  // xxx
  wallportraitSeries: function () {
    let data = {
      type_id: this.data.type_id
    }
    esRequest('wallportrait_series', data).then(res => {
      if (res && res.data.code === 0) {
        console.log(res)
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