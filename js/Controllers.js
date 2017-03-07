/**
 * Created by John on 06/03/2017.
 */

var c = angular.module('appControllers', ['appServices']);

c.controller('HomeController', function ($scope) {
    $scope.message = "HomeController";
});

c.controller('MenuController', function ($scope) {
    $scope.message = "MenuController";
});

c.controller('MenuItemController', function ($scope) {
    $scope.message = "MenuItemController";
});

c.controller('WineController', function ($scope, $routeParams, $timeout, $location, StorageService, FactoryService) {

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
    };

    // UPDATE
    $scope.edit = function () {
        var wine = {
            id:$scope.wineById.id,
            name:$scope.name,
            percentage:$scope.percentage,
            country:$scope.country,
            description:$scope.description
        };

        StorageService.updateStorage('wine', $scope.wineById.id, wine);
    };

    // DELETE
    $scope.remove = function () {
        // Timeout because it is too quick to get the id from URL as parameter.
        $timeout(function () {
            StorageService.deleteFromStorage('wine', $routeParams.id);
            $location.path('/wines');
        }, 100);
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
