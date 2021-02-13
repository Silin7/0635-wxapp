import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id_key: '',
    windowWidth: 0,
    windowHeight: 0,
    cityActive: 0,
    cityList: [],
    specialtyPage: 1,
    specialtyLimit: 10,
    totalCount: 0,
    specialtyPosition: '',
    specialtyList: []
  },

  onLoad: function (options) {
    this.data.id_key = wx.getStorageSync('id_key').toString()
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.setData({
      specialtyList: []
    })
    this.getCityList()
    this.getSpecialtyList()
  },

  // tabs 切换
  cityChange: function (e) {
    this.data.specialtyPage = 1
    this.data.specialtyList = []
    this.data.specialtyPosition = e.detail.title
    this.getSpecialtyList()
  },

  // 县市列表
  getCityList: function () {
    esRequest('classification_city').then(res => {
      if (res && res.data.code === 0) {
        this.data.cityList = res.data.data
        this.data.cityList.unshift({ id: '', type_id: '', type_name: '全部' })
        this.setData({
          cityList: this.data.cityList
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 特产列表
  getSpecialtyList: function () {
    if (this.data.specialtyPosition === '全部') {
      this.data.specialtyPosition = ''
    }
    let data = {
      page: this.data.specialtyPage,
      limit: this.data.specialtyLimit,
      specialty_position: this.data.specialtyPosition
    }
    esRequest('specialty_list', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          totalCount: res.data.totalCount,
          specialtyList: this.data.specialtyList.concat(res.data.data)
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 触底函数
  onScrollBottom: function () {
    if (this.data.totalCount > this.data.specialtyList.length) {
      this.data.specialtyPage += 1
      this.getSpecialtyList()
    }
  },
  
  // 特产详情
  specialtyDetails: function (e) {
    wx.navigateTo({
      url: '/pages/specialtyModule/specialtyDetails/specialtyDetails?id=' + e.currentTarget.dataset.item.id,
    })
  }
})