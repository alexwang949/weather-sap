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
	.when ('/forecast/:days', {
		templateUrl: 'pages/forecast.html',
		controller: 'forecastController'
	})

});
//END ROUTES

//SERVICES

//Services are 'singletons', and provide a method to spread a data object through the app,
//across all controllers.
weatherApp.service('cityService', function() {

	this.city = 'New York, NY';
	//this.city = '';

});

//END SERVICES



//CONTROLLERS
weatherApp.controller('mainController', ['$scope', 'cityService', '$location', function($scope, cityService, $location) {

	//declare a 'city' object and set it equal to cityService.city
	//why? because cityService.city can be accessed/injected by all controllers
	$scope.city = cityService.city;

	//watch for any changes in 'city' model/object, update any changes by 
	//re-assigning the cityService.city object 
	$scope.characters = 3;

	$scope.$watch('city', function() {
		cityService.city = $scope.city;
	});

    $scope.submit = function() {
        $location.path("/forecast");
    };

}]);	

weatherApp.controller('forecastController', ['$scope', 'cityService', '$resource', '$routeParams', function($scope, cityService, $resource, $routeParams) {

	$scope.city = cityService.city;

	//I put the || 2 in order to provide a default value because I allowed a route that
	//didn't pass :days
	$scope.days = $routeParams.days || '2';

	//in order to make the API call, I "injected" the dependency "$resource". $resource is like
	//HTTParty for ruby. It wraps up the "$http" service so that it will return an object that can 
	//be easily worked with.
	$scope.weatherServiceApi = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", 
		{ callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});

	$scope.weatherData = $scope.weatherServiceApi.get({ q: $scope.city, cnt: $scope.days});


	//this function converts the Kelvin temperature from the API into
	//fahrenheit
	$scope.convertToFahrenheit = function(degK) {
		return Math.round((1.8 * (degK - 273)) + 32);
	};

	//this function converts date from API to be more accurate
	$scope.convertToDate = function(dt) {
		return new Date(dt * 1000);
	}
    

}]);
//END CONTROLLERS

//DIRECTIVES

//weatherReport directive was created in order to abstract away some code in the view,
//so we isolate the scope and declare what values/fx's this directive needs access to in the 
//view(forecast.html) by declaring custom attributes in the view that's part of the 'weatherReport' directive.
weatherApp.directive("weatherReport", function() {
   return {
       restrict: 'E',
       templateUrl: 'directives/weatherReport.html',
       replace: true,
       scope: {
           weatherDay: "=",
           convertToStandard: "&",
           convertToDate: "&",
           dateFormat: "@"
       }
   }
});

// weatherApp.directive("weatherReport", function() {
//    return {
//        restrict: 'E',
//        templateUrl: 'directives/weatherReport.html',
//        replace: true,
//        scope: {
//            weatherDay: "=",
//            convertToStandard: "&",
//            convertToDate: "&",
//            dateFormat: "@"
//        }
//    }
// });
 //in the view, I need access to the "w" variable in the iteration/loop. Because 
							//each "w" is an object, not just text, I need to use the "=" instead of "@".
							//So "weatherDay" points to "w".

