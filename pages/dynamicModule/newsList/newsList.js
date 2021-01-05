import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    typeId: '',
    newsList: [],
    newsPage: 1,
    newsNext: true,
  },

  onLoad: function (options) {
    this.data.typeId = options.typeId ? options.typeId : ''
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.getNewsList()
  },

  // 新闻列表
  getNewsList: function () {
    let data = {
      typeId: this.data.typeId,
      page: this.data.newsPage
    }
    esRequest('news_list', data).then(res => {
      if (res && res.data.code == 1) {
        this.setData({
          newsList: this.data.newsList.concat(res.data.data)
        })
      } else {
        this.data.newsNext = false
      }
    })
  },

  // 新闻触底函数
  onScrollBottom: function () {
    if (this.data.newsNext) {
      this.data.newsPage += 1
      this.getNewsList()
    }
  },

  // 新闻详情
  getNewsDetalis: function (e) {
    wx.navigateTo({
      url: '/pages/dynamicModule/newsDetails/newsDetails?newsId=' + e.currentTarget.dataset.item.newsId
    })
  }
})