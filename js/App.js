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
            templateUrl: 'templates/menu/menucard.html',
            controller: 'MenuController'
        })
        .when('/menus/add', {
            templateUrl: 'templates/menu/menucard_add.html',
            controller: 'MenuController'
        })
        .when('/menuitems', {
            templateUrl: 'templates/menuitem/menuitems.html',
            controller: 'MenuItemController'
        })
        .when('/menuitems/add', {
            templateUrl: 'templates/menuitem/menuitem_add.html',
            controller: 'MenuItemController'
        })
        .when('/menuitems/delete/:id', {
            templateUrl: 'templates/menuitem/menuitems.html',
            controller: 'MenuItemController'
        })
        .when('/menuitems/edit/:id', {
            templateUrl: 'templates/menuitem/menuitem_edit.html',
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