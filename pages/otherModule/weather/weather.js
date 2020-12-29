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
  },

  onLoad: function (options) {
    _self=this;
    this.cWidth = wx.getSystemInfoSync().windowWidth;
    this.cHeight = 500 / 750 * wx.getSystemInfoSync().windowWidth;
    this.getServerData()
  },

  onReady: function () {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  onShow: function () {
    this.weatherCurrent()
    this.weatherForecast()
  },

  // 配置图标基本信息
  showColumn(canvasId, chartData) {
    canvaColumn = new uCharts({
      $this: _self,
      canvasId: canvasId,
      // padding: [15,15,4,15],
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
        // disableGrid: true,
        // showTitle: true,
        // data: {
        //   axisLineColor: '#4545FF',
        //   title: '℃'
        // }
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
  showColumn2(canvasId, chartData) {
    canvaColumn = new uCharts({
      $this: _self,
      canvasId: canvasId,
      // padding: [15,15,4,15],
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
        // disableGrid: true,
        // showTitle: true,
        // data: {
        //   axisLineColor: '#4545FF',
        //   title: '℃'
        // }
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

  // 填充图标数据
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
    wx.request({
      url: 'https://www.ucharts.cn/data.json',
      data: {
      },
      success: function (res) {
        let Column = { categories: [], series: [] };
        Column.categories = res.data.data.ColumnB.categories;
        Column.series = res.data.data.ColumnB.series;
        //自定义标签颜色和字体大小
        Column.series[1].textColor = 'red';
        Column.series[1].textSize = 11;
        _self.showColumn2("canvasColumn2", Column);
      },
      fail: () => {
        console.log("请点击右上角【详情】，启用不校验合法域名");
      },
    })
  },
  
  // 获取特定城市今日天气信息
  weatherCurrent: function () {
    let data = {
      position: this.data.position
    }
    esRequest('weather_current', data).then(res => {
      if (res && res.data.code == 1) {
        console.log(res)
      } else {
        Toast.fail('系统错误')
      }
    })
  },

  // 获取特定城市今天及未来天气信息
  weatherForecast: function () {
    let data = {
      position: this.data.position
    }
    esRequest('weather_forecast', data).then(res => {
      if (res && res.data.code == 1) {
        console.log(res)
      } else {
        Toast.fail('系统错误')
      }
    })
  }
})

// address 	字符串 	城市具体信息，比如 “广东省 深圳市”
// cityCode 	字符串 	城市code
// temp 	字符串 	温度值
// weather 	字符串 	天气描述，具体描述请查看附件，天气描述清单
// windDirection 	字符串 	风向描述，具体描述请查看附件，风向表清单
// windPower 	字符串 	风力描述，具体描述请查看附件，风力表清单
// humidity 	字符串 	湿度值
// reportTime 	字符串 	此次天气发布时间