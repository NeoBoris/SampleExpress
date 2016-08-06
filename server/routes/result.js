var express = require('express');
var calc = require('../lib/calc');
var router = express.Router();

router.post('/', function(req, res, next) {
    // req.checkBody("rent","Enter a numeric only.").isNumeric();
    var errors = req.validationErrors();

    var yearPayments = [];
    try {
        if (errors === true) {
            return;
        }

        var year = 1;
        for (var element of req.body.elements) {
            for (var i = 1; i <= element.period; i++) {
                var payment = calc.getRentExpense(element.payment, 1);
                if (element.isRenewalCharge) {
                    if (i % element.renewalInterval === 0) {
                        payment += element.renewalCharge;
                    }
                }
                yearPayments.push({
                    year: year,
                    payment: payment
                });
                year++;
            }
        }
    } catch (e) {
        console.log(e);
    } finally {
        res.json ({
            age: req.body.age,
            yearPayments: yearPayments,
            errors: errors,
        });
    }

/*
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
*/
});

module.exports = router;