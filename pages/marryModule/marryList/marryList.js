import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    tabActive: 0,
    totalCount: 0,
    page: 1,
    limit: 10,
    dropTitle1: '全部地区',
    address: '',
    dropTitle2: '全部分类',
    type: '',
    dropTitle3: '不限性别',
    gender: '',
    personList: []
  },

  onLoad: function (options) {
    this.marryList()
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  // 新增社交信息
  goAddPage: function () {
    wx.navigateTo({
      url: '/pages/releaseModule/releaseMarry/releaseMarry',
    })
  },

  dropTap1: function (e) {
    this.setData({
      isShow: false,
      personList: [],
      address: e.currentTarget.dataset.id,
      dropTitle1: e.currentTarget.dataset.title
    })
    this.selectComponent('#item1').toggle('false');
    this.marryList()
  },

  dropTap2: function (e) {
    this.setData({
      isShow: false,
      personList: [],
      type: e.currentTarget.dataset.id,
      dropTitle2: e.currentTarget.dataset.title
    })
    this.selectComponent('#item2').toggle(false);
    this.marryList()
  },

  dropTap3: function (e) {
    this.setData({
      isShow: false,
      personList: [],
      gender: e.currentTarget.dataset.id,
      dropTitle3: e.currentTarget.dataset.title
    })
    this.selectComponent('#item3').toggle(false);
    this.marryList()
  },

  // 获取人员列表
  marryList: function () {
    let data = {
      page: this.data.page,
      limit: this.data.limit,
      address: this.data.address,
      type: this.data.type,
      gender: this.data.gender,
      is_pass: '02'
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
      url: '/pages/marryModule/marryDetails/marryDetails?id=' + e.currentTarget.dataset.item.id,
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