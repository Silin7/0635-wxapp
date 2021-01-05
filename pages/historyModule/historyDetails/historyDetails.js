import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    cityId: '',
    cityDetails: {}
  },

  onLoad: function (options) {
    this.data.cityId = options.cityId ? options.cityId : '1001'
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.historicalEvolution()
  },

  // xxx
  historicalEvolution: function () {
    let data = {
      id: this.data.cityId
    }
    esRequest('historical_evolution', data).then(res => {
      if (res && res.data.code == 0) {
        this.setData({
          cityDetails: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  }

})