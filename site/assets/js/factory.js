var CardsFactory = angular.module('CardsFactory', []);

CardsFactory.factory('randomCardDetail', function(){

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