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

/////////////////////////////
//  SERVICES & FACTORIES   //
/////////////////////////////

app.service('StorageService', function () {
    this.saveToStorage = function (key, data) {
        if (typeof(Storage) !== undefined) {
            if (localStorage.getItem(key) == null) {
                localStorage.setItem(key, JSON.stringify([data]));
            } else {
                // To append new data to existing JSON string in localStorage.
                var temp = JSON.parse(localStorage.getItem(key)) || [];

                // Get highest ID from the temp array
                var highestId = null;
                for (var i = 0; i < temp.length; i ++) {
                    if (highestId == null || temp[i]['id'] > highestId) {
                        highestId = temp[i]['id'];
                    }
                }

                // Inserts with highestId + 1
                if (temp.length > 0) {
                    data['id'] = (parseInt(highestId) + 1).toString();
                }

                temp.push(data);
                localStorage.setItem(key, JSON.stringify(temp));
            }
        }
    };

    this.deleteFromStorage = function (key, id) {
        var fromStorage = JSON.parse(localStorage.getItem(key));

        for (var i = 0; i < fromStorage.length; i++) {
            if (fromStorage[i]['id'] == id) {
                fromStorage.splice(fromStorage.indexOf(fromStorage[i]), 1);
                localStorage.setItem(key, JSON.stringify(fromStorage));
            }
        }
    }
});

app.factory('FactoryService', function () {
    return {
        getFromStorage: function (id) {
            return JSON.parse(localStorage.getItem(id));
        },
        
        getFromStorageById: function (key, id) {
            var jsonArray = JSON.parse(localStorage.getItem(key)) || [];
            for (var i = 0; i < jsonArray.length; i++) {
                if (jsonArray[i]['id'] == id) {
                    return jsonArray[i];
                }
            }
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

app.controller('WineController', function ($scope, $routeParams, $timeout, $location, StorageService, FactoryService) {
    var winePrefs = this;

    winePrefs.save = function () {
        StorageService.saveToStorage("wine",
            {
                id:winePrefs.id = "1",
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

    $scope.winesFromStorage = FactoryService.getFromStorage("wine");
    $scope.getInfo = FactoryService.getFromStorageById('wine', $routeParams.id);

    $scope.remove = function () {
        // Timeout because it is too quick to get the id from URL as parameter.
        $timeout(function () {
            StorageService.deleteFromStorage('wine', $routeParams.id);
            $location.path('/wines');
        }, 100);
    };
});

app.controller('AboutController', function ($scope) {
    $scope.message = "AboutController";
});

/////////////////
//  OTHER JS   //
/////////////////

document.getElementById('rotate').addEventListener('click', function () {
    $('.container').transition({rotate: '180deg'}, 1000);

    setTimeout(function () {
        $('.container').transition({rotate: '360deg'}, 1000);
    }, 3000);
});