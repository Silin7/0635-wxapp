import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    messageId: '',
    messageData: {},
    sysmessage_details: ''
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
    this.getSysmessageDetails()
  },

  // 系统消息详情
  getSysmessageDetails: function () {
    let data = {
      id: this.data.messageId
    }
    esRequest('sysmessage_details', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          messageData: res.data.data,
          sysmessage_details: res.data.data.message_details.toString().replace(/\<img/gi, '<img style="max-width:100%; height:auto"')
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  }
})