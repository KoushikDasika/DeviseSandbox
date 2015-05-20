angular.module('lark.pages')

.controller('UserController', ['$scope', '$routeParams', 'ArticleService',
  function ($scope, $routeParams, ArticleService) {
    $scope.user_id = $routeParams.user_id
    $scope.articles = []

    ArticleService.getArticles($scope.user_id).then(function(articles) {
      $scope.articles = articles;
    })
  }
])
