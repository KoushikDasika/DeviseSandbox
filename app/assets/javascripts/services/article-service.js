angular.module('lark.services')

.service('ArticleService', ['$http', '$q', '$rootScope', 'ENDPOINTS', '$cookieStore',
  function ($http, $q, $rootScope, ENDPOINTS, $cookieStore) {
    var articleService = {};
    return articleService;
  }
])