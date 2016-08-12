describe('受け入れテストサンプル', function() {

    beforeEach(function() {
        browser.get(browser.baseUrl);
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
        browser.sleep(500);

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

    it('賃貸を1つ追加し、2年に一度2ヶ月分の更新料ありで他の値は初期値のまま送信した結果の確認', function() {
        // 結果(グラフ)が表示されていない
        expect(element(by.id('paymentGraphArea')).isDisplayed()).toBeFalsy();

        // 結果(テーブル)が表示されていない
        expect(element(by.id('paymentTableArea')).isDisplayed()).toBeFalsy();

        // 賃貸追加
        element(by.id('typeAddButton')).click();

        element.all(by.repeater('e in elements')).each(function(e, index){
            // 更新料の設定が表示されていないことを確認
            expect(e.element(by.id('RenewalChargeSettingsArea')).isDisplayed()).toBeFalsy();

            // 更新料の有無にチェックを入れる
            e.element(by.id('RenewalChargeCheck')).click();

            // 更新料の設定が表示されていないことを確認
            expect(e.element(by.id('RenewalChargeSettingsArea')).isDisplayed()).toBeTruthy();

            // 更新料のデフォルト値は160000円
            expect(e.element(by.id('RenewalCharge')).getAttribute('value')).toBe('160000');

            // 更新料の間隔のデフォルト値は2ヶ月
            expect(e.element(by.id('RenewalInterval')).getAttribute('value')).toBe('2');
        });

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
        var yearPayments = [ '960000', '1120000', '960000', '1120000', '960000' ];
        var totalPayments = [ '960000', '2080000', '3040000', '4160000', '5120000' ];
        for (var i = 0; i < 5; i++) {
            var result = element.all(by.repeater('result in results')).get(i);
            expect(result.element(by.id('ResultAge')).getText()).toBe(ages[i]);
            expect(result.element(by.id('ResultYearPayment')).getText()).toBe(yearPayments[i]);
            expect(result.element(by.id('ResultTotalPayment')).getText()).toBe(totalPayments[i]);
        }
    });

    it('賃貸を1つ追加し、追加した項目を削除する', function() {
        // 結果(グラフ)が表示されていない
        expect(element(by.id('paymentGraphArea')).isDisplayed()).toBeFalsy();

        // 結果(テーブル)が表示されていない
        expect(element(by.id('paymentTableArea')).isDisplayed()).toBeFalsy();

        // 賃貸追加
        element(by.id('typeAddButton')).click();

        element.all(by.repeater('e in elements')).each(function(e, index){
            // 項目の削除
        });

        // 項目が1つもない
        element.all(by.repeater('e in elements')).then(function(arr) {
            expect(arr.length).toBe(0);
        });
    });

    it('賃貸を2つ追加し、追加した項目のうち1つ削除する', function() {
        // 結果(グラフ)が表示されていない
        expect(element(by.id('paymentGraphArea')).isDisplayed()).toBeFalsy();

        // 結果(テーブル)が表示されていない
        expect(element(by.id('paymentTableArea')).isDisplayed()).toBeFalsy();

        // 賃貸追加
        element(by.id('typeAddButton')).click();
        element(by.id('typeAddButton')).click();

        element.all(by.repeater('e in elements')).each(function(e, index){
            // 項目の削除
        });

        // 項目が1つもない
        element.all(by.repeater('e in elements')).then(function(arr) {
            expect(arr.length).toBe(1);
        });
    });

    it('賃貸を2つ追加し、追加した項目をすべて削除する', function() {
        // 結果(グラフ)が表示されていない
        expect(element(by.id('paymentGraphArea')).isDisplayed()).toBeFalsy();

        // 結果(テーブル)が表示されていない
        expect(element(by.id('paymentTableArea')).isDisplayed()).toBeFalsy();

        // 賃貸追加
        element(by.id('typeAddButton')).click();
        element(by.id('typeAddButton')).click();

        element.all(by.repeater('e in elements')).each(function(e, index){
            // 項目の削除
        });

        // 項目が1つもない
        element.all(by.repeater('e in elements')).then(function(arr) {
            expect(arr.length).toBe(0);
        });
    });
});