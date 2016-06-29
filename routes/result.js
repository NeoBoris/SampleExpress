var express = require('express');
var router = express.Router();

var expensesByYear = [];

router.post('/', function(req, res, next) {
    var rent = Number(req.body.rent);
    var age = Number(req.body.age);
    var years = [];
    var expenses = [];

    for (var i = 0; i < 50; i++) {
        years.push(age + (i + 1));
        expenses.push(((i + 1) * 12) * rent);
    }

    res.render('result', {
        rent: req.body.rent,
        age: req.body.age,
        years: years,
        expenses: expenses
    });
});

module.exports = router;