var express = require('express');
var calc = require('../lib/calc');
var router = express.Router();

router.post('/', function(req, res, next) {
    req.checkBody("rent","Enter a numeric only.").isNumeric();
    var errors = req.validationErrors();

    var years = [];
    var expenses = [];
    if (errors === false) {
        var rent = Number(req.body.rent);
        var age = Number(req.body.age);

        for (var i = 1; i <= 50; i++) {
            years.push(age + i);
            expenses.push(calc.getRentExpense(rent, i));
        }
    }

    var loan = Number(req.body.loan);
    var rate = Number(req.body.rate);
    var year = Number(req.body.year);
    var loaninfo = calc.getEqualPaymentsWithInterest(loan, rate, year);
    var loanExpense = loaninfo[0].payment;
    var loanExpenses = [];
    for (var j = 1; j <= 50; j++) {
        var y = j;
        if (j > year) {
            y = year;
        }
        loanExpenses.push(loanExpense * (y * 12));
    }

    res.json ({
        years: years,
        expenses: expenses,
        loanExpenses: loanExpenses,
        errors: errors,
    });
});

module.exports = router;