/**
 * Created by John on 08/03/2017.
 */

describe('Factory: StorageFactory', function () {

    var service;
    var factory;

    beforeEach(function () {
        module('appServices');
        inject(function (StorageService, FactoryService) {
            service = StorageService;
            factory = FactoryService;
        });

        var input = {
            id: '1',
            name: 'TestItem'
        };
        var input2 = {
            id: '2',
            name: 'TestItem2'
        };

        service.saveToStorage('test', input);
        service.saveToStorage('test', input2);
    });
    
    it('should get all items from key test', function () {
        var size = factory.getFromStorage('test').length;
        var expectedSize = 2;

        expect(size).toEqual(expectedSize);
    });

    it('should get item with id 2 in key test', function () {
        var item = factory.getFromStorageById('test', 2);
        var expected = 'TestItem2';

        expect(item.name).toEqual(expected);
    });

    afterEach(function () {
        localStorage.removeItem('test');
    })
});