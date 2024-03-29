import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    scenicspotList: [],
    mineScenicspotList: []
  },

  onShow: function () {
    if (wx.getStorageSync('tp_key') === '03') {
      wx.setStorageSync('tp_key', '01')
      this.waitScenicSpot()
    }
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
      esRequest('mine_scenicspot_list').then (res => {
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