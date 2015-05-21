angular.module('lark.services')

.service('AuthenticationService', ['$http', '$q', '$rootScope', '$cookieStore',
  function ($http, $q, $rootScope, $cookieStore) {
    var authService = {};

    authService.login = function (credentials) {
      return $http.post('http://localhost:3000/users/sign_in', { 'user': credentials })
      .success(function (res) {
        console.log("res", res);
        return res;
      })
      .error(function(data, status, headers, config) {
        console.log("data", data)
        console.log("status", status)
        console.log("headers", headers)
        console.log("config", config)
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    };

    authService.logout = function () {
      return $http.delete('http://localhost:3000/users/sign_out').success(function(data, status, headers, config) {
        return data;
      });
    };

    authService.isAuthenticated = function () {
      // console.log("Session.active()",Session.active())
    };

    authService.isAuthorized = function (authorizedRoles) {
    };

    return authService;
  }
])