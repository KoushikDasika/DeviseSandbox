angular.module('lark.services')

.service('UserService', ['$http', '$q', '$rootScope', '$cookieStore',
  function ($http, $q, $rootScope, $cookieStore) {
    var userService = {};

    userService.getUsers = function() {
      var deferred = $q.defer();
      $http.get("http://localhost:3000/users").then(function (data){
        console.log("users are ", data.data)
        deferred.resolve(data.data);
      });

      return deferred.promise;
    }

    return userService;
  }
])

