import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';

Page({
  data: {
    id_key: '',
    user_id: '',
    windowWidth: 0,
    windowHeight: 0,
    swiperList: [],
    personDetails: {},
    userInfo: {}
  },

  onLoad: function (options) {
    this.data.id_key = wx.getStorageSync('id_key').toString()
    this.data.user_id = options.user_id ? options.user_id : ''
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.marryDetails()
    this.userInfo()
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
      user_id: this.data.user_id
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
  userInfo: function () {
    let data = {
      id: this.data.id_key
    }
    esRequest('mine_info',data).then(res => {
      if (res && res.data.code === 0) {
        this.data.userInfo = res.data.data
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 关注Ta
  btnGz: function () {
    let _this = this
    Dialog.confirm({
      title: '关注',
      message: '您确定要关注Ta吗？',
    }).then(() => {
      let data = {
        followers_id: _this.data.id_key,
        watched_id: _this.data.personDetails.user_id,
        nick_name: _this.data.personDetails.nick_name,
        photo: _this.data.personDetails.photo1,
        introduce: _this.data.personDetails.introduce
      }
      esRequest('follow_users', data).then(res => {
        if (res && res.data.code === 0) {
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
    }).catch(() => {
      Toast.success('取消')
    });
    
  },

  // 要微信 / 求约会
  btnWY: function (e) {
    // 要微信
    if (e.currentTarget.dataset.type === '01') {
      Dialog.confirm({
        title: '要微信',
        message: '您确定要Ta的微信嘛？',
      }).then(() => {
        let message_title = ''
        let message_content = ''
        if (this.data.personDetails.gender === '男') {
          message_title = '小哥哥，可以给个微信吗？'
          message_content = `你好，能给我你的微信吗？我被你的颜值所打动，在我心里你一定是个乐观开朗的男孩子。但我不能自己妄加推断，所以想了解一下你真正的性格。`
        }
        if (this.data.personDetails.gender === '女') {
          message_title = '小姐姐，可以给个微信吗？'
          message_content = `你好，能给我你的微信吗？我被你的颜值所打动，在我心里你一定是个善良温柔的女孩子。但我不能自己妄加推断，所以想了解一下你真正的性格。`
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
      }).catch(() => {
        Toast.success('取消')
      });
    }
    // 求约会
    if (e.currentTarget.dataset.type === '02') {
      Dialog.confirm({
        title: '求约会',
        message: '您确定和Ta的约会嘛？',
      }).then(() => {
        let message_title = ''
        let message_content = ''
        if (this.data.personDetails.gender === '男') {
          message_title = '小哥哥，可以约你出去浪吗？'
          message_content = `你好，能给我你的微信吗？我被你的颜值所打动，在我心里你一定是个乐观开朗的男孩子。但我不能自己妄加推断，所以想了解一下你真正的性格。`
        }
        if (this.data.personDetails.gender === '女') {
          message_title = '小姐姐，可以约你出去浪吗？'
          message_content = `你好，能给我你的微信吗？我被你的颜值所打动，在我心里你一定是个善良温柔的女孩子。但我不能自己妄加推断，所以想了解一下你真正的性格。`
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
      }).catch(() => {
        Toast.success('取消')
      });
    }
  }
})