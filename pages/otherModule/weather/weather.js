import esRequest from '../../../utils/esRequest';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
import uCharts from '../../../utils/u-charts.min'

var _self;
var canvaColumn = null;

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0,
    position: '聊城市',
    cWidth: '',
    cHeight: '',
    maxData: '',
    minData: '',
    weatherImg: '',
    current: {},
    forecasts: {},
  },

  onLoad: function (options) {
    _self=this;
    this.cWidth = wx.getSystemInfoSync().windowWidth;
    this.cHeight = 500 / 750 * wx.getSystemInfoSync().windowWidth;
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.weatherCurrent()
    this.waitForecast()
  },

  async waitForecast () {
    await this.weatherForecast()
    this.getServerData()
  },

  // 获取特定城市今日天气信息
  weatherCurrent: function () {
    let data = {
      position: this.data.position
    }
    esRequest('weather_current', data).then(res => {
      if (res && res.data.code == 1) {
        this.setData({
          current: res.data.data
        })
        let array = res.data.data.weather.split('')
        for (let i = 0; i < array.length; i++) {
          if (array[i] == '转') {
            this.setData({
              weatherImg: '/images/otherMoudle/weather_zhuan.png'
            })
            continue;
          }
          if (array[i] == '晴') {
            this.setData({
              weatherImg: '/images/otherMoudle/weather_qing.png'
            })
            continue;
          }
          if (array[i] == '阴') {
            this.setData({
              weatherImg: '/images/otherMoudle/weather_yin.png'
            })
            continue;
          }
          if (array[i] == '雾') {
            this.setData({
              weatherImg: '/images/otherMoudle/weather_wu.png'
            })
            continue;
          }
          if (array[i] == '雨') {
            this.setData({
              weatherImg: '/images/otherMoudle/weather_yu.png'
            })
            continue;
          }
          if (array[i] == '雪') {
            this.setData({
              weatherImg: '/images/otherMoudle/weather_xue.png'
            })
            continue;
          }
          if (array[i] == '云') {
            this.setData({
              weatherImg: '/images/otherMoudle/weather_yun.png'
            })
            continue;
          }
        }
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 获取特定城市今天及未来天气信息
  weatherForecast: function () {
    let _this = this
    let data = {
      position: this.data.position
    }
    return new Promise (async (resolve, reject) => {
      esRequest('weather_forecast', data).then(res => {
        if (res && res.data.code == 1) {
          this.setData({
            forecasts: res.data.data
          })
          let dayTemp = []
          let nightTemp = []
          res.data.data.forecasts.forEach(item => {
            let dayTemp2 = item.dayTemp.split('')
            dayTemp2.pop()
            dayTemp.push(Number(dayTemp2.join('')))
            let nightTemp2 = item.nightTemp.split('')
            nightTemp2.pop()
            nightTemp.push(Number(nightTemp2.join('')))
          })
          _this.data.maxData = Math.max(...dayTemp)
          _this.data.minData = Math.min(...nightTemp)
          this.setData({
            maxData: Math.max(...dayTemp) + 1,
            minData: Math.min(...nightTemp) - 1
          })
        } else {
          Toast.fail('系统错误')
        }
        resolve()
      })
    })
  },

  // 图标信息
  getServerData: function () {
    let data = {
      position: this.data.position
    }
    esRequest('weather_forecast', data).then(res => {
      if (res && res.data.code == 1) {
        let Column = { categories: [], series: [] };
        let date = []
        let dayTemp = []
        let nightTemp = []
        let temperature = []
        res.data.data.forecasts.forEach(item => {
          let date2 = item.date.split('-')
          date2.shift()
          date.push(date2.join('-'))
          let dayTemp2 = item.dayTemp.split('')
          dayTemp2.pop()
          dayTemp.push(dayTemp2.join(''))
          let nightTemp2 = item.nightTemp.split('')
          nightTemp2.pop()
          nightTemp.push(nightTemp2.join(''))
        })
        // #9A93F3, #D58BBC
        temperature = [{
          name: '最高温度',
          data: dayTemp,
          color: '#9A93F3',
          textColor: '',
          textSize: '',
        },{
          name: '最低温度',
          data: nightTemp,
          color: '#D58BBC',
          textColor: '',
          textSize: ''
        }]
        console.log('temperature', JSON.stringify(temperature))
        Column.categories = date;
        Column.series = temperature;
        _self.showColumn("canvasColumn", Column);
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 绘图
  showColumn(canvasId, chartData) {
    canvaColumn = new uCharts({
      $this: _self,
      canvasId: canvasId,
      padding: [20, 10, 5, 10],
      type: 'area',
      legend: true,
      fontSize: 11,
      background: '#FFFFFF',
      pixelRatio: 1,
      animation: true,
      categories: chartData.categories,
      series: chartData.series,
      xAxis: {
        disableGrid: true,
        // gridColor: '#4545FF',
        data: {
          axisLineColor: '#4545FF'
        }
      },
      yAxis: {
        gridType: 'dash',
        format: (val) => { return val.toFixed(1) + '℃' },
        max: this.data.maxData,
        min: this.data.minData,
      },
      dataLabel: true,
      width: _self.cWidth ,
      height: _self.cHeight ,
      extra: {
        column: {
          type: 'group',
          width: _self.cWidth * 0.45 / chartData.categories.length
        }
      }
    });
  },

  // 切换城市
  dropChange: function (e) {
    console.log(e)
  }
})

