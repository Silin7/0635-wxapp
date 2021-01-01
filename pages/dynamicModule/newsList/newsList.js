import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    findtype: 0,
    typeId: '',
    typeList: [
      { "typeId": "521", "typeName": "头条" },
      { "typeId": "515", "typeName": "游戏" },
      { "typeId": "520", "typeName": "娱乐" },
      { "typeId": "510", "typeName": "科技" },
      { "typeId": "511", "typeName": "军事" },
      { "typeId": "509", "typeName": "财经" },
      { "typeId": "519", "typeName": "体育" },
      { "typeId": "513", "typeName": "NBA" },
      { "typeId": "516", "typeName": "健康" },
      { "typeId": "514", "typeName": "股票" },
    ],
    newsList: [],
    newsPage: 1,
    newsNext: true,
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
    this.findChange()
  },

  // 切换tabs类型
  findChange: function (e) {
    let index = e ? e.detail.index : 0
    this.setData({
      findtype: index,
      newsPage: 1,
      newsList: [],
      newsNext: true,
      typeId: this.data.typeList[index].typeId
    })
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