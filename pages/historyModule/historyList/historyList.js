import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    historyList: []
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
    this.historyList()
  },

  // 历史列表
  historyList: function () {
    esRequest('admin_city_type').then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          historyList: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 历史详情
  historyDetails: function (e) {
    wx.navigateTo({
      url: '/pages/historyModule/historyDetails/historyDetails?cityId=' + e.currentTarget.dataset.id
    })
  }
})