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
            templateUrl: 'templates/wine/wine.html',
            controller: 'WineController'
        })
        .when('/wines/add', {
            templateUrl: 'templates/wine/wine_add.html',
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

/////////////////////////////
//  SERVICES & FACTORIES   //
/////////////////////////////

app.service('StorageService', function () {
    this.saveToStorage = function (key, data) {
        if (typeof(Storage) !== undefined) {
            if (localStorage.getItem(key) == null) {
                localStorage.setItem(key, JSON.stringify([data]));
            } else {
                var temp = JSON.parse(localStorage.getItem(key)) || [];
                temp.push(data);
                localStorage.setItem(key, JSON.stringify(temp));
            }
        }
    }
});

app.factory('FactoryService', function () {
    return {
        getFromStorage: function (id) {
            return JSON.parse(localStorage.getItem(id));
        }
    }
});

/////////////////
// CONTROLLERS //
/////////////////

app.controller('HomeController', function ($scope) {
    $scope.message = "HomeController";
});

app.controller('MenuController', function ($scope) {
    $scope.message = "MenuController";
});

app.controller('MenuItemController', function ($scope) {
    $scope.message = "MenuItemController";
});

app.controller('WineController', function ($scope, StorageService, FactoryService) {
    var winePrefs = this;

    winePrefs.save = function () {
        StorageService.saveToStorage("wine",
            {
                name:winePrefs.name,
                percentage:winePrefs.percentage,
                country:winePrefs.country,
                description:winePrefs.description
            });

        // Clear form
        winePrefs.name          = '';
        winePrefs.percentage    = '';
        winePrefs.country       = '';
        winePrefs.description   = '';
    };

    
    $scope.wijn = FactoryService.getFromStorage("wine");
});

app.controller('AboutController', function ($scope) {
    $scope.message = "AboutController";
});

