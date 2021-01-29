import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id: '',
    type: '',
    windowWidth: 0,
    windowHeight: 0,
    contentDetails: ''
  },

  onLoad: function (options) {
    this.data.id = options.id ? options.id : ''
    this.data.type = options.type ? options.type : '1'
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    if (this.data.type === '1') {
      this.advertisementDetails()
    }
    if (this.data.type === '2') {
      this.getSysmessageDetails()
    }
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
          contentDetails: res.data.data.content
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 系统消息详情
  getSysmessageDetails: function () {
    let data = {
      id: this.data.id
    }
    esRequest('sysmessage_details', data).then(res => {
      if (res && res.data.code === 0) {
        res.data.data.message_details = res.data.data.message_details.toString().replace(/\<img/gi, '<img style="max-width:100%; height:auto"')
        this.setData({
          contentDetails: res.data.data.message_details
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  }
})