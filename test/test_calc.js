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
    // https://ja.wikipedia.org/wiki/元利均等返済
    // 借入:20百万円, 金利:年2.5%, 返済年数:20年
    var info_list = calc.getEqualPaymentsWithInterest (20000000, 0.025, 20);
    // 返済回数
    info_list.should.have.lengthOf(240);
    // 初回の残元金
    info_list[0].principal.should.be.closeTo (20000000, 0.5);
    // 240回目の残元金
    info_list[240 - 1].principal.should.equal (info_list[240 - 1].principal_repayment);
    // 初回の返済額
    info_list[0].payment.should.be.closeTo (105981, 0.5);
    // 120回目の返済額
    info_list[120 - 1].payment.should.be.closeTo (105981, 0.5);
    // 240回目の返済額
    info_list[240 - 1].payment.should.be.closeTo (105981, 0.5);
    // 返済総額
    var total_payment = info_list.reduce ((sum, info) => (sum + info.payment), 0.0);
    total_payment.should.be.closeTo (25435339, 0.5);
    // 利息総額
    var total_interest_payment = info_list.reduce ((sum, info) => (sum + info.interest_payment), 0.0);
    total_interest_payment.should.be.closeTo (5435339, 0.5);
  });
});

describe('PrincipalEqualPayments', function() {
  it('元金均等返済を計算する', function() {
    // https://ja.wikipedia.org/wiki/元金均等返済
    // 借入:20百万円, 金利:年2.5%, 返済年数:20年
    var info_list = calc.getPrincipalEqualPayments (20000000, 0.025, 20);
    // 返済回数
    info_list.should.have.lengthOf(240);
    // 初回の残元金
    info_list[0].principal.should.be.closeTo (20000000, 0.5);
    // 240回目の残元金
    info_list[240 - 1].principal.should.equal (info_list[240 - 1].principal_repayment);
    // 初回の返済額
    info_list[0].payment.should.be.closeTo (125000, 0.5);
    // 120回目の返済額
    info_list[120 - 1].payment.should.be.closeTo (104340, 0.5);
    // 240回目の返済額
    info_list[240 - 1].payment.should.be.closeTo (83507, 0.5);
    // 返済総額
    var total_payment = info_list.reduce ((sum, info) => (sum + info.payment), 0.0);
    total_payment.should.be.closeTo (25020833, 0.5);
    // 利息総額
    var total_interest_payment = info_list.reduce ((sum, info) => (sum + info.interest_payment), 0.0);
    total_interest_payment.should.be.closeTo (5020833, 0.5);
  });
});
