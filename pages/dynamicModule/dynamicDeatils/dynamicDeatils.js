import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    loginShow: false,
    authorId: '',
    dynamicId: '',
    windowWidth: 0,
    windowHeight: 0,
    userInfo: {},
    reviewerInfo: {},
    commentPage: 1,
    commentLimit: 6,
    totalCount: 0,
    dynamicDetails: {},
    commentList: [],
    commentContent: '',
    dialogType: '',
    dialogTitle: '',
    dialogText: '',
    dialogShow: false,
    dialogButtons: [{text: '取消'}, {text: '确定'}],
  },

  onLoad: function (options) {
    this.data.authorId = options.authorId ? options.authorId : ''
    this.data.dynamicId = options.dynamicId ? options.dynamicId : ''
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.getMineInfo()
    this.getDynamicDetails()
    this.getCommentList()
  },

  // 获取作者信息
  getMineInfo: function () {
    let data = {
      id: this.data.authorId
    }
    esRequest('mine_info', data).then (res => {
      if (res && res.data.code === 0) {
        this.setData({
          userInfo: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 获取个人信息
  getReviewerInfo: function () {
    let data = {
      id: wx.getStorageSync('id_key').toString()
    }
    esRequest('mine_info', data).then (res => {
      if (res && res.data.code === 0) {
        wx.setStorageSync('userIfo', res.data.data)
        this.setData({
          reviewerInfo: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 动态详情
  getDynamicDetails: function () {
    let data = {
      id: this.data.dynamicId
    }
    esRequest('dynamic_details', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          dynamicDetails: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

   // 评论列表
  getCommentList: function () {
    let data = {
      page: this.data.commentPage,
      limit: this.data.commentLimit,
      dynamic_id: this.data.dynamicId
    }
    esRequest('comment_list', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          totalCount: res.data.totalCount,
          commentList: this.data.commentList.concat(res.data.data)
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 评论列表触底函数
  onReachBottom: function () {
    if (this.data.totalCount > this.data.commentList.length) {
      this.data.commentPage += 1
      this.getCommentList()
    }
  },

  // 点击关注
  collectionuser: function () {
    if (!wx.getStorageSync('id_key')) {
      this.setData({ loginShow: true })
    } else {
      this.setData({
        dialogType: '01',
        dialogTitle: '关注',
        dialogText: '您确定要关注此用户吗？',
        dialogShow: true
      })
    }
  },

  // 写评论
  commentBlur: function (event) {
    this.setData({
      commentContent: event.detail
    });
  },

  // 发表评论
  writeComment: function () {
    if (this.data.commentContent == '') {
      Toast.fail('评论内容为空')
      return
    }
    if (!wx.getStorageSync('id_key')) {
      this.setData({ loginShow: true })
    } else {
      if (wx.getStorageSync('userIfo')) {
        this.setData({
          reviewerInfo: wx.getStorageSync('userIfo')
        })
      } else {
        this.getReviewerInfo()
      }
      this.setData({
        dialogType: '02',
        dialogTitle: '评论',
        dialogText: '评论通过审核之后才会显示YO',
        dialogShow: true
      })
    }
  },

  // 关注/发表评论确定按钮
  tapDialogButton: function (e) {
    this.setData({
      dialogShow: false
    })
    if (e.detail.index === 0) {
      Toast.success('取消')
    }
    if (e.detail.index === 1) {
      // 关注
      if (this.data.dialogType == '01') {
        let _this = this
        let data = {
          followers_id: wx.getStorageSync('id_key').toString(),
          user_id: _this.data.userInfo.id.toString(),
          user_name: _this.data.userInfo.nickName,
          user_image: _this.data.userInfo.avatarUrl,
          user_info: _this.data.userInfo.personalSignature,
        }
        esRequest('follow_collection', data).then(res => {
          if (res && res.data.code === 0) {
            wx.setStorageSync('tp_key', '05')
            Toast.success('已关注')
          } else {
            Toast.fail('系统错误')
          }
        })
      }
      // 评论
      if (this.data.dialogType == '02') {
        let _this = this
        let data = {
          dynamic_id: _this.data.dynamicId,
          comment_content: _this.data.commentContent,
          reviewer_id: _this.data.reviewerInfo.id,
          reviewer_name: _this.data.reviewerInfo.nickName,
          reviewer_image: _this.data.reviewerInfo.avatarUrl,
        }
        esRequest('write_comment', data).then(res => {
          if (res && res.data.code === 0) {
            _this.setData({
              commentContent: ''
            })
            Toast.success('发表成功')
          } else {
            Toast.fail('系统错误')
          }
        })
      }
    }
  },

  // 评论区作者动态列表
  authorDynamic: function (e) {
    wx.navigateTo({
      url: '/pages/dynamicModule/dynamicList/dynamicList?authorId=' + e.currentTarget.dataset.item.reviewer_id
    })
  },

  // 查看大图或保存图片
  dynamicImg: function () {
    let current = this.data.dynamicDetails.image
    let urls = [this.data.dynamicDetails.image]
    wx.previewImage({
      // 当前显示图片的http链接
      current: current,
      // 需要预览的图片http链接列表
      urls: urls
    })
  },

  // 未登录跳转倒登录界面
  dialogButtontap() {
    wx.navigateTo({
      url: '/pages/loginModule/loginPage/loginPage'
    })
  }
})