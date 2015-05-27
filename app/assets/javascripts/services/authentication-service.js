angular.module('lark.services')

.service('AuthenticationService', ['$http', '$q', '$rootScope', '$cookieStore', '$auth',
  function ($http, $q, $rootScope, $cookieStore, $auth) {
    var authService = {};

    authService.login = function (credentials) {
      console.log("login credentials", credentials)
      return $auth.submitLogin(credentials)
    };

    authService.logout = function () {
      return $auth.signOut()
    };

    authService.isAuthenticated = function () {
      // console.log("Session.active()",Session.active())
    };

    authService.isAuthorized = function (authorizedRoles) {
    };

    return authService;
  }
])