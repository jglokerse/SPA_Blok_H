/**
 * Created by john on 14/03/2017.
 */

describe('Controller: MenuItemController via TDD', function () {

    var mockService;
    var scope;
    var location;

    beforeEach(function () {
        module('appControllers');
        module(function ($provide) {
            $provide.service('StorageService', function () {
                this.saveToStorage = jasmine.createSpy('saveToStorage').and.callFake(function (key, data) {
                    return true
                });
                this.deleteFromStorage = jasmine.createSpy('deleteFromStorage').and.callFake(function (key, id) {
                    return lengthOfStorage = 2;
                })
            })
        });

        inject(function (StorageService, $rootScope, $location, $controller) {
            mockService = StorageService;
            scope = $rootScope.$new();
            location = $location;

            $controller('MenuItemController', {
                $scope: scope,
                $location: location
            });

            scope.$digest();
        });
    });

    it('should save and return to MenuItem page', function () {
        location.path('/menuitems/add');
        expect(location.path()).toBe('/menuitems/add');

        scope.menuItem = {
            id: '1',
            name: "Kabeljauw",
            price: "15 euro",
            wine: [
                {id: "14", name: "Bordeaux Du Speciale", percentage: "13%", country: "Frankrijk", description: "Heerlijk bij vis"}
                ]
        };

        mockService.saveToStorage('menuItem', scope.menuItem);
        expect(mockService.saveToStorage).toHaveBeenCalledWith('menuItem', scope.menuItem);

        location.path('/menuitems');
        expect(location.path()).toBe('/menuitems');
    });

    it('should delete and return to MenuItem page', function () {
        scope.mockParam = {id: '2'};

        location.path('/menuitems/delete/' + scope.mockParam.id);
        expect(location.path()).toBe('/menuitems/delete/2');

        mockService.deleteFromStorage('menuItem', scope.mockParam.id);
        expect(mockService.deleteFromStorage).toHaveBeenCalledWith('menuItem', scope.mockParam.id);
    })

});