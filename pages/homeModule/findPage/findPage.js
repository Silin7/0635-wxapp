import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id_key: '',
    windowWidth: 0,
    windowHeight: 0,
    sidebarKey: 0,
    newsTypeList: [],
    typeId: '',
    newsPage: 1,
    newsList: [],
  },

  onLoad: function (options) {
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.awaitNews()
  },

  async awaitNews () {
    await this.getNewsType()
    this.data.typeId = this.data.newsTypeList[0].type_id
    this.getNewsList()
  },

  // change sidebar
  sidebarChange: function (event) {
    this.setData({
      typeId: this.data.newsTypeList[event.detail].type_id,
      newsPage: 1,
      newsList: [],
    })
    this.getNewsList()
  },

  // 新闻类型列表
  getNewsType: function () {
    return new Promise (async (resolve, reject) => {
      esRequest('admin_news_type').then(res => {
        if (res && res.data.code === 0) {
          this.setData({
            newsTypeList: res.data.data
          })
        } else {
          Toast.fail('系统错误')
        }
        resolve()
      })
    })
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