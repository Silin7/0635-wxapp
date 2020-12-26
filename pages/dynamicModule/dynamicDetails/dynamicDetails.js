import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    messageId: '',
    authorData: {},
    dynamic_details: ''
  },
  onLoad: function (options) {
    this.data.messageId = options.id ? options.id : ''
  },
  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },
  onShow: function () {
    this.getPermessageDetails()
  },
  // 个人私信详情
  getPermessageDetails: function () {
    let data = {
      id: this.data.messageId
    }
    esRequest('dynamic_details', data).then(res => {
      if (res && res.data.code == 0) {
        this.setData({
          authorData: res.data.data,
          dynamic_details: res.data.data.content.toString().replace(/\<img/gi, '<img style="max-width:100%; height:auto"')
        })

      } else {
        Toast.fail('系统错误')
      }
    })
  }
})