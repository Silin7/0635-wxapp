import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';

Page({
  data: {
    id_key: '',
    isLoading: false,
    pageIndex: 0,
    windowWidth: 0,
    windowHeight: 0,
    followPerson: []
  },

  onLoad: function (options) {
    this.data.id_key = wx.getStorageSync('id_key')
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },
  
  onShow: function () {
    this.concernsList()
  },

  changeTabs(event) {
    this.setData({
      pageIndex: event.detail.index
    })
  },

  // 我关注的人
  concernsList: function () {
    let data = {
      followers_id: this.data.id_key
    }
    esRequest('concerns_list', data).then(res => {
      if (res && res.data.code === 0) {
        this.setData({
          followPerson: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 取消关注此用户
  cancelFollow: function (e) {
    Dialog.confirm({
      title: '取消关注',
      message: '您确定不再关注Ta了吗？',
    }).then(() => {
      let data = {
        followers_id: e.currentTarget.dataset.item.followers_id,
        watched_id: e.currentTarget.dataset.item.watched_id
      }
      esRequest('cancel_users', data).then(res => {
        if (res && res.data.code === 0) {
          Toast.success('操作成功')
          this.concernsList()
        } else {
          Toast.fail('系统错误')
        }
      })
    }).catch(() => {
      Toast.success('取消')
    });
  }
})