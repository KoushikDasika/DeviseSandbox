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

angular.module("lark.pages", ["ui.bootstrap"]);
angular.module("lark.services", []);

require("./pages");
require("./services");

angular.module('deviseSandbox', [
  'lark.pages',
  'lark.services',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ngRoute',
  "ui.bootstrap"
])
.config(['$routeProvider','$httpProvider', function ($routeProvider, $httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common["X-Requested-With"];

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
  })
}])
