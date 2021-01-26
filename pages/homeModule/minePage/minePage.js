import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id_key: '',
    windowWidth: 0,
    windowHeight: 0,
    follow: 0,
    collection: 0,
    mineDataForm: {},
    scenicspotList: []
  },

  onLoad: function (options) {
    this.setData({
      id_key: wx.getStorageSync('id_key').toString()
    })
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.concernsList()
    this.getMineInfo()
    this.mineScenicspotList()
  },

  // 获取个人信息
  getMineInfo: function () {
    let data = {
      id: this.data.id_key
    }
    esRequest('mine_info', data).then (res => {
      if (res && res.data.code === 0) {
        this.setData({
          mineDataForm: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 足迹列表
  mineScenicspotList: function () {
    let data = {
      followers_id: this.data.id_key
    }
    esRequest('mine_scenicspot_list', data).then (res => {
      if (res && res.data.code === 0) {
        this.setData({
          scenicspotList: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 足迹详情
  scenicspotDetails: function (e) {
    wx.navigateTo({
      url: '/pages/scenicModule/scenicDetails/scenicDetails?id=' + e.currentTarget.dataset.id
    })
  },

  // 足迹更多
  tracksMore: function () {
    wx.navigateTo({
      url: '/pages/scenicModule/mineScenic/mineScenic'
    })
  },

  // 我关注的人（number）
  concernsList: function () {
    let data = {
      followers_id: this.data.id_key
    }
    esRequest('concerns_list', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          follow: res.data.data.length
        })
      }
    })
  },

  // 跳转到我的关注
  myConcerns: function () {
    wx.navigateTo({
      url: '/pages/mineModule/myConcerns/myConcerns',
    })
  },
  
  // 编辑个人资料
  personalData: function () {
    let id = this.data.id_key.toString()
    id = id.substr(1)
    wx.navigateTo({
      url: '/pages/mineModule/personalData/personalData?id=' + id,
    })
  }
})