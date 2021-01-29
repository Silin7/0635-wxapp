import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    messageId: '',
    mineDataForm: {},
    messageData: {},
    sysmessage_details: ''
  },

  onLoad: function (options) {
    this.setData({
      id_key: wx.getStorageSync('id_key').toString()
    })
    this.data.messageId = options.id ? options.id : ''
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.getPermessageDetails()
    this.getMineInfo()
  },

  // 获取个人信息
  getMineInfo: function () {
    let data = {
      id: this.data.id_key
    }
    esRequest('mine_info', data).then (res => {
      if (res && res.data.code === 0) {
        this.setData({
          mineDataForm: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 个人私信详情
  getPermessageDetails: function () {
    let data = {
      id: this.data.messageId
    }
    esRequest('permessage_details', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          messageData: res.data.data,
          sysmessage_details: res.data.data.message_content.toString().replace(/\<img/gi, '<img style="max-width:100%; height:auto"')
        })

      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 欣然同意
  gladlyConsent: function () {
    Dialog.confirm({
      title: '欣然同意',
      message: '一段微妙的缘分就要开始咯！',
    }).then(() => {
      let data = {
        receiver_id: this.data.messageData.sender_id,
        sender_id: this.data.id_key,
        sender_name: this.data.mineDataForm.nickName,
        sender_img: this.data.mineDataForm.avatarUrl,
        message_title: `来自${this.data.mineDataForm.nickName}的消息回复`,
        message_content: `谢谢你的喜欢哟，我的微信号是<span style="color: #4545FF;">${this.data.mineDataForm.userPhone}</span>，期待我们的缘分鸭。`,
        message_type: '03'
      }
      esRequest('permessage_send', data).then(res => {
        if (res && res.data.code === 0) {
          Toast.success('发送成功')
          if (res.data.type === '1') {
            Toast.success('已经回复过啦')
          }
          if (res.data.type === '0') {
            Toast.success('发送成功')
          }
        } else {
          Toast.fail('系统错误')
        }
      })
    }).catch(() => {
      Toast.success('取消')
    });
  },

  // 残忍拒绝
  cruelRefusal: function () {
    Dialog.confirm({
      title: '残忍拒绝',
      message: '拒绝之后你们就永远错过了呢！',
    }).then(() => {
      let data = {
        receiver_id: this.data.messageData.sender_id,
        sender_id: this.data.id_key,
        sender_name: this.data.mineDataForm.nickName,
        sender_img: this.data.mineDataForm.avatarUrl,
        message_title: `来自${this.data.mineDataForm.nickName}的消息回复`,
        message_content: `谢谢你的喜欢哟，我还没有准备好，期待我们的下一场缘分吧。`,
        message_type: '03'
      }
      esRequest('permessage_send', data).then(res => {
        if (res && res.data.code === 0) {
          Toast.success('发送成功')
          if (res.data.type === '1') {
            Toast.success('已经回复过啦')
          }
          if (res.data.type === '0') {
            Toast.success('发送成功')
          }
        } else {
          Toast.fail('系统错误')
        }
      })
    }).catch(() => {
      Toast.success('取消')
    });
  }
})