import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    type_id: '',
    seriesPage: '1',
    seriesLimit: '10',
    seriesList: []
  },

  onLoad: function (options) {
    if (options.id) {
      this.data.type_id = options.id
    }
    if (options.name) {
      wx.setNavigationBarTitle({
        title: options.name
      })
    }
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.wallpaperSeries()
  },

  // 壁纸系列
  wallpaperSeries: function () {
    let data = {
      page: this.data.seriesPage,
      limit: this.data.seriesLimit,
      type_id: this.data.type_id
    }
    esRequest('wallpaper_series', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          seriesList: this.data.seriesList.concat(res.data.data)
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 触底函数
  onScrollBottom: function () {
    if (this.data.totalCount > this.data.seriesList.length) {
      this.data.seriesPage += 1
      this.wallpaperSeries()
    }
  },

  // xxx
  wallportraitList: function (e) {
    wx.navigateTo({
      url: '/pages/pictureModule/wallpaperList/wallpaperList?id=' + e.currentTarget.dataset.item.series_id + '&name=' +  e.currentTarget.dataset.item.series_name
    })
  }

})