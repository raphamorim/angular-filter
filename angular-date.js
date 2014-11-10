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
			yyyy = today.getFullYear(),
			w = today.getDay();

		var monthNames = [ "January", "February", "March", "April", "May", "June",
    		"July", "August", "September", "October", "November", "December" ];

    	var weekdayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

		if (format == 'y') {
			return monthNames[mm] + ' ' + dd;
		} else if (format == 'm') {
			return 'day ' + dd;
		} else if (format == 'w') {
			return weekdayNames[w];
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

	$scope.summary = $scope.selectedOption.name + ' on ' + $scope.getTodayDate('w');

	$scope.applySummary = function(){
		var val = document.querySelector('.every').value;

		if (val > 1) {
			$scope.summary = "Every " + val + ' ' + $scope.selectedOption.sing + $scope.makeOn($scope.selectedOption);
		} else {
			$scope.summary = $scope.selectedOption.name + $scope.makeOn($scope.selectedOption);
		}

		$scope.$apply()
	};

	$scope.confirmSummary = function(){
		var item = document.querySelector('.tooltip');

		item.innerHTML = $scope.summary;
		item.setAttribute('data-title','Click to change date');

		document.querySelector('.modal').style.display = 'none';
	};

	$scope.makeOn = function(when) {

		if (when.key == 'w') {
			return ' on ' + $scope.getSelectedWeekdays();
 		} else if (when.key == 'm') {
			return ' on ' + $scope.getTodayDate('m');
		} else if (when.key == 'd') {
			return ''
		} else if (when.key == 'y') {
			return ' on ' + $scope.getTodayDate('y');
		}

		return ''
	}

	$scope.getSelectedWeekdays = function(){
		var s = document.querySelectorAll('input[name="weekRepeatOn"]:checked'),
			itens = [];

		Object.keys(s).forEach(function(key) {
    		if(s.length > key) {
    			itens.push(s[key].value);
    		}
		});

		if (itens.length == 7)
			return 'all days';

		if (itens.length <= 0)
			return $scope.getTodayDate('w');

		return itens.join(', ');
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
