var calc = require('../lib/calc');
var should = require('chai').should();
var expect = require('chai').expect;

describe('calc', function() {
    it('指定した家賃の合計を計算する', function() {
        calc.getRentExpense(30000, 5).should.equal(1800000);
        calc.getRentExpense(80000, 45).should.equal(43200000);
    });
});

describe('EqualPaymentsWithInterest', function() {
  it('元利均等返済を計算する', function() {
    var info_list = calc.getEqualPaymentsWithInterest (30000000, 0.02, 30);
    info_list.should.have.lengthOf(30 * 12);
    Math.abs (30000000 - info_list[0].principal).should.be.below (0.01);
    info_list[30 * 12 - 1].principal.should.equal (info_list[30 * 12 - 1].principal_repayment);
  });
});
