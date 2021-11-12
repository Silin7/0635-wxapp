import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    scenicActive: 0,
    cityList: [
      { 'id': '', 'type_id': '', 'type_name': '全部' },
      { 'id': 1, 'type_id':1001, 'type_name': '东昌府区' },
      { 'id': 2, 'type_id':1002, 'type_name': '阳谷县' },
      { 'id': 3, 'type_id':1003, 'type_name': '莘县' },
      { 'id': 4, 'type_id':1004, 'type_name': '茌平区' },
      { 'id': 5, 'type_id':1005, 'type_name': '东阿县' },
      { 'id': 6, 'type_id':1006, 'type_name': '冠县' },
      { 'id': 7, 'type_id':1007, 'type_name': '高唐县' },
      { 'id': 8, 'type_id':1008, 'type_name': '临清市' }
    ],
    page: 1,
    limit: 10,
    totalCount: 0,
    journalism_area: '',
    journalism_type: '',
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
    // this.getJournalismList()
  },

  // 新闻列表
  getJournalismList: function () {
    let data = {
      page: this.data.page,
      limit: this.data.limit,
      // journalism_area: '',
      // journalism_type: '',
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
  gotopicDetails: function (e) {
    wx.navigateTo({
      url: '/pages/topicModule/topicDetails/topicDetails?id=' + e.currentTarget.dataset.item.id
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