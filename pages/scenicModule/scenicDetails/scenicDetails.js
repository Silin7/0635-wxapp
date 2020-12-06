import esRequest from '../../../utils/esRequest'
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    scenicId: '',
    scenicDetails: {},
  },
  onLoad: function (options) {
    this.data.scenicId = options.id ? options.id : ''
  },
  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },
  onShow: function () {
    this.getScenicSpot()
  },
  // 景点详情
  getScenicSpot: function () {
    let data = {
      id: this.data.scenicId
    }
    esRequest('scenicspot_info', data).then(res => {
      if (res && res.data.code == 0) {
        this.setData({
          scenicDetails: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  }
})