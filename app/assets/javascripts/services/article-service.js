angular.module('lark.services')

.service('ArticleService', ['$http', '$q', '$rootScope', '$cookieStore',
  function ($http, $q, $rootScope, $cookieStore) {
    var articleService = {};

    articleService.getArticles = function(user_id) {
      var deferred = $q.defer();
      var api_url = "http://localhost:3000/users/" + user_id + "/articles"
      $http.get(api_url).then(function (data){
        console.log("articles are ", data.data)
        deferred.resolve(data.data);
      });

      return deferred.promise;
    }

    articleService.getAllTheArticles = function() {
      var deferred = $q.defer();
      var api_url = "http://localhost:3000/articles"
      $http.get(api_url).then(function (data){
        console.log("articles are ", data.data)
        deferred.resolve(data.data);
      });

      return deferred.promise;
    }

    articleService.getArticle = function(user_id, article_id) {
      var deferred = $q.defer();
      var api_url = "http://localhost:3000/users/" + user_id + "/articles/" + article_id
      $http.get(api_url).then(function (data){
        console.log("article is ", data.data)
        deferred.resolve(data.data);
      });

      return deferred.promise;
    }

    return articleService;
  }
])