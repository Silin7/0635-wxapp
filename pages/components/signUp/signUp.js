import regular from '../../../utils/regular'
import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    active_title: '',
    nickName: '',
    userInfo: {},
    dataForm: {
      receiver_id: '',
      sender_id: '',
      sender_name: '',
      sender_img	: '',
      message_title: '',
      message_content: '',
      message_type: '04',
    },
    dialogShow: false,
    dialogButtons: [{text: '取消'}, {text: '确定'}],
  },

  onLoad: function (option) {
    if (option.receiver_id) {
      this.data.dataForm.receiver_id = option.receiver_id
    }
    if (option.active_title) {
      this.data.active_title = option.active_title
    }
    if (wx.getStorageSync('userIfo')) {
      this.setData({
        nickName: wx.getStorageSync('userIfo').nickName,
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
    this.data.userInfo.nickName = event.detail.value
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
    this.data.userInfo.userPhone = event.detail.value
    this.setData({
      userInfo: this.data.userInfo
    });
  },

  // 获取个人信息
  getMineInfo: function () {
    let data = {
      id: wx.getStorageSync('id_key')
    }
    esRequest('mine_info', data).then (res => {
      if (res && res.data.code === 0) {
        this.setData({
        nickName: res.data.data.nickName,
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
        if (key == 'nickName') {
          Toast.fail('请填写姓名')
          return
        }
        if (key == 'userPhone') {
          Toast.fail('请填写电话')
          return
        }
        if (key == 'gender') {
          Toast.fail('请选择性别')
          return
        }
      }
    }
    if (regular.phoneNumber(this.data.userInfo.userPhone)) {
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
      let gender = this.data.userInfo.gender === '1' ? '男' : '女'
      this.data.dataForm.sender_id = this.data.userInfo.id
      this.data.dataForm.sender_name = this.data.userInfo.nickName
      this.data.dataForm.sender_img = this.data.userInfo.avatarUrl
      this.data.dataForm.message_title = '活动报名通知'
      this.data.dataForm.message_content = `用户${this.data.userInfo.nickName}（<span style="color: #F76262;">${gender}</span>，<span style="color: #4545FF;">${this.data.userInfo.userPhone}</span>）报名参加了您发起的活动 ${this.data.active_title},请您尽快联系对方哟 。`
      esRequest('permessage_send', this.data.dataForm).then(res => {
        if (res && res.data.code === 0) {
          if (res.data.type == '1') {
            Toast.success('您已经报名')
          }
          if (res.data.type == '0') {
            Toast.success('报名成功')
          }
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        } else {
          Toast.fail('系统错误')
        }
      })
    }
  }
})