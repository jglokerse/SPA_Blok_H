/**
 * Created by John on 13/02/2017.
 */

var app = angular.module('menuCardMaker', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
        })
        .when('/menus', {
            templateUrl: 'templates/menucard.html',
            controller: 'MenuController'
        })
        .when('/menuitems', {
            templateUrl: 'templates/menuitems.html',
            controller: 'MenuItemController'
        })
        .when('/wines', {
            templateUrl: 'templates/wine.html',
            controller: 'WineController'
        })
        .when('/about', {
            templateUrl: 'templates/about.html',
            controller: 'AboutController'
        })

        .otherwise({ redirectTo: '/' });

    // To prevent the “slash” into “%2f”
    // Also possible instead of this: #! at the <a href="#!/...."> tag.
    $locationProvider.hashPrefix('');
});

app.controller('HomeController', function ($scope) {
    $scope.message = "HomeController";
});

app.controller('MenuController', function ($scope) {
    $scope.message = "MenuController";
});

app.controller('MenuItemController', function ($scope) {
    $scope.message = "MenuItemController";
});

app.controller('WineController', function ($scope) {
    $scope.message = "WineController";
});

app.controller('AboutController', function ($scope) {
    $scope.message = "AboutController";
});