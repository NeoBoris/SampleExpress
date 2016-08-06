exports.getRentExpense = function (rent, year) {
    return rent * (year * 12);
};

// 元利均等返済
// @param loan 借入総額(円)
// @param rate 借入金利(年利)
// @param year 借入期間(年)
// @returns 支払情報リスト (以下の形式の支払い情報のリスト)
// {
//  principal_repayment: 元金返済額(円),
//  interest_payment: 支払金利額(円),
//  payment: 毎月の返済額(円),
//  principal: 残元金(円)
// }
exports.getEqualPaymentsWithInterest = function (loan, rate, year) {
  // https://ja.wikipedia.org/wiki/元利均等返済
  var S = loan;
  var r = rate / 12;  // 借入金利(月利)
  var n = year * 12;  // 借入期間(月)
  var info_list = []; // 支払情報リスト
  var principal = 0;    // 残元金(円)
  //  返済完了から逆順に計算する
  for (var k = n; k >= 1; k--) {
    var info = {};
    // 元金返済額(円) ... a_k
    info.principal_repayment = (r * S * Math.pow (1 + r, k - 1)) / (Math.pow (1 + r, n) - 1);
    // 残元金(円) ... Σ{k..n}a_k:
    principal += info.principal_repayment;
    // 支払金利額(円) ... b_k
    info.interest_payment = r * principal;
    // 毎月の返済額(円) ... c_k
    info.payment = info.principal_repayment + info.interest_payment;
    // 残元金(円)
    info.principal = principal;

    //console.log(info);
    info_list.unshift (info);
  }

  // 支払情報リストを返す
  return info_list;
};

// 元金均等返済
// @param loan 借入総額(円)
// @param rate 借入金利(年利)
// @param year 借入期間(年)
// @returns 支払情報リスト (以下の形式の支払い情報のリスト)
// {
//  principal_repayment: 元金返済額(円),
//  interest_payment: 支払金利額(円),
//  payment: 毎月の返済額(円),
//  principal: 残元金(円)
// }
exports.getPrincipalEqualPayments = function (loan, rate, year) {
  // https://ja.wikipedia.org/wiki/元金均等返済
  var S = loan;
  var r = rate / 12;  // 借入金利(月利)
  var n = year * 12;  // 借入期間(月)
  var info_list = []; // 支払情報リスト
  var principal = 0;    // 残元金(円)
  //  返済完了から逆順に計算する
  for (var k = n; k >= 1; k--) {
    var info = {};
    // 元金返済額(円) ... a_k
    info.principal_repayment = S / n;
    // 残元金(円) ... Σ{k..n}a_k:
    principal += info.principal_repayment;
    // 支払金利額(円) ... b_k
    info.interest_payment = r * principal;
    // 毎月の返済額(円) ... c_k
    info.payment = info.principal_repayment + info.interest_payment;
    // 残元金(円)
    info.principal = principal;

    /*if (k == 1 || k == 120 || k == 240) {
      console.log("k="+k);
      console.log(info);
    }*/
    info_list.unshift (info);
  }

  // 支払情報リストを返す
  return info_list;
};
