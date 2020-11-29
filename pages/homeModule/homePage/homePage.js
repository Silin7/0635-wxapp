import esRequest from '../../../utils/esRequest'
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    windowWidth: 0,
    windowHeight: 0,
    footerActive: 0,
    overlayShow: true,
    swiperList: [
      { id: 'swiper01', image: '/images/homeMoudle/swiper_02.jpg' },
      { id: 'swiper02', image: '/images/homeMoudle/swiper_02.jpg' },
      { id: 'swiper03', image: '/images/homeMoudle/swiper_02.jpg' }
    ],
    iconList: [
      { name: '测试', image: '/images/homeMoudle/banner_xq.jpg', id: 'icon01' },
      { name: '测试', image: '/images/homeMoudle/banner_xq.jpg', id: 'icon02' },
      { name: '测试', image: '/images/homeMoudle/banner_xq.jpg', id: 'icon03' },
      { name: '测试', image: '/images/homeMoudle/banner_xq.jpg', id: 'icon04' },
    ],
    dataForm: {},
  },

  onLoad: function (options) {
    // 查看是否授权
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
            }
          })
        } else {
          console.log('未授权')
        }
      }
    })
  },
  
  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },
  
  onShow: function () {
    this.setData({
      footerActive: 3
    })
    this.getMineInfo()
  },

  // 底部导航切换
  navChange(event) {
    this.setData({
      footerActive: event.detail
    })
  },

  swiperTap: function (e) {
    console.log(e.currentTarget.dataset.item)
  },

  bindGetUserInfo (e) {
    console.log(e.detail.userInfo)
    wx.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        console.log(nickName)
        console.log(avatarUrl)
        console.log(gender)
        console.log(province)
        console.log(city)
        console.log(country)
      }
    })
  },
  // 消息详情
  newsDetails: function () {
    wx.navigateTo({
      url: '/pages/newsModule/newsDetails/newsDetails',
    })
  },

  // 我的（个人中心）
  // 获取个人信息
  getMineInfo: function () {
    let data = {
      id: wx.getStorageSync('id_key')
    }
    esRequest('mine_info', data).then (res => {
      if (res && res.data.code == 0) {
        this.setData({
          dataForm: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 我的关注
  myConcerns: function () {
    wx.navigateTo({
      url: '/pages/mineModule/myConcerns/myConcerns',
    })
  },

  // 编辑个人资料
  personalData: function () {
    wx.navigateTo({
      url: '/pages/mineModule/personalData/personalData',
    })
  },

  // 关注TA
  followTA: function () {
    console.log('关注TA')
  }

})