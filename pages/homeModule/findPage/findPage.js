import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id_key: '',
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
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },
  
  // 同城动态列表
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

  // 查看大图或保存图片
  dynamicImg: function (e) {
    let current = e.currentTarget.dataset.item.image
    let urls = [e.currentTarget.dataset.item.image]
    wx.previewImage({
      // 当前显示图片的http链接
      current: current,
      // 需要预览的图片http链接列表
      urls: urls
    })
  },

  // 同城动态详情
  getDynamicDetalis: function (e) {
    // 01：相亲
    if (e.currentTarget.dataset.item.type_id === '01') {
      wx.navigateTo({
        url: '/pages/marryModule/bindDetails/bindDetails?user_id=' + e.currentTarget.dataset.item.author_id
      })
    }
    // 02：新闻
    if (e.currentTarget.dataset.item.type_id === '02') {
      wx.navigateTo({
        url: '/pages/dynamicModule/advertisement/advertisement?id=' + e.currentTarget.dataset.item.advertisement_id + '&type=1'
      })
    }
    // 03：普通
  },
  
  // 同城动态触底函数
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