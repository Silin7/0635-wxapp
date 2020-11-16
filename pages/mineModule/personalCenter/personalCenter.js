Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
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
  },
  
})