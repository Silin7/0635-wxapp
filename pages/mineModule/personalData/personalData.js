Page({
  data: {
    windowHeight: 0,
    dataForm: {
      nickname: '',
      age: ''
    },
    minDate: new Date(2019, 10, 1).getTime(),
    maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),
  },

  onLoad: function (options) {
  },

  onReady: function () {
    let windowHeight = wx.getSystemInfoSync().windowHeight
    this.setData({ windowHeight: windowHeight })
  },

  onShow: function () {
  },

  onClickLeft() {
    wx.showToast({ title: '点击返回', icon: 'none' });
  },
  onClickRight() {
    wx.showToast({ title: '点击按钮', icon: 'none' });
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
})