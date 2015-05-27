angular.module('lark.services')

.service('UserService', ['$http', '$q', '$rootScope', '$auth',
  function ($http, $q, $rootScope, $auth) {
    var userService = {};

    userService.getUsers = function() {
      var deferred = $q.defer();
      $http.get("http://localhost:3000/users").then(function (data){
        deferred.resolve(data.data);
      });

      return deferred.promise;
    }

    userService.getCurrentUser = function() {
      var deferred = $q.defer();
      $auth.validateUser().then(function(valid_token){
        deferred.resolve(valid_token)
      })

      return deferred.promise;
    }

    userService.setCurrentUser = function(user) {
      console.log("setting current user", user)
    }

    return userService;
  }
])

