import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    id_key: '',
    windowWidth: 0,
    windowHeight: 0,
    scenicspotList: [],
    mineScenicspotList: []
  },

  onLoad: function (options) {
    this.setData({
      id_key: wx.getStorageSync('id_key').toString()
    })
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.waitScenicSpot()
  },

  async waitScenicSpot() {
    await this.getScenicSpot()
    await this.mineScenicspotList()
    this.data.mineScenicspotList.forEach(item1 => {
      this.data.scenicspotList.forEach(item2 => {
        if (item1.scenicspot_id == item2.id) {
          item2.isMine = true
        }
      });
    })
    this.setData({
      scenicspotList: this.data.scenicspotList
    })
  },

  // 景点列表
  getScenicSpot: function () {
    return new Promise (async (resolve, reject) => {
      let data = {
      page: 1,
      limit: 100,
      scenicspot_position: ''
      }
      esRequest('scenicspot_list', data).then(res => {
        if (res && res.data.code === 0) {
          this.setData({
            scenicspotList: res.data.data
          })
        } else {
          Toast.fail('系统错误')
        }
        resolve()
      })
    })
  },

  // 足迹列表
  mineScenicspotList: function () {
    return new Promise (async (resolve, reject) => {
      let data = {
        followers_id: this.data.id_key
      }
      esRequest('mine_scenicspot_list', data).then (res => {
        if (res && res.data.code === 0) {
          this.setData({
            mineScenicspotList: res.data.data
          })
        } else {
          Toast.fail('系统错误')
        }
        resolve()
      })
    })
  },

  // 景点详情
  scenicDetails: function (e) {
    wx.navigateTo({
      url: '/pages/scenicModule/scenicDetails/scenicDetails?id=' + e.currentTarget.dataset.item.id
    })
  }
})