import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
import Json from '../../../json/recipe_catalogs'

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    keyword: '',
    recipeList: [],
    recipeItemList: [],
    sidebarKey: 0
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
    this.setData({
      recipeList: Json.recipe_catalogs.data,
      recipeItemList: Json.recipe_catalogs.data[0].data
    })
  },
  // 搜索框value change
  searchChange: function (e) {
    this.setData({
      keyword: e.detail,
    });
  },
  // 点击搜索
  searchClick: function () {
    wx.navigateTo({
      url: '/pages/recipeModule/recipeInfo/recipeInfo?keyword=' + this.data.keyword
    })
  },
  // 侧边栏chenge
  sidebarChange: function (e) {
    this.setData({
      recipeItemList: this.data.recipeList[e.detail].data
    })
  },
  // 点击菜品进入info页面
  recipeInfo: function (e) {
    wx.navigateTo({
      url: '/pages/recipeModule/recipeInfo/recipeInfo?keyword=' + e.currentTarget.dataset.item
    })
  }
})