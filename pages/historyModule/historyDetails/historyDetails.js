import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    cityId: '',
    historyImgs: [],
    cityDetails: {}
  },

  onLoad: function (options) {
    this.data.cityId = options.cityId ? options.cityId : ''
  },

  onReady: function () {
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
          historyImgs: res.data.data.city_images.split('，'),
          cityDetails: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  }

})