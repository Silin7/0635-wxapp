import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    keyword: '',
    recipeInfo: []
  },

  onLoad: function (options) {
    this.data.keyword = options.keyword ? options.keyword : ''
  },

  onShow: function () {
    this.getRecipeList()
  },

  // 获取菜单列表
  getRecipeList: function () {
    let data = {
      keyword: this.data.keyword
    }
    esRequest('recipe_list', data).then(res => {
      if (res && res.data.state === 'success') {
        if (res.data.result.list.length > 0) {
          this.setData({
            recipeInfo: res.data.result.list
          })
        } else {
          Toast.fail('暂无相关菜谱')
          setTimeout(()=> {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        }
      } else {
        Toast.fail('系统错误')
        setTimeout(()=> {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }
    })
  },

  // 菜谱详情
  recipeDetail: function (e) {
    wx.navigateTo({
      url: '/pages/recipeModule/recipeDetail/recipeDetail?id=' + e.currentTarget.dataset.item.r.id,
    })
  }
})