/**
 * Created by John on 06/03/2017.
 */

var services = angular.module('appServices', []);

services.service('StorageService', function ($window) {
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
    };

    this.updateStorage = function (key, id, data) {
        var fromStorage = JSON.parse(localStorage.getItem(key));

        for (var i = 0; i < fromStorage.length; i++) {
            if(fromStorage[i]['id'] == id) {
                var jsonKeys = Object.keys(fromStorage[i]);
                for (var x = 1; x < jsonKeys.length; x++) {
                    fromStorage[i][jsonKeys[x]] = data[jsonKeys[x]];
                }
            }
        }

        localStorage.setItem(key, JSON.stringify(fromStorage));
    }
});

services.factory('FactoryService', function () {
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
