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
    console.log(options.cityId)
    this.data.cityId = options.cityId ? options.cityId : ''
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

  // 本地历史
  historicalEvolution: function () {
    let data = {
      city_id: this.data.cityId
    }
    esRequest('local_historical', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          cityDetails: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  }

})