import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    newsId: '',
    newsDetails: {},
    newsContent: ''
  },

  onLoad: function (options) {
    this.data.newsId = options.newsId ? options.newsId : ''
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
      newsId: this.data.newsId
    }
    esRequest('news_details', data).then(res => {
      if (res && res.data.code == 1) {
        _this.data.newsDetails = res.data.data
        _this.data.newsContent = res.data.data.content
        if (res.data.data.images.length > 0) {
          res.data.data.images.forEach(item => {
            let str1 = item.position
            let str2 = `<img style="max-width:100%; height:auto; margin: 5px 0;" src="${item.imgSrc}"/>`
            _this.data.newsContent = _this.data.newsContent.toString().replace(str1, str2)
          }) 
        }
        _this.setData({
          newsDetails: res.data.data,
          newsContent: _this.data.newsContent
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  }

})