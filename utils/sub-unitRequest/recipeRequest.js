let recipeRequest = {
  recipe_catalogs: {
    apiMethod: 'GET',
    apiName: '/recipe/recipe_catalogs',
    name: '菜肴分类'
  },
  recipe_list: {
    apiMethod: 'GET',
    apiName: '/recipe/recipe_list',
    name: '菜肴列表'
  },
  recipe_detail: {
    apiMethod: 'GET',
    apiName: '/recipe/recipe_detail',
    name: '菜肴详情'
  },
}
module.exports = recipeRequest