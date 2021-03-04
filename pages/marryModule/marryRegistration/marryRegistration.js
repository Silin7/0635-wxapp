import regular from '../../../utils/regular'
import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    register_id: '',
    gender: '',
    nickName: '',
    userInfo: {},
    dataType: '01',
    dataForm: {
      receiver_id: '',
      sender_id: '',
      sender_name: '',
      sender_img	: '',
      message_title: '',
      message_content: '',
      message_type: '',
    },
    dialogTitle: '期待缘分发生',
    dialogText: '您确定要对方的微信吗？',
    dialogShow: false,
    dialogButtons: [{text: '取消'}, {text: '确定'}],
  },

  onLoad: function (option) {
    console.log(option)
    if (option.receiver_id) {
      this.data.dataForm.receiver_id = option.receiver_id
    }
    if (option.register_id) {
      this.data.register_id = option.register_id
    }
    if (option.gender) {
      this.data.gender = option.gender
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

  // 类型切换
  typeChange(event) {
    if (event.detail === '01') {
      this.setData({
        dialogTitle: '期待缘分发生',
        dialogText: '您确定要对方的微信吗？',
        dataType: event.detail
      });
    }
    if (event.detail === '02') {
      this.setData({
        dialogTitle: '期待缘分发生',
        dialogText: '您确定将您的微信推送给对方吗？',
        dataType: event.detail
      });
    }
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
        wx.setStorageSync('userIfo', res.data.data)
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
          if (this.data.dataType === '02') {
            Toast.fail('请填写微信')
            return
          }
        }
        if (key == 'gender') {
          Toast.fail('请选择性别')
          return
        }
      }
    }
    if (this.data.dataType === '01') {
      this.setData({
        dialogShow: true
      })
    }
    if (this.data.dataType === '02') {
      if (regular.phoneNumber(this.data.userInfo.userPhone)) {
        this.setData({
          dialogShow: true
        })
      } else {
        Toast.fail('微信格式错误')
      }
    }
  },

  // 确定报名
  tapDialogButton: function (e) {
    let _this = this
    this.setData({
      dialogShow: false
    })
    if (e.detail.index == 1) {
      let data = {
        register_id: this.data.register_id,
        followers_id: this.data.userInfo.id
      }
      esRequest('marry_sign', data).then(res => {
        if (res && res.data.code === 0) {
          _this.data.dataForm.sender_id = _this.data.userInfo.id
          _this.data.dataForm.sender_name = _this.data.userInfo.nickName
          _this.data.dataForm.sender_img = _this.data.userInfo.avatarUrl
          if (_this.data.gender === '男') {
            if (_this.data.dataType === '01') {
              _this.data.dataForm.message_title = '小哥哥，可以留个微信吗？'
              _this.data.dataForm.message_content = `你好，能给我留一个你的微信吗？我被你的颜值所打动，在我心里你一定是个乐观开朗的男孩子。但我不能自己妄加推断，所以想了解一下你真的性格。`
              _this.data.dataForm.message_type = '01'
            }
            if (_this.data.dataType === '02') {
              _this.data.dataForm.message_title = '小哥哥，很想和你认识一下呢'
              _this.data.dataForm.message_content = `你好，我被你的颜值所打动，在我心里你一定是个乐观开朗的男孩子。但我不能自己妄加推断，所以想了解一下你真正的性格。这是我的微信号<span style="color: #4545FF;">${_this.data.userInfo.userPhone}</span>，期待我们的缘分鸭。`
              _this.data.dataForm.message_type = '02'
            }
          }
          if (_this.data.gender === '女') {
            if (_this.data.dataType === '01') {
              _this.data.dataForm.message_title = '小姐姐，可以留个微信吗？'
              _this.data.dataForm.message_content = `你好，能给我留一个你的微信吗？我被你的颜值所打动，在我心里你一定是个善良温柔的女孩子。但我不能自己妄加推断，所以想了解一下你真的性格。`
              _this.data.dataForm.message_type = '01'
            }
            if (_this.data.dataType === '02') {
              _this.data.dataForm.message_title = '小姐姐，很想和你认识一下呢'
              _this.data.dataForm.message_content = `你好，我被你的颜值所打动，在我心里你一定是个善良温柔的女孩子。但我不能自己妄加推断，所以想了解一下你真正的性格。这是我的微信号<span style="color: #4545FF;">${_this.data.userInfo.userPhone}</span>，期待我们的缘分鸭。`
              _this.data.dataForm.message_type = '02'
            }
          }
          esRequest('permessage_send', _this.data.dataForm).then(res => {
            if (res && res.data.code === 0) {
              Toast.success('发送成功')
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