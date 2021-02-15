import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id_key: '',
    windowWidth: 0,
    windowHeight: 0,
    dynamicPage: 1,
    dynamicLimit: 10,
    totalCount: 0,
    dynamicList: []
  },

  onLoad: function (options) {
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
    this.getDynamicList()
  },

  onShow: function () {
  },
  
  // 同城动态列表
  getDynamicList: function () {
    let data = {
      page: this.data.dynamicPage,
      limit: this.data.dynamicLimit
    }
    esRequest('dynamic_list', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          totalCount: res.data.totalCount,
          dynamicList: this.data.dynamicList.concat(res.data.data)
        })
      } else {
        Toast.fail('系统错误')
      }
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

  // 同城动态触底函数
  onScrollBottom: function () {
    if (this.data.totalCount > this.data.dynamicList.length) {
      this.data.dynamicPage += 1
      this.getDynamicList()
    }
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
  }

})