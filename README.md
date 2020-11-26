# 簡単プログラミング！XEM の現在価格を表示しよう（Node.js 編）  
https://nemlog.nem.social/blog/51551

## はじめに

みなさん、こんにちは。

XEMの値上がりがすごいことになっていて、目が離せませんね！

今回は[Node.js](https://nodejs.org/ja/about/)を使ってXEMの現在価格を表示してみます。

Node.jsを使ってプログラムを書くと、サーバー上だったり、ご自身のPC上で実行できます。また、WEBアプリとして起動すれば、ブラウザからアプリにアクセスして実行結果を確認することもできます。
以前の記事でご紹介したJavaScriptプログラムは、ブラウザのみで動作する単純なものでしたが、Node.jsを使ったプログラムでは開発用の環境構築が必要になります。

## Node.jsを使う準備

## XEMの価格を取得して表示する

プログラムの内容は次のようになります。

```javascript
// 厳しく文法チェックします
'use strict';

// ライブラリを利用可能にします
const ccxt = require('ccxt');

// 同期処理可能な関数として実行します
(async function () {
    try {
        // zaif apiの機能を使えるようにします
        const zaif = new ccxt.zaif();
        // 通貨ペアを指定します
        const pair = 'XEM/JPY';
        // ティッカー情報を同期処理として取得します
        const ticker = await zaif.fetchTicker(pair);
        // ティッカー情報の中から現在価格を表示します
        console.log(`XEM 現在価格: ${ticker['last']} JPY`);
    } catch (e) {
        // 何らかのエラーが発生した場合は、以下のコードが実行されます

        // エラー内容をそのまま表示
        console.log(e.message);
    }
})();
```

このコードを実行するには次のようにコンソールに入力してください。

> node index.js

実行結果は次のように表示されます。

特に難しい内容ではないので、コメントを読んでいただければだいたい理解できると思います。


## まとめ

## 関連情報へのリンク


