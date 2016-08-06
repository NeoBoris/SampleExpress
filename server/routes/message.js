var util = require('util');
var message = require('./message.json');


// http://qiita.com/mima_ita/items/d7e48126f326a82af4c7

/**
 * メッセージの取得
 * @param {string} category カテゴリ名
 */
exports.getMessage = function(category) {
    var msg = message.message[category];
    if (msg) {
        return msg;
    }
    return nil;
};

/**
 * view用メッセージの取得
 * @param {string} category カテゴリ名
 */
exports.getViewMessage = function(category) {
    var msg = message.view[category];
    if (msg) {
        return msg;
    }
    return nil;
};