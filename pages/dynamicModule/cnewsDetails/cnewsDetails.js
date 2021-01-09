import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    id: '',
    newsDetails: {}
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
    this.newsDetails()
  },

  // 新闻详情
  newsDetails: function () {
    let _this = this
    let data = {
      id: this.data.id
    }
    esRequest('dynamic_news_details', data).then(res => {
      if (res && res.data.code === 0) {
        this.data.newsDetails = res.data.data
        this.data.newsDetails.news_content = this.data.newsDetails.news_content.toString().replace(/\<img/gi, '<img style="max-width:100%; height:auto"')
        this.setData({
          newsDetails: this.data.newsDetails
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  }

})