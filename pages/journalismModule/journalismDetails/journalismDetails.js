import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    journalismId: '',
    journalismDetails: {}
  },

  onLoad: function (options) {
    this.data.journalismId = options.journalismId ? options.journalismId : '100001'
    this.getJournalismDetails()
  },

  onShow() {
  },

  // 新闻详情
  getJournalismDetails: function () {
    let data = {
      id: this.data.journalismId
    }
    esRequest('journalism_details', data).then(res => {
      if (res && res.data.code == 0) {
        this.setData({
          journalismDetails: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  }

})