let locationRequest = {
  location_work_add: {
    apiMethod: 'POST',
    apiName: '/location_work/work_add',
    name: '新增岗位'
  },
  location_work_list: {
    apiMethod: 'GET',
    apiName: '/location_work/work_list',
    name: '同城招聘列表'
  },
  location_work_details: {
    apiMethod: 'GET',
    apiName: '/location_work/work_details',
    name: '同城招聘详情'
  },
  location_room_add: {
    apiMethod: 'POST',
    apiName: '/location_work/room_add',
    name: '新增房屋'
  },
  location_room_list: {
    apiMethod: 'GET',
    apiName: '/location_work/room_list',
    name: '同城招租列表'
  },
  location_room_details: {
    apiMethod: 'GET',
    apiName: '/location_work/room_details',
    name: '同城招租详情'
  },
}

module.exports = locationRequest