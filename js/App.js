/**
 * Created by John on 06/03/2017.
 */

var app = angular.module('menuCardMaker', ['ngRoute', 'appControllers', 'appServices']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html',
            controller: 'HomeController',
            name: 'home'
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
            templateUrl: 'templates/wine/wine.html',
            controller: 'WineController'
        })
        .when('/wines/add', {
            templateUrl: 'templates/wine/wine_add.html',
            controller: 'WineController'
        })
        .when('/wines/delete/:id', {
            templateUrl: 'templates/wine/wine.html',
            controller: 'WineController'
        })
        .when('/wines/edit/:id', {
            templateUrl: 'templates/wine/wine_edit.html',
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