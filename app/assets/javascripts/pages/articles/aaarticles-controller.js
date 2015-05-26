angular.module('lark.pages')

.controller('AaarticleController', ['$scope', '$routeParams', 'ArticleService',
  function ($scope, $routeParams, ArticleService) {
    ArticleService.getAllTheArticles().then(function(articles) {
      $scope.articles = articles;
    })
  }
])
