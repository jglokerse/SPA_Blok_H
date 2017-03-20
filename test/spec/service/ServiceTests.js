/**
 * Created by John on 08/03/2017.
 */

describe('Service: StorageService', function () {

    var service;

    beforeEach(function () {
        module('appServices');
        inject(function(StorageService) {
            service = StorageService;
        })
    });

    it('should save first item in localStorage', function () {
        var input = {
            id: '1',
            name: 'TestItem'
        };

        service.saveToStorage('test', input);

        expect(JSON.parse(localStorage.getItem('test'))).not.toBeNull(null);
    });

    it('should have two items in localStorage', function () {
        var input = {
            id: '1',
            name: 'TestItem'
        };
        var input2 = {
            id: '2',
            name: 'TestItem'
        };
        var expectedSize = 2;

        service.saveToStorage('test', input);
        service.saveToStorage('test', input2);

        expect(JSON.parse(localStorage.getItem('test')).length).toEqual(expectedSize);
    });
    
    it('should remove item with id 2', function () {
        var input = {
            id: '1',
            name: 'TestItem'
        };
        var input2 = {
            id: '2',
            name: 'TestItem'
        };
        var input3 = {
            id: '1',
            name: 'TestItem'
        };
        var expectedSize = 2;

        service.saveToStorage('test', input);
        service.saveToStorage('test', input2);
        service.saveToStorage('test', input3);

        service.deleteFromStorage('test', '2');

        expect(JSON.parse(localStorage.getItem('test')).length).toEqual(expectedSize);
    });

    it('should delete last item in localStorage', function () {
        var input = {
            id: '1',
            name: 'TestItem'
        };

        service.saveToStorage('test', input);
        service.deleteFromStorage('test', '1');

        expect(JSON.parse(localStorage.getItem('test')).length).toEqual(0);
    });

    it('should not delete item when id is not existing', function () {
        var input = {
            id: '1',
            name: 'TestItem'
        };
        var input2 = {
            id: '2',
            name: 'TestItem'
        };
        var expectedSize = 2;

        service.saveToStorage('test', input);
        service.saveToStorage('test', input2);

        spyOn(window, 'confirm').and.callFake(function () {
            return true;
        });

        service.deleteFromStorage('test', '2516');

        expect(JSON.parse(localStorage.getItem('test')).length).toEqual(expectedSize);
    });

    it('should update name from an item in the localStorage', function () {
        var input = {
            id: '1',
            name: 'TestItem'
        };

        var updatedItem = {
            id: '1',
            name: 'ThisItemIsUpdated'
        };

        service.saveToStorage('test', input);
        service.updateStorage('test', '1', updatedItem);

        expect(JSON.parse(localStorage.getItem('test'))[0].name).toBe(updatedItem.name);
    });

    afterEach(function () {
        localStorage.removeItem('test');
    })
});