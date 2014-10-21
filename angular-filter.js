'use strict';

var App = angular.module('clientApp', ['ngResource', 'App.filters']);

App.controller('ClientCtrl', ['$scope', function ($scope) {
    $scope.selectedDate = [];
    $scope.dateList = [{
        id: 1,
        name: 'October'
    }, {
        id: 2,
        name: 'January'
    }, {
        id: 3,
        name: 'November'
    }];

    $scope.clients = [{
        name: 'Gula Gula',
        designation: 'Restaurant',
        company: {
            id: 1,
            name: 'October'
        }
    }, {
        name: 'Spoleto',
        designation: 'Restaurant',
        company: {
            id: 3,
            name: 'November'
        }
    }, {
        name: 'Burguer King',
        designation: 'Fast-food',
        company: {
            id: 2,
            name: 'January'
        }
    }, {
        name: 'Algo do camarão',
        designation: 'Restaurant',
        company: {
            id: 1,
            name: 'October'
        }
    }, {
        name: 'Bobs',
        designation: 'Fast-food',
        company: {
            id: 3,
            name: 'November'
        }
    }];

    $scope.setSelectedClient = function () {
        var id = this.dates.id;
        if (_.contains($scope.selectedDate, id)) {
            $scope.selectedDate = _.without($scope.selectedDate, id);
        } else {
            $scope.selectedDate.push(id);
        }
        return false;
    };

    $scope.isChecked = function (id) {
        if (_.contains($scope.selectedDate, id)) {
            return 'glyphicon glyphicon-thumbs-up pull-right';
        }
        return false;
    };

    $scope.checkAll = function () {
        $scope.selectedDate = _.pluck($scope.dateList, 'id');
    };
}]);

angular.module('App.filters', []).filter('dateFilter', [function () {
    return function (clients, selectedDate) {
        if (!angular.isUndefined(clients) && !angular.isUndefined(selectedDate) && selectedDate.length > 0) {
            var tempClients = [];
            angular.forEach(selectedDate, function (id) {
                angular.forEach(clients, function (client) {
                    if (angular.equals(client.company.id, id)) {
                        tempClients.push(client);
                    }
                });
            });
            return tempClients;
        } else {
            return clients;
        }
    };
}]);
