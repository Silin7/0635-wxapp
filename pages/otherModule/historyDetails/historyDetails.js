import esRequest from '../../../utils/esRequest'
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    index: '',
    historyData: {}
  },

  onLoad: function (options) {
    this.data.index = options.index ? Number(options.index) : 0
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.historyToday()
  },

  // 历史上的今天
  historyToday: function () {
    let data = {
      type: '1'
    }
    esRequest('history_today', data).then(res => {
      if (res && res.data.code == 1) {
        this.setData({
          historyData: res.data.data[this.data.index]
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },
})