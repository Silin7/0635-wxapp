import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    topShow: false,
    dynamicPage: 1,
    dynamicLimit: 10,
    totalCount: 0,
    dynamicList: []
  },

  onLoad: function (options) {
    this.getDynamicList()
  },

  onReady: function () {
    this.setData({
      container: () => wx.createSelectorQuery().select('#container'),
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  // 发动态
  goAddPage: function () {
    wx.navigateTo({
      url: '/pages/releaseModule/releaseDynamic/releaseDynamic',
    })
  },
  
  // 动态列表
  getDynamicList: function () {
    let data = {
      page: this.data.dynamicPage,
      limit: this.data.dynamicLimit
    }
    return new Promise (async (resolve, reject) => {
      esRequest('dynamic_list', data).then(res => {
        if (res && res.data.code === 0) {
          this.setData({
            totalCount: res.data.totalCount,
            dynamicList: this.data.dynamicList.concat(res.data.data)
          })
        } else {
          Toast.fail('系统错误')
        }
        resolve()
      })
    })
  },

  // 作者动态列表
  authorDynamic: function (e) {
    wx.navigateTo({
      url: '/pages/dynamicModule/dynamicList/dynamicList?authorId=' + e.currentTarget.dataset.item.author_id
    })
  },

  // 动态详情
  getDynamicDetalis: function (e) {
    // 01：相亲
    if (e.currentTarget.dataset.item.type_id === '01') {
      wx.navigateTo({
        url: '/pages/marryModule/marryDetails/marryDetails?id=' + e.currentTarget.dataset.item.advertisement_id
      })
    }
    // 02：活动
    if (e.currentTarget.dataset.item.type_id === '02') {
      wx.navigateTo({
        url: '/pages/appointmentModule/appointmentDetails/appointmentDetails?id=' + e.currentTarget.dataset.item.advertisement_id
      })
    }
    // 03：广告
    if (e.currentTarget.dataset.item.type_id === '03') {
      wx.navigateTo({
        url: '/pages/dynamicModule/advertisement/advertisement?id=' + e.currentTarget.dataset.item.id + '&type=1'
      })
    }
    // 09：用户上传
    if (e.currentTarget.dataset.item.type_id === '09') {
      let dynamicId = e.currentTarget.dataset.item.id
      let authorId = e.currentTarget.dataset.item.author_id
      wx.navigateTo({
        url: `/pages/dynamicModule/dynamicDeatils/dynamicDeatils?dynamicId=${dynamicId}&authorId=${authorId}`
      })
    }
  },
  
  // 动态触底函数
  onReachBottom: function () {
    if (this.data.totalCount > this.data.dynamicList.length) {
      this.data.dynamicPage += 1
      this.getDynamicList()
    }
  },

  // 获取滚动条当前位置
  onPageScroll: function (e) {
    if (e.scrollTop > this.data.windowHeight) {
      this.setData({
        topShow: true
      });
    } else {
      this.setData({
        topShow: false
      });
    }
  },

  // 回到顶部
  bindTop: function (e) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  //下拉刷新
  onPullDownRefresh: function () {
    this.data.dynamicPage = 1
    this.data.dynamicLimit = 10
    this.data.totalCount = 0
    this.data.dynamicList = []
    this.awaitDynamicList()
  },
  // 停止下拉刷新 清空数据
  async awaitDynamicList () {
    await this.getDynamicList()
    Toast.success('刷新成功')
    // 停止下拉刷新
    wx.stopPullDownRefresh();
  },

})