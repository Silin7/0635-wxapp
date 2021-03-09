import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    loginShow: false,
    windowWidth: 0,
    windowHeight: 0,
    menuId: '',
    menuDetails: {},
    menuPictures: [],
    dialogShow: false,
    dialogButtons: [{text: '取消'}, {text: '确定'}],
  },

  onLoad: function (options) {
    this.data.menuId = options.id ? options.id : ''
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
    let _this = this
    let data = {
      id: this.data.menuId
    }
    esRequest('recipe_detail', data).then(res => {
      if (res && res.data.state === 'success') {
        this.data.menuPictures = []
        res.data.result.recipe.cookstep.forEach(function (item) {
          _this.data.menuPictures.push(item.image)
        })
        this.setData({
          menuDetails: res.data.result.recipe,
          menuPictures: _this.data.menuPictures
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },
  
  // 点击收藏
  collectionMenu: function () {
    if (!wx.getStorageSync('id_key')) {
      this.setData({ loginShow: true })
    } else {
      this.setData({ dialogShow: true })
    }
  },

  // 收藏确定按钮
  tapDialogButton: function (e) {
    this.setData({
      dialogShow: false
    })
    if (e.detail.index === 0) {
      Toast.success('取消')
    }
    if (e.detail.index === 1) {
      let _this = this
      let data = {
        followers_id: wx.getStorageSync('id_key').toString(),
        menu_id: _this.data.menuId,
        menu_name: _this.data.menuDetails.title,
        menu_image: _this.data.menuDetails.photo_path,
        menu_info: `时间：${_this.data.menuDetails.cook_time ? _this.data.menuDetails.cook_time : '暂未评估'}，难度：${_this.data.menuDetails.cook_difficulty ? _this.data.menuDetails.cook_difficulty : '暂未评估'}`
      }
      esRequest('follow_collection', data).then(res => {
        if (res && res.data.code === 0) {
          wx.setStorageSync('tp_key', '05')
          Toast.success('已收藏')
        } else {
          Toast.fail('系统错误')
        }
      })
    }
  },

  // 查看保存图片
  savePicture: function (e) {
    let current = e.currentTarget.dataset.img
    wx.previewImage({
      // 当前显示图片的http链接
      current: current,
      // 需要预览的图片http链接列表
      urls: this.data.menuPictures
    })
  },

  // 未登录跳转倒登录界面
  dialogButtontap() {
    wx.navigateTo({
      url: '/pages/loginModule/loginPage/loginPage'
    })
  }
})