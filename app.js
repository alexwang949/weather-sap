//declare app module and its dependencies
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//views: home page + forecast page
//need: 2 pgs, routing, 2 controllers

//ROUTES
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

//END

//SERVICES

//this service is a singleton, and provides a method to spread this data object through the app,
//across all controllers.

weatherApp.service('cityService', function() {

	this.city = 'New York, NY';

});

//END



//CONTROLLERS
weatherApp.controller('mainController', ['$scope', 'cityService', function($scope, cityService) {

	$scope.city = cityService.city;

	//watch for any changes in 'city' model/object, update any changes by 
	//re-assigning the cityService.city object 
	$scope.$watch('city', function() {
		cityService.city = $scope.city
	});


}]);		

weatherApp.controller('forecastController', ['$scope', 'cityService', '$resource', function($scope, cityService, $resource) {

	$scope.city = cityService.city;

	//in order to make the API call, I "injected" the dependency "$resource". $resource is like
	//HTTParty for ruby. It wraps up the "$http" service so that it will return an object that can 
	//be easily worked with.
	$scope.weatherServiceApi = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", 
		{ callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});

	$scope.weatherData = $scope.weatherServiceApi.get({ q: $scope.city, cnt: 2});

	//this function converts the Kelvin temperature from the API into
	//fahrenheit
	$scope.convertToFahrenheit = function(degK) {
		return Math.round((1.8 * (degK - 273)) + 32);
	};

	//this function converts date from API to be more accurate
	$scope.convertDate = function(date) {
		return new Date(date * 1000);
	}


}]);

