import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id_key: '',
    register_id: '',
    windowWidth: 0,
    windowHeight: 0,
    swiperList: [],
    personDetails: {},
    userInfo: {},
    dialogType: '',
    dialogShow: false,
    dialogTitle: '',
    dialogText: '',
    dialogButtons: [{text: '取消'}, {text: '确定'}],
  },

  onLoad: function (options) {
    this.data.id_key = wx.getStorageSync('id_key').toString()
    this.data.register_id = options.register_id ? options.register_id : '2'
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.marryDetails()
    if (wx.getStorageSync('userIfo')) {
      this.setData({
        userInfo: wx.getStorageSync('userIfo')
      })
    } else {
      this.getUserInfo()
    }
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
      register_id: this.data.register_id
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

  // 本人信息
  getUserInfo: function () {
    let data = {
      id: this.data.id_key
    }
    esRequest('mine_info',data).then(res => {
      if (res && res.data.code === 0) {
        wx.setStorageSync('userIfo', res.data.data)
        this.data.userInfo = res.data.data
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 关注Ta
  btnGz: function () {
    this.setData({
      dialogType: '01',
      dialogShow: true,
      dialogTitle: '关注TA',
      dialogText: '您确定要关注Ta吗？',
    })
  },

  // 要微信 / 求约会
  btnWY: function (e) {
    // 要微信
    if (e.currentTarget.dataset.type === '01') {
      this.setData({
        dialogType: '02',
        dialogShow: true,
        dialogTitle: '要微信',
        dialogText: '您确定要Ta的微信嘛？',
      })
    }
    // 求约会
    if (e.currentTarget.dataset.type === '02') {
      this.setData({
        dialogType: '03',
        dialogShow: true,
        dialogTitle: '推自己',
        dialogText: '系统会将您个人中心绑定的手机号作为微信推送给对方，请确认您的手机号是否正确',
      })
    }
  },

  // dialog确定按钮
  tapDialogButton: function (e) {
    this.setData({
      dialogShow: false
    })
    if (e.detail.index === 0) {
      Toast.success('取消')
    }
    if (e.detail.index === 1) {
      let _this = this
      // 01: 关注TA
      if (this.data.dialogType === '01') {
        let data = {
          followers_id: _this.data.id_key,
          watched_id: _this.data.personDetails.user_id,
          nick_name: _this.data.personDetails.nick_name,
          photo: _this.data.personDetails.photo1,
          introduce: _this.data.personDetails.introduce
        }
        esRequest('follow_users', data).then(res => {
          if (res && res.data.code === 0) {
            wx.setStorageSync('tp_key', '04')
            if (res.data.type === '1') {
              Toast.success('已关注Ta啦')
            }
            if (res.data.type === '0') {
              Toast.success('关注成功')
            }
          } else {
            Toast.fail('系统错误')
          }
        })
      }
      // 02: 要微信
      if (this.data.dialogType === '02') {
        let message_title = ''
        let message_content = ''
        if (this.data.personDetails.gender === '男') {
          message_title = '小哥哥，可以给个微信吗？'
          message_content = `你好，能给我你的微信吗？我被你的颜值所打动，在我心里你一定是个乐观开朗的男孩子。但我不能自己妄加推断，所以想了解一下你真的性格。`
        }
        if (this.data.personDetails.gender === '女') {
          message_title = '小姐姐，可以给个微信吗？'
          message_content = `你好，能给我你的微信吗？我被你的颜值所打动，在我心里你一定是个善良温柔的女孩子。但我不能自己妄加推断，所以想了解一下你真的性格。`
        }
        let data = {
          receiver_id: this.data.personDetails.user_id,
          sender_id: this.data.id_key,
          sender_name: this.data.userInfo.nickName,
          sender_img: this.data.userInfo.avatarUrl,
          message_title: message_title,
          message_content: message_content,
          message_type: '01'
        }
        esRequest('permessage_send', data).then(res => {
          if (res && res.data.code === 0) {
            Toast.success('发送成功')
            if (res.data.type === '1') {
              Toast.success('发送过消息啦')
            }
            if (res.data.type === '0') {
              Toast.success('发送成功')
            }
          } else {
            Toast.fail('系统错误')
          }
        })
      }
      // 03: 求约会
      if (this.data.dialogType === '03') {
        let message_title = ''
        let message_content = ''
        if (this.data.personDetails.gender === '男') {
          message_title = '小哥哥，很想和你认识一下呢？'
          message_content = `你好，我被你的颜值所打动，在我心里你一定是个乐观开朗的男孩子。但我不能自己妄加推断，所以想了解一下你真正的性格。这是我的微信号<span style="color: #4545FF;">${this.data.userInfo.userPhone}</span>，期待我们的缘分鸭。`
        }
        if (this.data.personDetails.gender === '女') {
          message_title = '小姐姐，很想和你认识一下呢？'
          message_content = `你好，我被你的颜值所打动，在我心里你一定是个善良温柔的女孩子。但我不能自己妄加推断，所以想了解一下你真正的性格。这是我的微信号<span style="color: #4545FF;">${this.data.userInfo.userPhone}</span>，期待我们的缘分鸭。`
        }
        let data = {
          receiver_id: this.data.personDetails.user_id,
          sender_id: this.data.id_key,
          sender_name: this.data.userInfo.nickName,
          sender_img: this.data.userInfo.avatarUrl,
          message_title: message_title,
          message_content: message_content,
          message_type: '02'
        }
        esRequest('permessage_send', data).then(res => {
          if (res && res.data.code === 0) {
            if (res.data.type === '1') {
              Toast.success('发送过消息啦')
            }
            if (res.data.type === '0') {
              Toast.success('发送成功')
            }
          } else {
            Toast.fail('系统错误')
          }
        })
      }
    }
  }
})