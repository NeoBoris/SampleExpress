# Tortie

###

[README.mdファイル。マークダウン記法まとめ]  

[README.mdファイル。マークダウン記法まとめ]: http://codechord.com/2012/01/readme-markdown/

---

### Visual Studio CodeでのREADME.mdの確認  

    (mac)command + shift + V  

---

### 導入(随時更新予定)

####  npm

    npm install

####  bower

    npm install -g bower 
    bower install

####  gulp  

    npm install -g gulp  

[gulpとは何か]  

[gulpとは何か]: https://app.codegrid.net/entry/gulp-1

---

### サーバー起動

    gulp watch  

* javascript更新時にサーバ再起動  
* jadeファイル更新時に自動リロード

---

### 受け入れテスト実行

    gulp test:e2e

---

### typings

1. typingsのインストール

    sudo npm install -g typings  

2. 検索  

    sudo typings search protractor

3. インストール

    sudo typings install --save --global dt~angular-protractor  

4. アンインストール  

    sudo typings uninstall --save --global angular-protractor

### dockerを利用した動作確認

    docker build -t tortie:1.0 ./
    docker run -i -t -p 3000:3000 tortie:1.0

githubから最新のコードをダウンロードし、サーバーの起動までが実行される。
http://localhost:3000 にアクセスすればサイトが表示されるはず。

