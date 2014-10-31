'use strict';

var App = angular.module('clientApp', ['ngResource', 'App.filters', 'App.services']);

App.controller('ClientCtrl', ['$scope', 'utils',
    function($scope) {
        $scope.selectedDate = [];
        $scope.dateList = [{
            id: 1,
            name: 'Sunday'
        }, {
            id: 2,
            name: 'Monday'
        }, {
            id: 3,
            name: 'Tuesday'
        }, {
            id: 4,
            name: 'Wednesday'
        }, {
            id: 5,
            name: 'Thursday'
        }, {
            id: 6,
            name: 'Friday'
        }, {
            id: 7,
            name: 'Saturday'
        }];

        $scope.clients = [{
            name: 'Suikoden 2',
            designation: 'PS One',
            company: $scope.dateList[0]
        }, {
            name: 'Radiata Stories',
            designation: 'PS2',
            company: $scope.dateList[1]
        }, {
            name: 'Uncharted 3',
            designation: 'PS3',
            company: $scope.dateList[0]
        }, {
            name: 'Assassin\'s Creed 2',
            designation: 'PS3',
            company: $scope.dateList[2]
        }, {
            name: 'Brave Fencer Musashi',
            designation: 'PS One',
            company: $scope.dateList[2]
        }, {
            name: 'Harvest Moon: Back to Nature',
            designation: 'PS One',
            company: $scope.dateList[6]
        }, {
            name: 'Fire Emblem: Awaking',
            designation: 'Nintendo 3DS',
            company: $scope.dateList[5]
        }, {
            name: 'Pokemon Silver',
            designation: 'Gameboy',
            company: $scope.dateList[6]
        }, {
            name: 'Metal Gear Solid 3',
            designation: 'PS2',
            company: $scope.dateList[4]
        }, {
            name: 'Kingdom Hearts: chain of memories',
            designation: 'PS2',
            company: $scope.dateList[3]
        }, {
            name: 'Harvest Moon: Hero of Leaf Valley',
            designation: 'PSP',
            company: $scope.dateList[4]
        }];

        $scope.setSelectedClient = function() {
            var id = this.dates.id;
            if (_.contains($scope.selectedDate, id)) {
                $scope.selectedDate = _.without($scope.selectedDate, id);
            } else {
                $scope.selectedDate.push(id);
            }
            return false;
        };

        $scope.selWeek = function() {
            var week = document.querySelector('.week'),
                checkboxes = document.getElementsByClassName('dateCheck');

            if( week.style.display == 'block' ) {

                for (var i = 0; i < checkboxes.length; i++) {
                    if (checkboxes[i].type == 'checkbox') {
                        checkboxes[i].checked = false;
                    }
                }

                $scope.selectedDate = [];
                week.style.display = 'none';
            } else {
                week.style.display = 'block';
            }

        };

        // $scope.checkAll = function() {
        //     $scope.selectedDate = _.pluck($scope.dateList, 'id');
        // };
    }
]);

angular.module('App.filters', [])
    .filter('dateFilter', function() {
        return function(clients, selectedDate) {
            if (!angular.isUndefined(clients) && !angular.isUndefined(selectedDate) && selectedDate.length > 0) {
                var tempClients = [];
                angular.forEach(selectedDate, function(id) {
                    angular.forEach(clients, function(client) {

                        if (angular.equals(client.company.id, id))
                            tempClients.push(client);
                    });
                });
                return tempClients;
            } else {
                return clients;
            }
        };
    });

angular.module('App.services', [])
    .factory('utils', function() {
        return {
            contains: function() {
                //Do something here
            },
            without: function() {
                //Do something else here
            },
            pluck: function() {

            }
        }
    });
