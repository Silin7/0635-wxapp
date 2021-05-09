import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    topicId: '',
    topicClass: '',
    topicDetails: {}
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
  },
  
  // 同城动态列表
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
})