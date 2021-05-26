import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    page: 1,
    limit: 10,
    totalCount: 0,
    topicId: '',
    topicClass: '',
    topicDetails: {},
    topicList: []
  },

  onLoad: function (options) {
    this.data.topicId = options.id ? options.id : ''
    this.data.topicClass = options.topic_class ? options.topic_class : ''
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },
  
  onShow: function () {
    this.getTopicClassDetails()
    this.getTopicList()
  },
  
  // 话题分类详情
  getTopicClassDetails: function () {
    let data = {
      id: this.data.topicId
    }
    esRequest('topic_class_details', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          topicDetails: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },
  
  // 话题列表
  getTopicList: function () {
    let data = {
      page: this.data.page,
      limit: this.data.limit,
      topic_class: this.data.topicClass
    }
    esRequest('topic_list', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          totalCount: res.data.totalCount,
          topicList: this.data.topicList.concat(res.data.data)
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 触底函数
  onScrollBottom: function () {
    if (this.data.totalCount > this.data.topicList.length) {
      this.data.page += 1
      this.getTopicList()
    }
  }
})