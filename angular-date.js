'use strict';

var app = angular.module('weekApp', []);

app.controller('weekCtrl', ['$scope', function($scope) {
	$scope.dataRepeat = [{
		name: 'Daily',
		key:  'd',
		sing: 'days',
		options: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
	}, {
		name: 'Weekly',
		key: 'w',
		sing: 'weeks',
		options: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
	}, {
		name: 'Monthly',
		key: 'm',
		sing: 'months',
		options: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
	}, {
		name: 'Yearly',
		key: 'y',
		sing: 'years',
		options: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
	}];

	$scope.selectedOption = $scope.dataRepeat[1];

	$scope.getTodayDate = function(format) {
		var today = new Date(),
			dd = today.getDate(),
			mm = today.getMonth()+1,
			yyyy = today.getFullYear();

		var monthNames = [ "January", "February", "March", "April", "May", "June",
    		"July", "August", "September", "October", "November", "December" ];

		if (format == 'y') {
			return monthNames[mm] + ' ' + dd;
		} else if (format == 'm') {
			return 'day ' + dd;
		}

		return dd+'/'+mm+'/'+yyyy;
	}

	$scope.repeatOn = function() {
		if ($scope.selectedOption.key == 'w')
			return true;

		return false;
	}

	$scope.selectedOptionValues = function(){
		if ($scope.selectedOption == $scope.dataRepeat[1]) {
			return $scope.selectedOption.options;
		} else {
			return []
		}
	};

	$scope.summary = $scope.selectedOption.name;

	$scope.applySummary = function(){
		var val = document.querySelector('.every').value;

		if (val > 1) {
			$scope.summary = "Every " + val + ' ' + $scope.selectedOption.sing + $scope.makeOn($scope.selectedOption);
		} else {
			$scope.summary = $scope.selectedOption.name + $scope.makeOn($scope.selectedOption);
		}

		$scope.$apply()
	};

	$scope.makeOn = function(when) {

		if (when.key == 'w') {
			return ' on + selectedMonths'
		} else if (when.key == 'm') {
			return ' on ' + $scope.getTodayDate('m');
		} else if (when.key == 'd') {
			return ''
		} else if (when.key == 'y') {
			return ' on ' + $scope.getTodayDate('y');
		}

		return ''
	}

	// View
	$scope.showDatePicker = function() {
		document.querySelector('.modal').style.display = 'block';
	};

}]);

app.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
});
