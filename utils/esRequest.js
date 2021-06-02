import baseURL from "./baseURL"
import appointmentRequest from "./sub-unitRequest/appointmentRequest"
import dynamicRequest from "./sub-unitRequest/dynamicRequest"
import happyRequest from "./sub-unitRequest/happyRequest"
import historyRequest from "./sub-unitRequest/historyRequest"
import journalismRequest from "./sub-unitRequest/journalismRequest"
import locationRequest from "./sub-unitRequest/locationRequest"
import loginRequest from "./sub-unitRequest/loginRequest"
import marryRequest from "./sub-unitRequest/marryRequest"
import messageRequest from "./sub-unitRequest/messageRequest"
import mineRequest from "./sub-unitRequest/mineRequest"
import otherRequest from "./sub-unitRequest/otherRequest"
import pictureRequest from "./sub-unitRequest/pictureRequest"
import recipeRequest from "./sub-unitRequest/recipeRequest"
import scenicspotRequest from "./sub-unitRequest/scenicspotRequest"
import specialtyRequest from "./sub-unitRequest/specialtyRequest"
import topicRequest from "./sub-unitRequest/topicRequest"

export default (localObjects, parametersData, parameters) => {
  var globalObjects = Object.assign({}, appointmentRequest, dynamicRequest, happyRequest, historyRequest, journalismRequest, locationRequest, loginRequest, marryRequest, messageRequest, mineRequest, otherRequest, pictureRequest, recipeRequest, scenicspotRequest, specialtyRequest, topicRequest)
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