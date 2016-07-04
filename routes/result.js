var express = require('express');
var calc = require('../lib/calc');
var router = express.Router();

var expensesByYear = [];

router.post('/', function(req, res, next) {
    var rent = Number(req.body.rent);
    var age = Number(req.body.age);
    var years = [];
    var expenses = [];

    for (var i = 1; i <= 50; i++) {
        years.push(age + i);
        expenses.push(calc.getRentExpense(rent, i));
    }

    res.json ({
        rent: req.body.rent,
        age: req.body.age,
        years: years,
        expenses: expenses
    });
});

module.exports = router;