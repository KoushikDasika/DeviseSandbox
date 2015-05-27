angular.module('lark.components')

.directive('navBar', ['$rootScope', '$document', '$modal', '$log', 'UserService', 'AuthenticationService',
  function($rootScope, $document, $modal, $log, UserService, AuthenticationService){

  return {
    templateUrl: '/assets/components/navbar/navbar.directive.html',
    restrict: 'E',
    replace: false,
    require: '?ngModel',
    scope: {},
    link: function ($scope, $element, $attrs, ngModel) {
      UserService.getCurrentUser().then(function(user) {
        $scope.currentUser = user;
      });

      $scope.openLoginModal = function() {
        var modalInstance = $modal.open({
          templateUrl: '/assets/components/authentication/login-form.directive.html',
          controller: 'loginController',
          backdrop: 'true'
        });

        modalInstance.result.then(function (selectedItem) {
          UserService.getCurrentUser().then(function(user) {
            $scope.currentUser = user;
          });
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };

      $scope.userLogout = function() {
        AuthenticationService.logout().then(function () {
          $scope.currentUser = null;
        });
      };
    }
  }
}]);