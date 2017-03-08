/**
 * Created by John on 07/03/2017.
 */

var filters = angular.module('appFilters', []);

filters.filter('addPercent', function () {
    return function (input) {

        if (input == undefined) {
            return "%";
        } else {
            return input + "%";
        }

    }
});