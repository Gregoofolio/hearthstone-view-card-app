var CardsFactory = angular.module('CardsFactory', []);

CardsFactory.factory('getData', function($http, $routeParams){

	var getApi = function(){
		return $http.get('https://omgvamp-hearthstone-v1.p.mashape.com/cards?collectible=1', {
			headers: {"X-Mashape-Key" : "Sr23tp9tKMmshNC9Z95JlAtkBSiZp1Sngwfjsn0sCxw2GVrr5g"}
		})
	}
	var getApiDetail = function(){

		var name = $routeParams.name;
		return 	$http.get('https://omgvamp-hearthstone-v1.p.mashape.com/cards/'+ name +'?collectible=1', {
			headers: {"X-Mashape-Key" : "Sr23tp9tKMmshNC9Z95JlAtkBSiZp1Sngwfjsn0sCxw2GVrr5g"}
		})
	}
	
	return{
		getApi: getApi,
		getApiDetail: getApiDetail
	}
})

.factory('randomCardDetail', function(){

	var getRandomName = function(cards){

			var randomNumber, randomName;
			var arrayOfNames=[];
			var key, count, values = 0;
			// Loop through categories(Basic,Classic,GvG etc.)
			for (key in cards){
				//Loop through category objects 
				var category = cards[key];
				for (value in category){
					//push each category Object.name to array of names
					arrayOfNames.push(category[value].name);	
				}
			}
			//get random number from length of arrayOfNames
 			randomNumber = Math.floor((Math.random()* arrayOfNames.length)+1);
 			//pick one random name from arrayOfNames
 			randomName = arrayOfNames[randomNumber];
 			//pass randomName to $scope
 			
 			return randomName;
	}

	return{
		getRandomName: getRandomName
	}
})

