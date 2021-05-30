import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    topicId: '',
    topicDetails: {}
  },

  onLoad: function (options) {
    this.data.topicId = options.topicId ? options.topicId : '100001'
    this.getTopicDetails()
  },

  onShow() {
  },

  // 新闻详情
  getTopicDetails: function () {
    let data = {
      id: this.data.topicId
    }
    esRequest('topic_list_details', data).then(res => {
      if (res && res.data.code == 0) {
        this.setData({
          topicDetails: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  }

})