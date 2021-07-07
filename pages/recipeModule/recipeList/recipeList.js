import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
import Json from '../../../json/recipe_catalogs'

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    keyword: '',
    sidebarKey: 0,
    isShow: true,
    recipeList: [],
    recipeItemList: []
  },
  
  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
    this.setData({
      sidebarKey: 0,
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
    if (this.data.keyword === '') {
      Toast.fail('请输入关键词')
      return
    }
    wx.navigateTo({
      url: '/pages/recipeModule/recipeInfo/recipeInfo?keyword=' + this.data.keyword
    })
  },

  // 侧边栏chenge
  sidebarChange: function (e) {
    this.setData({
      isShow: false
    })
    this.setData({
      recipeItemList: this.data.recipeList[e.detail].data,
      isShow: true
    })
  },
  
  // 点击菜品进入info页面
  recipeInfo: function (e) {
    wx.navigateTo({
      url: '/pages/recipeModule/recipeInfo/recipeInfo?keyword=' + e.currentTarget.dataset.item
    })
  }
})