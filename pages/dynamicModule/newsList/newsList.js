import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id_key: '',
    windowWidth: 0,
    windowHeight: 0,
    newsType: '01',
    typeTitle: '全部地区',
    newsArea: '',
    classTitle: '全部分类',
    newsClass: '',
    newsPage: 1,
    newslimit: 10,
    totalCount: 0,
    newsList: [],
  },

  onLoad: function (options) {
    this.getNewsList()
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  newsTap: function (e) {
    this.setData({
      newsType: '01',
      newsList: [],
      typeTitle: e.currentTarget.dataset.title,
      newsArea: e.currentTarget.dataset.id,
      classTitle: '全部分类',
      newsClass: '',
    })
    this.selectComponent('#typeItem').toggle('false');
    this.getNewsList()
  },

  classTap: function (e) {
    this.setData({
      newsType: '02',
      newsList: [],
      classTitle: e.currentTarget.dataset.title,
      newsClass: e.currentTarget.dataset.id,
      typeTitle: '全部地区',
      newsArea: '',
    })
    this.selectComponent('#classItem').toggle(false);
    this.getNewsList()
  },

  // 新闻列表
  getNewsList: function () {
    let data = {
      page: this.data.newsPage,
      limit: this.data.newslimit,
      type: this.data.newsType,
      area: this.data.newsArea,
      class: this.data.newsClass
    }
    esRequest('journalism_list', data).then(res => {
      if (res && res.data.code == 0) {
        this.setData({
          totalCount: res.data.totalCount,
          newsList: this.data.newsList.concat(res.data.data)
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 新闻触底函数
  onScrollBottom: function () {
    if (this.data.totalCount > this.data.newsList.length) {
      this.data.newsPage += 1
      this.getNewsList()
    }
  },

  // 新闻详情
  getNewsDetalis: function (e) {
    // wx.navigateTo({
    //   url: '/pages/dynamicModule/newsDetails/newsDetails?newsId=' + e.currentTarget.dataset.item.newsId
    // })
  }
})