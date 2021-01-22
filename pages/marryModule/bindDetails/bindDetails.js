import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';

Page({
  data: {
    id_key: '',
    windowWidth: 0,
    windowHeight: 0,
    swiperList: [],
    personDetails: {}
  },

  onLoad: function (options) {
    this.data.id_key = wx.getStorageSync('id_key')
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.marryDetails()
  },

  // 点击首页轮播图
  swiperTap: function (e) {
    wx.previewImage({
      // 当前显示图片的http链接
      current: e.currentTarget.dataset.item,
      // 需要预览的图片http链接列表
      urls: this.data.swiperList
    })
  },

  // 基本信息
  marryDetails: function () {
    let data = {
      user_id: '100001'
    }
    esRequest('marry_details', data).then(res => {
      if (res && res.data.code === 0) {
        this.data.swiperList = []
        this.data.swiperList.push(res.data.data.photo1)
        this.data.swiperList.push(res.data.data.photo2)
        this.data.swiperList.push(res.data.data.photo3)
        this.setData({
          swiperList: this.data.swiperList,
          personDetails: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 关注Ta
  btnGz: function () {
    let _this = this
    let data = {
      followers_id: this.data.id_key,
      watched_id: this.data.personDetails.user_id
    }
    esRequest('is_follow_users', data).then(res => {
      if (res && res.data.code === 0) {
        if (res.data.type === '1') {
          Toast.success('已关注Ta啦')
        }
        if (res.data.type === '0') {
          Dialog.confirm({
            title: '关注',
            message: '您确定要关注Ta吗？',
          }).then(() => {
            let data2 = {
              followers_id: _this.data.id_key,
              watched_id: _this.data.personDetails.user_id,
              nick_name: _this.data.personDetails.nick_name,
              gender: _this.data.personDetails.gender,
              photo: _this.data.personDetails.photo1,
              introduce: _this.data.personDetails.introduce
            }
            esRequest('follow_users', data2).then(res => {
              if (res && res.data.code === 0) {
                Toast.success('关注成功')
              } else {
                Toast.fail('系统错误')
              }
            })
          }).catch(() => {
            Toast.success('取消')
          });
        }
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 换微信
  btnWx: function () {

  },

  // 求约会
  btnYh: function () {

  }

})