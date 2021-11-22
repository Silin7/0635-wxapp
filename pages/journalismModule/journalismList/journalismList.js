import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    scenicActive: 0,
    cityList: [
      { 'type_id': '', 'type_name': '全部' },
      { 'type_id': '1001', 'type_name': '东昌府区' },
      { 'type_id': '1002', 'type_name': '阳谷县' },
      { 'type_id': '1003', 'type_name': '莘县' },
      { 'type_id': '1004', 'type_name': '茌平区' },
      { 'type_id': '1005', 'type_name': '东阿县' },
      { 'type_id': '1006', 'type_name': '冠县' },
      { 'type_id': '1007', 'type_name': '高唐县' },
      { 'type_id': '1008', 'type_name': '临清市' }
    ],
    page: 1,
    limit: 10,
    totalCount: 0,
    journalism_area: '',
    journalismList: [],
  },

  onLoad: function () {
    this.getJournalismList()
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  // 切换Tabs
  scenicChange: function (event) {
    this.data.page = 1
    this.data.journalismList = []
    if (event.detail.name == 0) {
      this.data.journalism_area = ''
    } else {
      this.data.journalism_area = event.detail.name
    }
    this.getJournalismList()
  },

  // 新闻列表
  getJournalismList: function () {
    let data = {
      page: this.data.page,
      limit: this.data.limit,
      journalism_area: this.data.journalism_area,
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
      url: '/pages/journalismModule/journalismDetails/journalismDetails?id=' + e.currentTarget.dataset.item.id
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