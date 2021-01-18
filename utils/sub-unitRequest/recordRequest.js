let recordRequest = {
  record_diary: {
    apiMethod: 'GET',
    apiName: '/record/record_diary',
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
  delete_diary: {
    apiMethod: 'GET',
    apiName: '/record/delete_diary',
    name: '删除日记（id）'
  },
}
module.exports = recordRequest