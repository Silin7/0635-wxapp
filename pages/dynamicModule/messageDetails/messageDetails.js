import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    messageId: '',
    mineDataForm: {},
    messageData: {},
    sysmessage_details: '',
    dialogType: '01',
    dialogShow: false,
    dialogTitle: '',
    dialogText: '',
    dialogButtons: [{text: '取消'}, {text: '确定'}],
  },

  onLoad: function (options) {
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
    if (wx.getStorageSync('userIfo')) {
      this.setData({
        mineDataForm: wx.getStorageSync('userIfo')
      })
    } else {
      this.getMineInfo()
    }
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
    let data = {
      register_id: this.data.messageId,
      followers_id: this.data.mineDataForm.id
    }
    esRequest('marry_issign', data).then(res => {
      if (res && res.data.code === 0) {
        if (res.data.type === '0') {
          this.setData({
            dialogType: '01',
            dialogShow: true,
            dialogTitle: '欣然同意',
            dialogText: '一段微妙的缘分就要开始咯！'
          })
        }
        if (res.data.type === '1') {
          Toast.success('已经回复了')
        }
      }
    })
  },

  // 残忍拒绝
  cruelRefusal: function () {
    let data = {
      register_id: this.data.messageId,
      followers_id: this.data.mineDataForm.id
    }
    esRequest('marry_issign', data).then(res => {
      if (res && res.data.code === 0) {
        if (res.data.type === '0') {
          this.setData({
            dialogType: '02',
            dialogShow: true,
            dialogTitle: '残忍拒绝',
            dialogText: '拒绝之后你们就永远错过了呢！'
          })
        }
        if (res.data.type === '1') {
          Toast.success('已经回复了')
        }
      }
    })
  },

  // 回复消息
  tapDialogButton(e) {
    this.setData({
      dialogShow: false
    })
    if (e.detail.index === 0) {
      Toast.success('取消')
    }
    if (e.detail.index === 1) {
      let data = {
        register_id: this.data.messageId,
        followers_id: this.data.mineDataForm.id
      }
      esRequest('marry_sign', data).then(res => {
        if (res && res.data.code === 0) {
          if (this.data.dialogType === '01') {
            let data = {
              receiver_id: this.data.messageData.sender_id,
              sender_id: this.data.mineDataForm.id,
              sender_name: this.data.mineDataForm.nick_name,
              sender_img: this.data.mineDataForm.avatar_url,
              message_title: `来自${this.data.mineDataForm.nick_name}的消息回复`,
              message_content: `谢谢你的喜欢哟，我的微信号是<span style="color: #4545FF;">${this.data.mineDataForm.user_phone}</span>，期待我们的缘分鸭。`,
              message_type: '02'
            }
            esRequest('permessage_active', data).then(res => {
              if (res && res.data.code === 0) {
                Toast.success('发送成功')
              } else {
                Toast.fail('系统错误')
              }
            })
          }
          if (this.data.dialogType === '02') {
            let data = {
              receiver_id: this.data.messageData.sender_id,
              sender_id: this.data.mineDataForm.id,
              sender_name: this.data.mineDataForm.nick_name,
              sender_img: this.data.mineDataForm.avatar_url,
              message_title: `来自${this.data.mineDataForm.nick_name}的消息回复`,
              message_content: `谢谢你的喜欢哟，我还没有准备好，期待我们的下一场缘分吧。`,
              message_type: '02'
            }
            esRequest('permessage_active', data).then(res => {
              if (res && res.data.code === 0) {
                Toast.success('发送成功')
              } else {
                Toast.fail('系统错误')
              }
            })
          }
        } else {
          Toast.fail('系统错误')
        }
      })
    }
  }
})