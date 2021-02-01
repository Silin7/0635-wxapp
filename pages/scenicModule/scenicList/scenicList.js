import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    scenicActive: 0,
    cityList: [],
    scenicspotPage: 1,
    scenicspotLimit: 10,
    totalCount: 0,
    scenicspotPosition: '',
    scenicspotList: []
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.getCityList()
    this.getScenicSpot()
  },

  // 切换Tabs
  scenicChange: function (e) {
    this.data.scenicspotPage = 1
    this.data.scenicspotList = []
    this.data.scenicspotPosition = e.detail.title
    this.getScenicSpot()
    // wx.pageScrollTo({
    //   scrollTop: 0
    // })
  },

  // 县市列表
  getCityList: function () {
    esRequest('admin_city_type').then(res => {
      if (res && res.data.code === 0) {
        this.data.cityList = res.data.data
        this.data.cityList.unshift({ id: '', type_id: '', type_name: '全部' })
        this.setData({
          cityList: this.data.cityList
        })
      } else {
        Toast.fail('系统错误')
      }
    })
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