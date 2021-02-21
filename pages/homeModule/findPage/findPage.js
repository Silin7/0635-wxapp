import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id_key: '',
    windowWidth: 0,
    windowHeight: 0,
    tabActive: 0,
    dynamicPage: 1,
    dynamicLimit: 10,
    totalCount: 0,
    dynamicList: [],
    sidebarKey: 0,
    newsTypeList: [],
    newsNext: true,
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
    // 切换底部tabs清空
    this.setData({
      dynamicList: [],
      newsList: [],
    })
    this.getDynamicList()
    this.awaitNews()
  },

  async awaitNews () {
    await this.getNewsType()
    this.data.typeId = this.data.newsTypeList[0].type_id
    this.getNewsList()
  },

  // tabs切换
  tabChange: function (event) {
    this.setData({
      tabActive: event.detail.name
    })
    if (event.detail.name === 0) {
      this.setData({
        dynamicPage: 1,
        totalCount: 0,
        dynamicList: [],
      })
      this.getDynamicList()
    }
  },

  // sidebar切换
  sidebarChange: function (event) {
    this.setData({
      typeId: this.data.newsTypeList[event.detail].type_id,
      newsPage: 1,
      newsList: [],
    })
    this.getNewsList()
  },
  
  // 同城动态列表
  getDynamicList: function () {
    let data = {
      page: this.data.dynamicPage,
      limit: this.data.dynamicLimit
    }
    esRequest('dynamic_list', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          totalCount: res.data.totalCount,
          dynamicList: this.data.dynamicList.concat(res.data.data)
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 查看大图或保存图片
  dynamicImg: function (e) {
    let current = e.currentTarget.dataset.item.image
    let urls = [e.currentTarget.dataset.item.image]
    wx.previewImage({
      // 当前显示图片的http链接
      current: current,
      // 需要预览的图片http链接列表
      urls: urls
    })
  },

  // 同城动态函数
  onScrollBottom1: function () {
    if (this.data.totalCount > this.data.dynamicList.length) {
      this.data.dynamicPage += 1
      this.getDynamicList()
    }
  },

  // 同城动态详情
  getDynamicDetalis: function (e) {
    // 01：相亲
    if (e.currentTarget.dataset.item.type_id === '01') {
      wx.navigateTo({
        url: '/pages/marryModule/bindDetails/bindDetails?user_id=' + e.currentTarget.dataset.item.author_id
      })
    }
    // 02：新闻
    if (e.currentTarget.dataset.item.type_id === '02') {
      wx.navigateTo({
        url: '/pages/dynamicModule/advertisement/advertisement?id=' + e.currentTarget.dataset.item.advertisement_id + '&type=1'
      })
    }
    // 03：普通
  },

  // 新闻类型列表
  getNewsType: function () {
    return new Promise (async (resolve, reject) => {
      esRequest('classification_news').then(res => {
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
  onScrollBottom2: function () {
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