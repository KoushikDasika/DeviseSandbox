angular.module('lark.services')

.service('UserService', ['$http', '$q', '$rootScope', 'ENDPOINTS', '$cookieStore',
  function ($http, $q, $rootScope, ENDPOINTS, $cookieStore) {
    var userService = {};
    return userService;
  }
])

