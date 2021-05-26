import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id_key: '',
    windowWidth: 0,
    windowHeight: 0,
    page: 1,
    limit: 10,
    totalCount: 0,
    newsTypeList: [],
    cityList: [
      { "id": 100001, "topic_class": "101", "topic_name": "东昌府区"} ,
      { "id": 100002, "topic_class": "102", "topic_name": "阳谷县"} ,
      { "id": 100003, "topic_class": "103", "topic_name": "莘县"} ,
      { "id": 100004, "topic_class": "104", "topic_name": "茌平区"} ,
      { "id": 100005, "topic_class": "105", "topic_name": "东阿县"} ,
      { "id": 100006, "topic_class": "106", "topic_name": "冠县"} ,
      { "id": 100007, "topic_class": "107", "topic_name": "高唐县"} ,
      { "id": 100008, "topic_class": "108", "topic_name": "临清市"} ,
      { "id": "", "type_id": "", "topic_name": ""} ,
    ],
    topicClass: [],
  },

  onLoad: function (options) {
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.getTopicClass()
  },

  // 同城动态列表
  getTopicClass: function () {
    let data = {
      page: 1,
      limit: 10,
      state: '02'
    }
    esRequest('topic_class', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          topicClass: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },
  
  // 话题列表
  goTopicList: function (e) {
    wx.navigateTo({
      url: '/pages/topicModule/topicList/topicList?id=' + e.currentTarget.dataset.item.id + '&topic_class=' + e.currentTarget.dataset.item.topic_class
    })
  }
})