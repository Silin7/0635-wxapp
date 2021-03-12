import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    scenicActive: 0,
    cityList: [
      {"id":"","type_id":"","type_name":"全部"},
      {"id":1,"type_id":1001,"type_name":"东昌府区"},
      {"id":2,"type_id":1002,"type_name":"阳谷县"},
      {"id":3,"type_id":1003,"type_name":"莘县"},
      {"id":4,"type_id":1004,"type_name":"茌平区"},
      {"id":5,"type_id":1005,"type_name":"东阿县"},
      {"id":6,"type_id":1006,"type_name":"冠县"},
      {"id":7,"type_id":1007,"type_name":"高唐县"},
      {"id":8,"type_id":1008,"type_name":"临清市"}
    ],
    scenicspotPage: 1,
    scenicspotLimit: 10,
    totalCount: 0,
    scenicspotPosition: '',
    scenicspotList: []
  },

  onLoad: function () {
    this.getScenicSpot()
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  // 切换Tabs
  scenicChange: function (e) {
    this.data.scenicspotPage = 1
    this.data.scenicspotList = []
    this.data.scenicspotPosition = e.detail.title
    this.getScenicSpot()
  },

  // 景点列表
  getScenicSpot: function () {
    if (this.data.scenicspotPosition === '全部') {
      this.data.scenicspotPosition = ''
    }
    let data = {
      page: this.data.scenicspotPage,
      limit: this.data.scenicspotLimit,
      scenicspot_position: this.data.scenicspotPosition
    }
    esRequest('scenicspot_list', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          totalCount: res.data.totalCount,
          scenicspotList: this.data.scenicspotList.concat(res.data.data)
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 景点详情
  scenicDetails: function (e) {
    wx.navigateTo({
      url: '/pages/scenicModule/scenicDetails/scenicDetails?id=' + e.currentTarget.dataset.item.id
    })
  },
  
  // 触底函数
  onScrollBottom: function () {
    if (this.data.totalCount > this.data.scenicspotList.length) {
      this.data.scenicspotPage += 1
      this.getScenicSpot()
    }
  }
})