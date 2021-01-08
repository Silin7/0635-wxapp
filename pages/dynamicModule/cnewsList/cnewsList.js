import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    typeId: '',
    newsList: [],
  },

  onLoad: function (options) {
    this.data.typeId = options.typeId ? options.typeId : ''
    if (options.typeName) {
      wx.setNavigationBarTitle({
        title: `${options.typeName}新闻`
      })
    }
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
      type_id: this.data.typeId,
    }
    esRequest('dynamic_news_list', data).then(res => {
      if (res && res.data.code == 0) {
        this.setData({
          newsList: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 新闻详情
  getNewsDetalis: function (e) {
    wx.navigateTo({
      url: '/pages/dynamicModule/newsDetails/newsDetails?newsId=' + e.currentTarget.dataset.item.id
    })
  }
})