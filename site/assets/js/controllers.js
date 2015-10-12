// Controllers START
	var CardsControllers = angular.module('CardsControllers', [])
		
	.controller("MainController", ["$scope","$http", function($scope, $http){
		$scope.order = 'name';

		// 1. Getting data from api (with promise function below)
		var onCardsComplete = function(response){
			$scope.cards = response.data;
		};
	
		$http.get('https://omgvamp-hearthstone-v1.p.mashape.com/cards?collectible=1', {
			headers: {"X-Mashape-Key" : "Sr23tp9tKMmshNC9Z95JlAtkBSiZp1Sngwfjsn0sCxw2GVrr5g"}
		})
				.then(onCardsComplete);
		// 1. END
				
		//2. Counting in list of added cards (arrayOfCost) how may times each cost appears
			// vars

		$scope.totalCardCost = 0;
		$scope.arrayOfCost = [];
		$scope.arrayOfNames = [];
		$scope.arrayOfAttack = [];
		$scope.arrayOfHealth = [];
		$scope.numberOf0 = 0;
		$scope.numberOf1 = 0;
		$scope.numberOf2 = 0;
		$scope.numberOf3 = 0;
		$scope.numberOf4 = 0;
		$scope.numberOf5 = 0;
		$scope.numberOf6 = 0;
		$scope.numberOf7 = 0;
		$scope.numberOf8 = 0;
		$scope.numberOf9 = 0;

			// function counting how many times each cost apeears in arrayOfCosts
			function countInArray(array, what){
				var count = 0;
				for(var i =0; i<array.length; i++){
					if (array[i] === what){
						count++
					}
				}
				return count;
			}
		//on plus-button click get card from ng-repeat and send its data via function addToList.
		$scope.addToList = function(card) {

			$scope.cost = card.cost;
			$scope.attack = card.attack;
			$scope.health = card.health;
			$scope.cardName = card.name;

			//adding costs to array and total value. Then invoke function countInArray for each cost
			if (isNaN($scope.cost)){
				alert("This card "+ "("+ $scope.cardName +")" + " does not have cost, its probably Hero");
				$scope.arrayOfCost.push('-');
			} else {
				$scope.totalCardCost += $scope.cost;
				$scope.arrayOfCost.push($scope.cost);
				console.log("Total cost: " + $scope.totalCardCost);
				console.log("Array of costs: "+ $scope.arrayOfCost);
			}
			$scope.numberOf0 = countInArray($scope.arrayOfCost, 0);
			$scope.numberOf1 = countInArray($scope.arrayOfCost, 1);
			$scope.numberOf2 = countInArray($scope.arrayOfCost, 2);
			$scope.numberOf3 = countInArray($scope.arrayOfCost, 3);
			$scope.numberOf4 = countInArray($scope.arrayOfCost, 4);
			$scope.numberOf5 = countInArray($scope.arrayOfCost, 5);
			$scope.numberOf6 = countInArray($scope.arrayOfCost, 6);
			$scope.numberOf7 = countInArray($scope.arrayOfCost, 7);
			$scope.numberOf8 = countInArray($scope.arrayOfCost, 8);
			$scope.numberOf9 = countInArray($scope.arrayOfCost, 9);

			//adding each card attack to array of attacks
			if($scope.attack === undefined){
				($scope.arrayOfAttack).push('-')
				} else {
					($scope.arrayOfAttack).push($scope.attack);
			};
			//adding each card health to array of healths
			if($scope.health === undefined){
				($scope.arrayOfHealth).push('-')
				} else {
					($scope.arrayOfHealth).push($scope.health);
			};
			//adding each card name to array of names
			$scope.arrayOfNames.push($scope.cardName);

			console.log("Array of attack: "+ $scope.arrayOfAttack);
			console.log("Array of health: "+ $scope.arrayOfHealth);
			console.log("Array of names: "+ $scope.arrayOfNames);
		}
		// In this stage I have Arrays of names,health,attack and cost each card which was clicked. 
		//2. END
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