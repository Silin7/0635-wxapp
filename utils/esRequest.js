import baseURL from "./baseURL"
import loginRequest from "./sub-unitRequest/loginRequest"

export default ( methodme, urlme, datame, id, id2 ) => {
  let globalNameObj = Object.assign({}, loginRequest)
  var url = ''
  if (id2 && id) {
    url = baseURL.baseURL + globalNameObj[urlme].apiName + '/' + id + '/' + id2
  } else if (id) {
    url = baseURL.baseURL + globalNameObj[urlme].apiName + '/' + id
  } else {
    url = baseURL.baseURL + globalNameObj[urlme].apiName
  }
  // const tokenme = wx.getStorageSync('token')
  // if (tokenme === undefined) {
  //   wx.showToast({
  //     title: '获取用户登录信息异常',
  //   })
  // }
  return new Promise((resolve, reject) => {
    wx.request({
      header: {
        // 'token':tokenme
      },
      method: methodme,
      url: url,
      data: datame,
      success(res) {
        resolve(res)
      },
      fail(err) {
        console.warn('fail' + JSON.stringify(err))
        reject(err)
      }
    })
  })
}