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
      $scope.currentUser = UserService.getCurrentUser();

      $scope.openLoginModal = function() {
        var modalInstance = $modal.open({
          templateUrl: '/assets/components/authentication/login-form.directive.html',
          controller: 'loginController',
          backdrop: 'true'
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.currentUser = UserService.getCurrentUser();
            console.log("closing modal", $scope)
          }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };

      $scope.userLogout = function() {
        console.log("loggging out");
        AuthenticationService.logout().then(function () {
          $rootScope.$broadcast(EVENTS.AUTH.logoutSuccess);
          UserService.destroyCurrentUser(user);
          $scope.currentUser = null;
        }, function () {
          $rootScope.$broadcast(EVENTS.AUTH.logoutFailed);
        });
      };

      $scope.userSignedIn = function() {
        return $scope.currentUser;
      };
    }
  }
}]);