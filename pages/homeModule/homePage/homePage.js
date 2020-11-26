// "navigationBarBackgroundColor": "#C7C7FE",
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    windowHeight: 0,
    swiperList: [
      { id: 'swiper01', image: '/images/homeMoudle/swiper_02.jpg' },
      { id: 'swiper02', image: '/images/homeMoudle/swiper_02.jpg' },
      { id: 'swiper03', image: '/images/homeMoudle/swiper_02.jpg' }
    ],
    iconList: [
      { name: '景区', image: '/images/homeMoudle/banner_xq.jpg', id: 'icon01' },
      { name: '美食', image: '/images/homeMoudle/banner_xq.jpg', id: 'icon02' },
      { name: '游戏', image: '/images/homeMoudle/banner_xq.jpg', id: 'icon03' },
      { name: '公益', image: '/images/homeMoudle/banner_xq.jpg', id: 'icon04' },
    ],
    footerActive: 0,
    footerIcon: {
      home_normal: '/images/homeMoudle/home_normal.png',
      home_active: '/images/homeMoudle/home_active.png',
      compass_normal: '/images/homeMoudle/compass_normal.png',
      compass_active: '/images/homeMoudle/compass_active.png',
      release_normal: '/images/homeMoudle/release_normal.png',
      release_active: '/images/homeMoudle/release_active.png',
      news_normal: '/images/homeMoudle/news_normal.png',
      news_active: '/images/homeMoudle/news_active.png',
      mine_normal: '/images/homeMoudle/mine_normal.png',
      mine_active: '/images/homeMoudle/mine_active.png',
    },
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
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },
  
  onShow: function () {
    this.setData({
      footerActive: 0
    })
  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  navChange(event) {
    this.setData({
      footerActive: event.detail
    })
    if (event.detail === 4) {
      wx.navigateTo({
        url: '/pages/mineModule/personalCenter/personalCenter',
      })
    }
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
  }
})