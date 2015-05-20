angular.module('lark.pages')

.controller('HomeController', ['$scope', 'UserService', function ($scope, UserService) {
  $scope.users = []

  UserService.getUsers().then(function(response) {
    $scope.users = response;
  });
}])
