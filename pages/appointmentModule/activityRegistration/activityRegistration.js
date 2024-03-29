import regular from '../../../utils/regular'
import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    active_id: '',
    active_title: '',
    nick_name: '',
    userInfo: {},
    dataForm: {
      receiver_id: '',
      sender_id: '',
      sender_name: '',
      sender_img: '',
      message_title: '',
      message_content: '',
      message_type: '03',
    },
    dialogShow: false,
    dialogButtons: [{text: '取消'}, {text: '确定'}],
  },

  onLoad: function (option) {
    if (option.receiver_id) {
      this.data.dataForm.receiver_id = option.receiver_id
    }
    if (option.active_id) {
      this.data.active_id = option.active_id
    }
    if (option.active_title) {
      this.data.active_title = option.active_title
    }
    if (wx.getStorageSync('userIfo')) {
      this.setData({
        nick_name: wx.getStorageSync('userIfo').nick_name,
        userInfo: wx.getStorageSync('userIfo')
      })
    } else {
      this.getMineInfo()
    }
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  // 填写姓名
  nickNameTap: function (event) {
    this.data.userInfo.nick_name = event.detail.value
    this.setData({
      userInfo: this.data.userInfo
    });
  },

  // 性别切换
  genderChange(event) {
    this.data.userInfo.gender = event.detail
    this.setData({
      userInfo: this.data.userInfo
    });
  },

  // 填写电话
  userPhoneTap: function (event) {
    this.data.userInfo.user_phone = event.detail.value
    this.setData({
      userInfo: this.data.userInfo
    });
  },

  // 获取个人信息
  getMineInfo: function () {
    esRequest('mine_info').then (res => {
      if (res && res.data.code === 0) {
        wx.setStorageSync('userIfo', res.data.data)
        this.setData({
          nick_name: res.data.data.nick_name,
          userInfo: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  signUp: function () {
    let data = this.data.userInfo
    for (let key in data) {
      if (data[key] == "") {
        if (key == 'nick_name') {
          Toast.fail('请填写姓名')
          return
        }
        if (key == 'user_phone') {
          Toast.fail('请填写电话')
          return
        }
        if (key == 'gender') {
          Toast.fail('请选择性别')
          return
        }
      }
    }
    if (regular.phoneNumber(this.data.userInfo.user_phone)) {
      this.setData({
        dialogShow: true
      })
    } else {
      Toast.fail('电话格式错误')
    }
  },

  // 确定报名
  tapDialogButton: function (e) {
    this.setData({
      dialogShow: false
    })
    if (e.detail.index == 1) {
      let _this = this
      let data = {
        active_id: this.data.active_id,
        followers_id: this.data.userInfo.id
      }
      let gender = this.data.userInfo.gender === '1' ? '男' : '女'
      this.data.dataForm.sender_id = this.data.userInfo.id
      this.data.dataForm.sender_name = this.data.userInfo.nick_name
      this.data.dataForm.sender_img = this.data.userInfo.avatar_url
      this.data.dataForm.message_title = '活动报名通知'
      this.data.dataForm.message_content = `用户${this.data.userInfo.nick_name}（<span style="color: #F76262;">${gender}</span>，<span style="color: #F76262;">${this.data.userInfo.user_phone}</span>）报名参加了您发起的活动 [<span style="color: #4545FF;">${this.data.active_title}</span>] ,请您尽快联系对方哟 。`
      esRequest('appointment_sign', data).then(res => {
        if (res && res.data.code === 0) {
          esRequest('permessage_active', _this.data.dataForm).then(res => {
            if (res && res.data.code === 0) {
              Toast.success('报名成功')
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 1500)
            } else {
              Toast.fail('系统错误')
            }
          })
        } else {
          Toast.fail('系统错误')
        }
      })
    }
  }
})