import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id_key: '',
    windowWidth: 0,
    windowHeight: 0,
    tabActive: 0,
    totalCount: 0,
    page: 1,
    limit: 10,
    is_top: '01',
    marry: '',
    gender: '',
    friends: '',
    typeList: [
      { key: '推荐', value: '01' },
      { key: '相亲', value: '02' },
      { key: '恋爱', value: '03' },
      { key: '交友', value: '04' },
      { key: '女神', value: '05' },
      { key: '男神', value: '06' }
    ],
    personList: []
  },

  onLoad: function (options) {
    this.data.id_key = wx.getStorageSync('id_key').toString()
    this.marryList()
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },
  
  // 切换tabs
  tabChange(event) {
    if (event.detail.name === '01') {
      this.data.is_top = '01'
      this.data.marry = ''
      this.data.gender = ''
      this.data.friends = ''
    }
    if (event.detail.name === '02') {
      this.data.is_top = ''
      this.data.marry = '01'
      this.data.gender = ''
      this.data.friends = ''
    }
    if (event.detail.name === '03') {
      this.data.is_top = ''
      this.data.marry = '02'
      this.data.gender = ''
      this.data.friends = ''
    }
    if (event.detail.name === '04') {
      this.data.is_top = ''
      this.data.marry = ''
      this.data.gender = ''
      this.data.friends = '01'
    }
    if (event.detail.name === '05') {
      this.data.is_top = ''
      this.data.marry = ''
      this.data.gender = '02'
      this.data.friends = ''
    }
    if (event.detail.name === '06') {
      this.data.is_top = ''
      this.data.marry = ''
      this.data.gender = '01'
      this.data.friends = ''
    }
    this.setData({
      page: 1,
      limit: 10,
      totalCount: 0,
      personList: []
    })
    this.marryList()
  },

  // 获取人员列表
  marryList: function () {
    let data = {
      page: this.data.page,
      limit: this.data.limit,
      gender: this.data.gender,
      marry: this.data.marry,
      is_top: this.data.is_top,
      friends: this.data.friends
    }
    esRequest('marry_list', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          totalCount: res.data.totalCount,
          personList: this.data.personList.concat(res.data.data)
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 查看详情
  personDetails: function (e) {
    wx.navigateTo({
      url: '/pages/marryModule/marryDetails/marryDetails?register_id=' + e.currentTarget.dataset.item.id,
    })
  },

  // 触底函数
  onScrollBottom: function () {
    if (this.data.totalCount > this.data.personList.length) {
      this.data.page += 1
      this.marryList()
    }
  }
})