import baseURL from "./baseURL"
import loginRequest from "./sub-unitRequest/loginRequest"
import mineRequest from "./sub-unitRequest/mineRequest"

export default (localObjects, parametersData, parameters) => {
  var globalObjects = Object.assign({}, loginRequest, mineRequest)
  var apiMethod = globalObjects[localObjects].apiMethod
  if (parameters) {
    var requestURL = baseURL.baseURL + globalObjects[localObjects].apiName + '/' + parameters
  } else {
    var requestURL = baseURL.baseURL + globalObjects[localObjects].apiName
  }
  // var tokenme = wx.getStorageSync('token')
  // if (tokenme === undefined) {
  //   wx.showToast({
  //     title: '获取用户登录信息异常',
  //   })
  // }
  return new Promise((resolve, reject) => {
    console.log(apiMethod)
    wx.request({
      // header: {
        // 'token':tokenme
      // },
      method: apiMethod,
      url: requestURL,
      data: parametersData,
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