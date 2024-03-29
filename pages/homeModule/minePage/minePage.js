import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id_key: '',
    loginShow: false,
    windowWidth: 0,
    windowHeight: 0,
    follow: 0,
    collection: 0,
    mineDataForm: {},
    scenicspotLen: 4,
    imgFlage01: true,
    imgFlage02: true,
    imgFlage03: true,
    imgFlage04: true,
    scenicspotList: []
  },

  onLoad: function (options) {
    if (wx.getStorageSync('id_key')) {
      this.setData({
        id_key: wx.getStorageSync('id_key').toString()
      })
      this.concernsList()
      this.collectionList()
      this.getMineInfo()
      this.mineScenicspotList()
    }
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    if (!wx.getStorageSync('id_key')) {
      this.setData({
        loginShow: true
      })
    }
    if (wx.getStorageSync('tp_key')) {
      if (wx.getStorageSync('tp_key') === '02') {
        this.getMineInfo()
      }
      if (wx.getStorageSync('tp_key') === '03') {
        this.mineScenicspotList()
      }
      if (wx.getStorageSync('tp_key') === '04') {
        this.concernsList()
      }
      if (wx.getStorageSync('tp_key') === '05') {
        this.collectionList()
      }
      wx.setStorageSync('tp_key', '01')
    }
  },

  // 未登录跳转倒登录界面
  dialogButtontap() {
    wx.redirectTo({
      url: '/pages/loginModule/loginPage/loginPage',
    })
  },

  // 获取个人信息
  getMineInfo: function () {
    esRequest('mine_info').then (res => {
      if (res && res.data.code === 0) {
        this.setData({
          mineDataForm: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 喜欢
  concernsList: function () {
    esRequest('concerns_count').then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          follow: res.data.data
        })
      }
    })
  },

  // 关注
  collectionList: function () {
    esRequest('collection_count').then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          collection: res.data.data
        })
      }
    })
  },

  // 足迹列表
  mineScenicspotList: function () {
    let _this = this
    this.data.imgFlage01 = true
    this.data.imgFlage02 = true
    this.data.imgFlage03 = true
    this.data.imgFlage04 = true
    esRequest('mine_scenicspot_list').then (res => {
      if (res && res.data.code === 0) {
        let scenicspotList = res.data.data
        if (scenicspotList.length < 4) {
          let len = scenicspotList.length
          _this.data.scenicspotLen = 4 - len
          for(let i=0; i<len; i++) {
            if (scenicspotList[i].scenicspot_id == '1') {
              _this.data.imgFlage01 = false
            }
            if (scenicspotList[i].scenicspot_id == '2') {
              _this.data.imgFlage02 = false
            }
            if (scenicspotList[i].scenicspot_id == '3') {
              _this.data.imgFlage03 = false
            }
            if (scenicspotList[i].scenicspot_id == '4') {
              _this.data.imgFlage04 = false
            }
          }
        } else {
          this.data.scenicspotLen = 0
        }
        this.setData({
          imgFlage01: this.data.imgFlage01,
          imgFlage02: this.data.imgFlage02,
          imgFlage03: this.data.imgFlage03,
          imgFlage04: this.data.imgFlage04,
          scenicspotLen: this.data.scenicspotLen,
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
      wx.setStorageSync('tp_key', '03')
      wx.navigateTo({
      url: '/pages/scenicModule/mineScenic/mineScenic'
    })
  },

  // 跳转到我的喜欢
  myConcerns: function () {
    wx.navigateTo({
      url: '/pages/mineModule/myConcerns/myConcerns?type=01',
    })
  },

  // 跳转到我的关注
  myCollection: function () {
    wx.navigateTo({
      url: '/pages/mineModule/myConcerns/myConcerns?type=02',
    })
  },
  
  // 编辑个人资料
  personalData: function () {
    wx.navigateTo({
      url: '/pages/mineModule/personalData/personalData'
    })
  },

   // 跳转到我的动态
   myDynamic: function () {
    wx.navigateTo({
      url: '/pages/mineModule/myDynamic/myDynamic',
    })
  },

})