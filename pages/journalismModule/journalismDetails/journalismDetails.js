import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    journalismId: '',
    journalismDetails: {}
  },

  onLoad: function (options) {
    this.data.journalismId = options.id ? options.id : ''
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
        res.data.data.journalism_info = res.data.data.journalism_info.toString().replace(/\<img/gi, '<img style="max-width:100%; height:auto"')
        this.setData({
          journalismDetails: res.data.data
        })
      } else {
        Toast.fail('系统错误')
      }
    })
  }

})