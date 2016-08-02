describe('受け入れテストサンプル', function() {

  beforeEach(function() {
    browser.get(browser.baseUrl);
  });

  it('タイトル確認', function() {
    expect(browser.getTitle()).toBe('Tortie');
  });
});