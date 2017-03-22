/**
 * Created by John on 06/03/2017.
 */

var c = angular.module('appControllers', ['appServices', 'appFilters']);

c.controller('HomeController', function ($scope) {
    $scope.message = "HomeController";
});

c.controller('MenuController', function ($scope, $location, $routeParams, $window, $timeout, StorageService, FactoryService) {
    $scope.message = "MenuController";
    
    $scope.selection = [];

    $scope.toggleSelection = function toggleSelection (menuItem) {
        if ($scope.selection.indexOf(menuItem) === -1) {
            $scope.selection.push(menuItem);
        } else {
            var index = $scope.selection.indexOf(menuItem);
            $scope.selection.splice(index, 1)
        }
    };

    $scope.save = function () {
        StorageService.saveToStorage('menuCard',
            {
                id:$scope.id = "1",
                name:$scope.name,
                items:$scope.selection
            });

        $location.path('/menus');
    };
    
    $scope.remove = function () {
        if ($window.confirm("Weet je zeker dat je dit wil verwijderen?")) {
                $timeout(function () {
                    StorageService.deleteFromStorage('menuCard', $routeParams.id);
                    $location.path('/menus');
                })
        }
    };
    
    $scope.cancel = function () {
        $location.path('/menus')
    };

    $scope.menucards = FactoryService.getFromStorage('menuCard');

    $timeout(function () {
        $scope.menucardById = FactoryService.getFromStorageById('menucard', $routeParams.id);
    });

    $scope.menuitems = FactoryService.getFromStorage("menuItem");
});

c.controller('MenuItemController', function ($scope, $routeParams, $timeout, $location, $window, StorageService, FactoryService) {

    // CREATE
    $scope.save = function () {

        if ($scope.wine === undefined) {
            $scope.wine = {
                id:-1,
                name:"Geen"
            }
        }

        StorageService.saveToStorage("menuItem",
            {
                id:$scope.id = "1",
                name:$scope.name,
                price:$scope.price,
                wine:$scope.wine.name
            });

        $scope.name     = '';
        $scope.price    = '';
        $location.path('/menuitems');
    };

    // UPDATE
    $scope.edit = function () {
        if ($scope.menuItemById.wine === null) {
            $scope.menuItemById.wine = "Geen"
        }

        StorageService.updateStorage('menuItem', $scope.menuItemById.id, $scope.menuItemById);
        $location.path('/menuitems')
    };

    // DELETE
    $scope.remove = function () {
        if ($window.confirm("Weet je zeker dat je dit wil verwijderen?")) {
            $timeout(function () {
                StorageService.deleteFromStorage('menuItem', $routeParams.id);
                $location.path('/menuitems');
            });
        }
    };

    $scope.cancel = function () {
        $location.path('/menuitems')
    };

    // READ
    $scope.menuItemsFromStorage = FactoryService.getFromStorage('menuItem');

    $timeout(function () {
        $scope.menuItemById = FactoryService.getFromStorageById('menuItem', $routeParams.id);
    });

    // Data for the dropdownlist
    $scope.wines = FactoryService.getFromStorage('wine');

});

c.controller('WineController', function ($scope, $routeParams, $timeout, $location, $window, StorageService, FactoryService) {

    // CREATE
    $scope.save = function () {
        StorageService.saveToStorage("wine",
            {
                id:$scope.id = "1",
                name:$scope.name,
                percentage:$scope.percentage,
                country:$scope.country,
                description:$scope.description
            });

        // Clear form
        $scope.name          = '';
        $scope.percentage    = '';
        $scope.country       = '';
        $scope.description   = '';
        $location.path('/wines');
    };

    // UPDATE
    $scope.edit = function () {
        StorageService.updateStorage('wine', $scope.wineById.id, $scope.wineById);
        $location.path('/wines');
    };

    // DELETE
    $scope.remove = function () {
        // Timeout because it is too quick to get the id from URL as parameter.
        if ($window.confirm("Weet je zeker dat je dit wil verwijderen?")) {
            $timeout(function () {
                StorageService.deleteFromStorage('wine', $routeParams.id);
                $location.path('/wines');
            }, 100);
        }
    };

    $scope.cancel = function () {
        $location.path('/wines');
    };

    // READ
    $scope.winesFromStorage = FactoryService.getFromStorage("wine");

    $timeout(function () {
        $scope.wineById = FactoryService.getFromStorageById('wine', $routeParams.id);
    });

});

c.controller('AboutController', function ($scope) {
    $scope.message = "AboutController";
});
