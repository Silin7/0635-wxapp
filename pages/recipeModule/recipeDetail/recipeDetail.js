import esRequest from '../../../utils/esRequest'
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    menuId: '',
    title: '',
    photo: '',
    // 食材
    major: [],
    // 步骤
    cookstep: [],
  },
  onLoad: function (options) {
    this.data.menuId = options.id ? options.id : '1406803'
  },
  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },
  onShow: function () {
    this.getRecipeDetail()
  },
  // 获取菜单详情
  getRecipeDetail: function () {
    let data = {
      id: this.data.menuId
    }
    esRequest('recipe_detail', data).then(res => {
      if (res && res.data.state === 'success') {
        this.setData({
          title: res.data.result.recipe.title,
          photo: res.data.result.recipe.original_photo_path,
          major: res.data.result.recipe.major,
          cookstep: res.data.result.recipe.cookstep
        })
        console.log(this.data.title)
        console.log(this.data.major)
        console.log(this.data.cookstep)
      } else {
        Toast.fail('系统错误')
      }
    })
  }
})