(function(){
	// APP
	var app = angular.module("App", ['ngRoute', 'CardsControllers','cardDirectives', 'CardsFactory']);

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
	app.filter('replaceDolar', function() {
	    return function(text) {
	      return  text ? String(text).replace("$", '') : '';
	    };
	  }
	);

	app.filter('fillEmpty', function() {
	    return function(text) {
	    	 return  text ? String(text) : '-';
	    }
	  }
	);

	// Directives
	var cardDirectives = angular.module('cardDirectives', ['CardsControllers'])


	.directive('tower', function(){
		return{
			restrict: 'EA',
			scope:{
				numberOf0: '@getZero',
				numberOf1: '@getOne',
				numberOf2: '@getTwo',
				numberOf3: '@getThree',
				numberOf4: '@getFour',
				numberOf5: '@getFive',
				numberOf6: '@getSix',
				numberOf7: '@getSeven',
				numberOf8: '@getEight',
				numberOf9: '@getNine',
				numberOf10: '@getTen',
				numberOf11: '@getEleven',
				numberOf12: '@getTwelve',

			},
			link: function(scope, element, attrs){
				// define vars
				var tower,graph0, animateUp;
				//define html elements
				tower = angular.element(element);
				graph0 = tower.children()[0];
				graph1 = tower.children()[1];
				graph2 = tower.children()[2];
				graph3 = tower.children()[3];
				graph4 = tower.children()[4];
				graph5 = tower.children()[5];
				graph6 = tower.children()[6];
				graph7 = tower.children()[7];
				graph8 = tower.children()[8];
				graph9 = tower.children()[9];
				graph10 = tower.children()[10];
				graph11 = tower.children()[11];
				graph12 = tower.children()[12];

				animateUp = function(){
					$(graph0).css("height", scope.numberOf0*25 + 'px');
					$(graph1).css("height", scope.numberOf1*25 + 'px');
					$(graph2).css("height", scope.numberOf2*25 + 'px');
					$(graph3).css("height", scope.numberOf3*25 + 'px');
					$(graph4).css("height", scope.numberOf4*25 + 'px');
					$(graph5).css("height", scope.numberOf5*25 + 'px');
					$(graph6).css("height", scope.numberOf6*25 + 'px');
					$(graph7).css("height", scope.numberOf7*25 + 'px');
					$(graph8).css("height", scope.numberOf8*25 + 'px');
					$(graph9).css("height", scope.numberOf9*25 + 'px');
					$(graph10).css("height", scope.numberOf10*25 + 'px');
					$(graph11).css("height", scope.numberOf11*25 + 'px');
					$(graph12).css("height", scope.numberOf12*25 + 'px');
				}

				$(tower).on('mouseover', animateUp);
			}

		}
	})

	.directive('selectBts', function(){
		return{
			restrict: "EA",
			scope: '@',
			link: function(scope, element, attrs){
				
				selectBts = angular.element(element);
				$(selectBts).selectpicker();
			}
		}
	})

}())