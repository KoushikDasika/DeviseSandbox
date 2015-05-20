angular.module('lark.pages')

.controller('ArticleController', ['$scope', '$routeParams', 'ArticleService',
  function ($scope, $routeParams, ArticleService) {
    $scope.user_id = $routeParams.user_id
    $scope.article_id = $routeParams.article_id

    ArticleService.getArticle($scope.user_id, $scope.article_id).then(function(article) {
      $scope.article = article;
    })
  }
])
