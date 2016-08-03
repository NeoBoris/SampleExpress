describe('受け入れテストサンプル', function() {

  beforeEach(function() {
    browser.get(browser.baseUrl);
  });

  it('タイトル確認', function() {
    expect(browser.getTitle()).toBe('Tortie');
  });

  it('賃貸を1つ追加し、初期値のまま送信した結果の確認', function() {
      // 結果(グラフ)が表示されていない
      expect(element(by.id('paymentGraphArea')).isDisplayed()).toBeFalsy();

      // 結果(テーブル)が表示されていない
      expect(element(by.id('paymentTableArea')).isDisplayed()).toBeFalsy();

      // 賃貸追加
      element(by.id('typeAddButton')).click();

      // 賃貸が追加される
      // 保留

      // 送信
      element(by.id('sendButton')).click();

      // 送信後少し待つ
      browser.sleep(1000);

      // 結果(グラフ)が表示される
      expect(element(by.id('paymentGraphArea')).isDisplayed()).toBeTruthy();

      // 結果(テーブル)が表示される
      expect(element(by.id('paymentTableArea')).isDisplayed()).toBeTruthy();

      // 結果確認
      var ages = [ '31', '32', '33', '34', '35' ];
      var yearPayment = '960000';
      var totalPayments = [ '960000', '1920000', '2880000', '3840000', '4800000' ];
      for (var i = 0; i < 5; i++) {
          var result = element.all(by.repeater('result in results')).get(i);
          expect(result.element(by.binding('result.age')).getText()).toBe(ages[i]);
          expect(result.element(by.binding('result.yearPayment')).getText()).toBe(yearPayment);
          expect(result.element(by.binding('result.totalPayment')).getText()).toBe(totalPayments[i]);
      }
  });
});