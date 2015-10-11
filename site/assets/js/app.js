(function(){
	// APP
	var app = angular.module("App", ['ngRoute', 'CardsControllers','cardDirectives']);

	// app CONFIG
	app.config(['$routeProvider', function($routeProvider) {
	    $routeProvider
	      .when('/cards', {
	        templateUrl: 'assets/partials/card-list.html',
	        controller: 'MainController'
	      })
	      .when('/cards/:name', {
	        templateUrl: 'assets/partials/detail.html',
	        controller: 'DetailController'
	      })
	      .otherwise({
	        redirectTo: '/cards'
	      });
	  }]);
	app.run(function($templateCache) {
	  $templateCache.put('assets/partials/card-list.html');
	});

	app.filter('htmlToPlaintext', function() {
	    return function(text) {
	      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
	    };
	  }
	);

	// Directives
	var cardDirectives = angular.module('cardDirectives', ['CardsControllers'])


	.directive('tower', function(){
		return{
			restrict: 'E',
			scope:{
				graphHeight: '@getHeight'
			},
			link: function(scope, element, attrs){
				var tower, animateUp;
				tower = angular.element(element);

				animateUp = function(){
					$(this).css("height", scope.graphHeight*10 + 'px');
					console.log(scope.graphHeight)
				}

				$(tower).on('click', animateUp);
			}

		}
	})

}())