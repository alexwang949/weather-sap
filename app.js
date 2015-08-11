//declare app module and its dependencies
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//views: home page + forecast page
//need: 2 pgs, routing, 2 controllers

//Routes HERE
weatherApp.config(function($routeProvider) {
	
	$routeProvider

	.when('/', {
		templateUrl: 'pages/home.html',
		controller: 'mainController'
	})
	.when ('/forecast', {
		templateUrl: 'pages/forecast.html',
		controller: 'forecastController'
	})

});



//Controllers HERE /
weatherApp.controller('mainController', ['$scope', function($scope) {
	$scope.greeting = 'hello';
}]);

weatherApp.controller('forecastController', ['$scope', function($scope) {

}]);

