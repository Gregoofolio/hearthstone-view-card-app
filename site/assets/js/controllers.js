// Controllers START
	var CardsControllers = angular.module('CardsControllers', [])
		
	.controller("MainController", ["$scope","$http", function($scope, $http){
		$scope.order = 'name';



		// 1. Getting data from api (with promise)
		var onCardsComplete = function(response){
			$scope.cards = response.data;
		};
	
		$http.get('https://omgvamp-hearthstone-v1.p.mashape.com/cards?collectible=1', {
			headers: {"X-Mashape-Key" : "Sr23tp9tKMmshNC9Z95JlAtkBSiZp1Sngwfjsn0sCxw2GVrr5g"}
		})
				.then(onCardsComplete);
		// 1. END
				

		var arrayOfCost =[],
			totalCardCost = 0 ;
		$scope.totalCardCost = totalCardCost;
		$scope.arrayOfCost = arrayOfCost;
		$scope.addToList = function(card) {

			$scope.cost = card.cost;
			if (isNaN($scope.cost)){
				alert("This card doesnt have cost, its probably Hero")
			} else{
				$scope.totalCardCost += $scope.cost;
				$scope.arrayOfCost.push($scope.cost);
				console.log("Total cost: " + $scope.totalCardCost);
				console.log("Array of costs: "+ $scope.arrayOfCost);
			}
		}
		
	}])

	.controller("DetailController", ["$scope","$routeParams","$http", function ($scope, $routeParams, $http ){

		$scope.name = $routeParams.name;

		var onDetailComplete = function(response){
			$scope.details = response.data;
		};


		$http.get('https://omgvamp-hearthstone-v1.p.mashape.com/cards/'+ $scope.name +'?collectible=1', {
			headers: {"X-Mashape-Key" : "Sr23tp9tKMmshNC9Z95JlAtkBSiZp1Sngwfjsn0sCxw2GVrr5g"}
		})
				.then(onDetailComplete);
		
	}]);
	

	
	
// Controllers END