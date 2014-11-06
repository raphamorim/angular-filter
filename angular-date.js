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

	$scope.getDate = function(when) {
		var today = new Date(),
			dd = today.getDate(),
			mm = today.getMonth()+1,
			yyyy = today.getFullYear();

		if (when == 'today') {
			return dd+'/'+mm+'/'+yyyy;
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
			$scope.summary = "Every " + val + ' ' + $scope.selectedOption.sing
		} else {
			$scope.summary = $scope.selectedOption.name;
		}

		$scope.$apply()
	};

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
