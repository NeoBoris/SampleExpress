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

    res.json ({
        years: years,
        expenses: expenses,
        errors: errors,
    });
});

module.exports = router;