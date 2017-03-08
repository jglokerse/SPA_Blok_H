/**
 * Created by John on 08/03/2017.
 */

describe('Filter: addPercent', function () {

    var filter;
    
    beforeEach(function () {
        module('appFilters');
        inject(function ($filter) {
            filter = $filter('addPercent');
        })
    });

    it('should add a percent to text', function () {
        var input = '15';
        var expected = '15%';

        expect(filter(input)).toBe(expected);
    });

    it('should return a percent if text is undefined', function () {
        var input = undefined;
        var expected = '%';

        expect(filter(input)).toBe(expected);
    })
});