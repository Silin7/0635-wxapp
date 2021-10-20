import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    journalism_area: '',
    areaTitle: '全部地区',
    journalism_type: '',
    typeTitle: '全部分类',
    page: 1,
    limit: 10,
    totalCount: 0,
    journalismList: [],
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
    this.getJournalismList()
  },

  areaTap: function (e) {
    this.setData({
      page: 1,
      limit: 10,
      totalCount: 0,
      journalismList: [],
      journalism_area: e.currentTarget.dataset.id,
      areaTitle: e.currentTarget.dataset.title
    })
    this.selectComponent('#item1').toggle('false');
    this.getJournalismList()
  },

  typeTap: function (e) {
    this.setData({
      page: 1,
      limit: 10,
      totalCount: 0,
      journalismList: [],
      journalism_type: e.currentTarget.dataset.id,
      typeTitle: e.currentTarget.dataset.title
    })
    this.selectComponent('#item2').toggle(false);
    this.getJournalismList()
  },

  // 新闻列表
  getJournalismList: function () {
    let data = {
      page: this.data.page,
      limit: this.data.limit,
      journalism_area: this.data.journalism_area,
      journalism_type: this.data.journalism_type,
      is_pass: '02'
    }
    esRequest('journalism_list', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          totalCount: res.data.totalCount,
          journalismList: this.data.journalismList.concat(res.data.data)
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },
  
  // 新闻详情
  gojournalismDetails: function (e) {
    wx.navigateTo({
      url: '/pages/topicModule/journalismDetails/journalismDetails?id=' + e.currentTarget.dataset.item.id
    })
  },

  // 触底函数
  onScrollBottom: function () {
    if (this.data.totalCount > this.data.journalismList.length) {
      this.data.page += 1
      this.getJournalismList()
    }
  }
})