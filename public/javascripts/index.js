var tortieApp = angular.module('tortie',['ui.bootstrap', 'ui.select', 'ngSanitize']);

class Element {
    constructor(type, name) {
        this.type = type;
        this.name = name;
    }

    static create(type) {
        switch (type.type) {
            case "rent":
                return new Rent(type.type, type.name);
            case "loan":
                return new Loan(type.type, type.name);
            default:
                return null;
        }
    }
}

class Rent extends Element {
    constructor(type, name) {
        super(type, name);
        this.period = 5;
        this.payment = 80000;
    }
}

class Loan extends Element {
    constructor(type, name) {
        super(type, name);
    }
}

class Type {
    constructor(type, name) {
        this.type = type;
        this.name = name;
    }
}

tortieApp.controller('MainController', ['$scope', '$http', function($scope, $http) {
    getResource($scope, $http, function($scope, data) {
        for (var type in data.message.types) {
            $scope.types.push(new Type(type, data.message.types[type]));
        }
        $scope.type.selected = $scope.types[0];
    });
    $scope.regex = '\\d+';
    var ages = [];
    for (var i = 20; i <= 65; i++) {
        ages.push(i);
    }
    $scope.ages = ages;
    $scope.age = {};
    $scope.age.selected = 30;
    $scope.elements = [];
    $scope.types = [];
    $scope.type = {};
    $scope.onTypeClicked = function(type) {
        $scope.elements.push(Element.create(type));
    };
    $scope.results = [];
    $scope.isReceiveResult = false;
    $scope.onClick = function() {
        $http({
            method: 'POST',
            url: '/result',
            data: {
                age: $scope.age.selected,
                elements: $scope.elements
            }
        })
        .success(function(data, status, headers, config){
            if (data.errors) {
                displayErrors(data.errors);
                return;
            }
            updateExpenseGraph(data);
            $scope.isReceiveResult = true;
        })
        .error(function(data, statuc, headers, config) {
            alert('Error');
        });
    };

    function updateExpenseGraph(data) {
        var age = data.age;
        var yearPayments = data.yearPayments;
        
        $scope.results = [];
        var totalPayment = 0;
        for (var p of yearPayments) {
            totalPayment += p.payment;
            $scope.results.push({
                age: p.year + age,
                yearPayment: p.payment,
                totalPayment: totalPayment
            });
        }

        var ages = [];
        var totalYearPayments = [];
        for (var r of $scope.results) {
            ages.push(r.age);
            totalYearPayments.push(r.totalPayment);
        }

        var trace = {
            name: "賃貸",
            x: ages,
            y: totalYearPayments,
            type: 'lines+markers'
        };
/*
        var trace2 = {
            name: "ローン",
            x: years,
            y: loanExpenses,
            type: 'lines+markers'
        };
*/
        var layout = {
            title:'総支払額',
            xaxis: {
                title: '年齢'
            },
            yaxis: {
                title: '総支払額'
            },
            height: 400,
            width: 480
        };

        var plotData = [trace];
        Plotly.newPlot('paymentGraph', plotData, layout);
    }

    function displayErrors(errors) {
        for (var i in errors) {
            alert(errors[i].msg + "(" + errors[i].value+ ")");
        }
    }

    function getResource($scope, $http, success) {
        $http({
            method: 'GET',
            url: '/resources/index'
        }).success(function(data, status, header, config) {
            success($scope, data);
        }).error(function(data, status, header, config) {
            console.log(status);
        });
    }
}]);