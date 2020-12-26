import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    dataList: []
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
    this.historyToday()
  },

  // 历史上的今天
  historyToday: function () {
    let data = {
      type: '0'
    }
    esRequest('history_today', data).then(res => {
      if (res && res.data.code == 1) {
        this.setData({
          dataList: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 查看详情
  dataDetails: function (e) {
    wx.navigateTo({
      url: '/pages/otherModule/historyDetails/historyDetails?index=' + e.currentTarget.dataset.index
    })
  }
})