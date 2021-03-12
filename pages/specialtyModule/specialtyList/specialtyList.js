import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    cityActive: 0,
    cityList: [
      {"id":"","type_id":"","type_name":"全部"},
      {"id":1,"type_id":1001,"type_name":"东昌府区"},
      {"id":2,"type_id":1002,"type_name":"阳谷县"},
      {"id":3,"type_id":1003,"type_name":"莘县"},
      {"id":4,"type_id":1004,"type_name":"茌平区"},
      {"id":5,"type_id":1005,"type_name":"东阿县"},
      {"id":6,"type_id":1006,"type_name":"冠县"},
      {"id":7,"type_id":1007,"type_name":"高唐县"},
      {"id":8,"type_id":1008,"type_name":"临清市"}
    ],
    specialtyPage: 1,
    specialtyLimit: 10,
    totalCount: 0,
    specialtyPosition: '',
    specialtyList: []
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
    this.setData({
      specialtyList: []
    })
    this.getSpecialtyList()
  },

  // tabs 切换
  cityChange: function (e) {
    this.data.specialtyPage = 1
    this.data.specialtyList = []
    this.data.specialtyPosition = e.detail.title
    this.getSpecialtyList()
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