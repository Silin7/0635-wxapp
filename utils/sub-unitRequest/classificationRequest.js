let classificationRequest = {
  classification_news: {
    apiMethod: 'GET',
    apiName: '/classification/classification_news',
    name: '新闻类型列表'
  },
  classification_city: {
    apiMethod: 'GET',
    apiName: '/classification/classification_city',
    name: '县市类型列表'
  },
}
module.exports = classificationRequest