import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    isShow: false,
    dropTitle1: '全部地区',
    basic_area: '',
    dropTitle2: '工作分类',
    basic_type: '',
    dropTitle3: '薪资水平',
    basic_salary: '',
    workNo: false,
    workPage: '1',
    workLimit: '10',
    totalCount: 0,
    workList: []
  },

  onLoad: function (options) {
    this.getworkList()
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  // 全部地区
  dropTap1: function (e) {
    this.setData({
      isShow: false,
      workList: [],
      basic_area: e.currentTarget.dataset.id,
      dropTitle1: e.currentTarget.dataset.title
    })
    this.selectComponent('#item1').toggle('false');
    this.getworkList()
  },

  // 各种分类
  dropTap2: function (e) {
    this.setData({
      isShow: false,
      workList: [],
      basic_type: e.currentTarget.dataset.id,
      dropTitle2: e.currentTarget.dataset.title
    })
    this.selectComponent('#item2').toggle(false);
    this.getworkList()
  },

  // 信子水平
  dropTap3: function (e) {
    this.setData({
      isShow: false,
      workList: [],
      basic_salary: e.currentTarget.dataset.id,
      dropTitle3: e.currentTarget.dataset.title
    })
    this.selectComponent('#item3').toggle(false);
    this.getworkList()
  },

  // 线下活动列表
  getworkList: function () {
    let data = {
      page: this.data.workPage,
      limit: this.data.workLimit,
      basic_area: this.data.basic_area,
      basic_type: this.data.basic_type,
      basic_salary: this.data.basic_salary
    }
    esRequest('location_work_list', data).then(res => {
      if (res && res.data.code === 0) {
        if (res.data.totalCount == 0) {
          this.setData({ workNo: true })
        } else {
          this.setData({ workNo: false })
        }
        this.setData({
          isShow: true,
          totalCount: res.data.totalCount,
          workList: this.data.workList.concat(res.data.data)
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 线下活动触底函数
  onScrollBottom: function () {
    if (this.data.totalCount > this.data.workList.length) {
      this.data.workPage += 1
      this.getworkList()
    }
  },

  // 线下活动详情
  workDetails: function (e) {
    wx.navigateTo({
      url: '/pages/locationModule/workDetails/workDetails?id=' + e.currentTarget.dataset.item.id
    })
  },

  // 新增工作岗位
  goAddPage: function () {
    wx.navigateTo({
      url: '/pages/locationModule/workAdd/workAdd',
    })
  },

})