import esRequest from '../../../utils/esRequest'
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    menuId: '',
    menu_details: {}
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
          menu_details: res.data.result.recipe
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  }
})