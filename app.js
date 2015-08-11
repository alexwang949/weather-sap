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

//Services HERE
weatherApp.service('cityService', function() {

	this.city = 'New York, NY';

});



//Controllers HERE /
weatherApp.controller('mainController', ['$scope', 'cityService' function($scope, cityService) {

	$scope.city = cityService.city;

}]);

weatherApp.controller('forecastController', ['$scope', 'cityService' function($scope, cityService) {

	$scope.city = cityService.city;

}]);

