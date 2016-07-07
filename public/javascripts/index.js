var tortieApp = angular.module('tortie',[]);

tortieApp.controller('MainController', ['$scope', '$http', function($scope, $http) {
    $scope.rent = 50000;
    $scope.loan = 2000;
    $scope.rate = 0.8;
    $scope.year = 35;
    var ages = [];
    for (var i = 20; i <= 65; i++) {
        ages.push(i);
    }
    $scope.ages = ages;
    $scope.age = 30;
    $scope.onClick = function() {
        $http({
            method: 'POST',
            url: '/result',
            data: {
                rent: $scope.rent,
                age: $scope.age,
                loan: $scope.loan * 10000,
                rate: $scope.rate / 100,
                year: $scope.year,
            }
        })
        .success(function(data, status, headers, config){
            if (data.errors) {
                displayErrors(data.errors);
                return;
            }
            updateExpenseGraph(data);
        })
        .error(function(data, statuc, headers, config) {
            alert('Error');
        });
    };

    function updateExpenseGraph(data) {
        var years = data.years;
        var expenses = data.expenses;
        var loanExpenses = data.loanExpenses;

        var trace = {
            name: "賃貸",
            x: years,
            y: expenses,
            type: 'lines+markers'
        };
        var trace2 = {
            name: "ローン",
            x: years,
            y: loanExpenses,
            type: 'lines+markers'
        };

        var layout = {
            title:'総支払い額',
            xaxis: {
                title: '年齢'
            },
            yaxis: {
                title: '総支払い額'
            },
            height: 400,
            width: 480
        };

        var plotData = [trace, trace2];
        Plotly.newPlot('expenseGraph', plotData, layout);
    }

    function displayErrors(errors) {
        for (var i in errors) {
            alert(errors[i].msg + "(" + errors[i].value+ ")");
        }
    }
}]);