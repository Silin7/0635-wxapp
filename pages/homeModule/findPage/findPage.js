import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id_key: '',
    windowWidth: 0,
    windowHeight: 0,
    newsTypeList: [],
    cityTypeList: [],
    dynamicList: [],
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
    this.getNewsType()
    this.getCityType()
    this.getDynamicList()
  },
  // 新闻类型列表
  getNewsType: function () {
    esRequest('admin_news_type').then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          newsTypeList: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },
  // 新闻列表
  newsList: function (e) {
    wx.navigateTo({
      url: '/pages/dynamicModule/newsList/newsList?typeId=' + e.currentTarget.dataset.item.type_id + '&typeName=' + e.currentTarget.dataset.item.type_name
    })
  },
  // 县市类型列表
  getCityType: function () {
    esRequest('admin_city_type').then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          cityTypeList: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },
  // 县市新闻列表
  cnewsList: function (e) {
    console.log(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/dynamicModule/cnewsList/cnewsList?typeId=' + e.currentTarget.dataset.item.type_id + '&typeName=' + e.currentTarget.dataset.item.type_name
    })
  },
  // 同城动态列表
  getDynamicList: function () {
    esRequest('dynamic_list').then(res => {
      if (res && res.data.code === 0) {
        this.data.dynamicList = res.data.data
        this.data.dynamicList.forEach(item => {
          item.content = item.content.toString().replace(/\<img/gi, '<img style="max-width:100%; height:auto"')
        })
        this.setData({
          dynamicList: this.data.dynamicList
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },
  // 同城动态详情
  getDynamicDetalis: function (e) {
    wx.navigateTo({
      url: '/pages/dynamicModule/dynamicDetails/dynamicDetails?id=' + e.currentTarget.dataset.item.id
    })
  }
})