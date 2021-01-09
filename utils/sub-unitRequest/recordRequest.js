let recordRequest = {
  diary_list: {
    apiMethod: 'GET',
    apiName: '/record/diary_list',
    name: '日记列表（user_id）'
  },
  diary_detail: {
    apiMethod: 'GET',
    apiName: '/record/diary_details',
    name: '日记详情（id）'
  },
  keep_diary: {
    apiMethod: 'POST',
    apiName: '/record/keep_diary',
    name: '写日记（diary_date, diary_weather, diary_content）'
  },
}
module.exports = recordRequest