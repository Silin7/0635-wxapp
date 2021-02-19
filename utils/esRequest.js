import baseURL from "./baseURL"
import classificationRequest from "./sub-unitRequest/classificationRequest"
import dynamicRequest from "./sub-unitRequest/dynamicRequest"
import happyRequest from "./sub-unitRequest/happyRequest"
import historyRequest from "./sub-unitRequest/historyRequest"
import loginRequest from "./sub-unitRequest/loginRequest"
import marryRequest from "./sub-unitRequest/marryRequest"
import messageRequest from "./sub-unitRequest/messageRequest"
import mineRequest from "./sub-unitRequest/mineRequest"
import otherRequest from "./sub-unitRequest/otherRequest"
import pictureRequest from "./sub-unitRequest/pictureRequest"
import recipeRequest from "./sub-unitRequest/recipeRequest"
import recordRequest from "./sub-unitRequest/recordRequest"
import scenicspotRequest from "./sub-unitRequest/scenicspotRequest"
import specialtyRequest from "./sub-unitRequest/specialtyRequest"

export default (localObjects, parametersData, parameters) => {
  var globalObjects = Object.assign({}, classificationRequest, dynamicRequest, happyRequest, historyRequest, loginRequest, marryRequest, messageRequest, mineRequest, otherRequest, pictureRequest, recipeRequest, recordRequest, scenicspotRequest, specialtyRequest)
  var apiMethod = globalObjects[localObjects].apiMethod
  if (parameters) {
    var requestURL = baseURL.baseURL + globalObjects[localObjects].apiName + '/' + parameters
  } else {
    var requestURL = baseURL.baseURL + globalObjects[localObjects].apiName
  }
  return new Promise((resolve, reject) => {
    wx.request({
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