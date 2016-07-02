var calc = require('../lib/calc');
var should = require('chai').should();

describe('calc', function() {
    it('指定した家賃の合計を計算する', function() {
        calc.getRentExpense(30000, 5).should.equal(1800000);
        calc.getRentExpense(80000, 45).should.equal(43200000);
    });
});