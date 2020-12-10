// import esRequest from '../../../utils/esRequest'
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
import Json from '../../../json/recipe_catalogs'

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    keyword: '',
    recipeList: []
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
      recipeList: Json.recipe_catalogs.data
    })
    console.log(this.data.recipeList)
  },
  // 搜索框value change
  searchChange: function (e) {
    this.setData({
      keyword: e.detail,
    });
  },
  // 点击搜索
  searchClick: function () {
    Toast('搜索' + this.data.keyword);
  },
})