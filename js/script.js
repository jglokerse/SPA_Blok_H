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

app.controller('HomeController', function ($scope) {
    $scope.message = "HomeController";
});

app.controller('MenuController', function ($scope) {
    $scope.message = "MenuController";
});

app.controller('MenuItemController', function ($scope) {
    $scope.message = "MenuItemController";
});

app.controller('WineController', function () {
    var winePrefs = this;

    winePrefs.saveToStorage = function () {
        if (typeof(Storage) !== undefined) {

            winePrefs.wineArr = [];
            winePrefs.wineArr.push({
                name:winePrefs.name,
                percentage:winePrefs.percentage,
                country:winePrefs.country,
                description:winePrefs.description
            });

            if (localStorage.length == 0) {
                localStorage.setItem("1", JSON.stringify(winePrefs.wineArr));
            } else {
                localStorage.setItem((localStorage.length + 1).toString(), JSON.stringify(winePrefs.wineArr));
            }
        }

        // Clear form
        winePrefs.name          = '';
        winePrefs.percentage    = '';
        winePrefs.country       = '';
        winePrefs.description   = '';
    }

});

app.controller('AboutController', function ($scope) {
    $scope.message = "AboutController";
});