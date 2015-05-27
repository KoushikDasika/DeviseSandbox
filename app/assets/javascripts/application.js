var $ = require("jquery");
global.$ = $;
global.jQuery = $;

require('angular');
require('angular-animate');
require('angular-cookies');
require('angular-resource');
require('angular-route');
require('angular-sanitize');

require('../../../bower_components/angular-bootstrap/ui-bootstrap-tpls.min');
require('../../../bower_components/ng-token-auth/dist/ng-token-auth.min');
require('../../../bower_components/angular-cookie/angular-cookie.min');

angular.module("lark.components", ["ui.bootstrap"]);
angular.module("lark.pages", ["ui.bootstrap"]);
angular.module("lark.services", []);

require("./components");
require("./pages");
require("./services");

angular.module('deviseSandbox', [
  'ipCookie',
  'lark.components',
  'lark.pages',
  'lark.services',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ngRoute',
  'ng-token-auth',
  "ui.bootstrap"
])
.config(['$routeProvider','$httpProvider', '$authProvider', function ($routeProvider, $httpProvider, $authProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common["X-Requested-With"];
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')

  $routeProvider.when('/', {
    templateUrl: '/assets/pages/home/home.html',
    controller: 'HomeController'
  })
  .when('/users/:user_id/articles', {
    templateUrl: '/assets/pages/users/users.html',
    controller: 'UserController'
  })
  .when('/users/:user_id/articles/:article_id', {
    templateUrl: '/assets/pages/articles/articles.html',
    controller: 'ArticleController'
  });

  $authProvider.configure({
    apiUrl:                  'http://localhost:3000',
    emailSignInPath:         '/auth/sign_in'
  })


}])
