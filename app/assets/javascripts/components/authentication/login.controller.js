angular.module('lark.components')
.controller('loginController', ['$scope', '$rootScope', '$modalInstance', 'AuthenticationService', 'UserService',
  function($scope, $rootScope, $modalInstance, AuthenticationService, UserService){
    $scope.credentials = {
      email: $scope.email,
      password: $scope.password
    };

    console.log("login.directive",$scope);

    $scope.login = function (credentials) {
      var submitButton = $('.login-form .submit-button .button-text');
      var originalButtonText = submitButton.text();

      if ($scope.loginForm.$valid) {
        submitButton.text("Logging in...");
        AuthenticationService.login(credentials).then(function (user) {
          UserService.setCurrentUser(user.data);
          $modalInstance.close();
        }, function () {
          $scope.messages = [['alert','Sorry, we could not log you in with the email and password provided.']]
        }).then(function(){
          submitButton.text(originalButtonText);
          $scope.credentials.updating = false;
        });
      }
    };
  }
]);