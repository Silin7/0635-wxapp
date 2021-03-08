import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    newsId: '',
    newsDetails: {}
  },

  onLoad: function (options) {
    this.data.newsId = options.newsId ? options.newsId : ''
    this.newsDetails()
  },

  // 新闻详情
  newsDetails: function () {
    let data = {
      id: this.data.newsId
    }
    esRequest('journalism_details', data).then(res => {
      if (res && res.data.code == 0) {
        if (res.data.data.journalism_info != null) {
          res.data.data.journalism_info = res.data.data.journalism_info.toString().replace(/\<img/gi, '<img style="max-width:100%; height:auto"')
        }
        this.setData({
          newsDetails: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  }

})