import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id: '',
    windowWidth: 0,
    windowHeight: 0,
    advertisementDetails: {}
  },

  onLoad: function (options) {
    this.data.id = options.id ? options.id : ''
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.advertisementDetails()
  },

  // 广告详情
  advertisementDetails: function () {
    let data = {
      id: this.data.id
    }
    esRequest('advertisement_details', data).then(res => {
      if (res && res.data.code === 0) {
        res.data.data.content = res.data.data.content.toString().replace(/\<img/gi, '<img style="max-width:100%; height:auto"')
        this.setData({
          advertisementDetails: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  }
})