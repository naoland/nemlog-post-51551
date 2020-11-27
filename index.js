// 構文チェックを厳しくします
"use strict";

// ccxtというライブラリを利用可能にします
const ccxt = require("ccxt");

// 同期処理可能な関数として実行します
(async function () {
  try {
    // zaif apiの機能を使えるようにします
    const zaif = new ccxt.zaif();
    // 通貨ペアを指定します
    const pair = "XEM/JPY";
    // ティッカー情報を同期処理として取得します
    const ticker = await zaif.fetchTicker(pair);
    // ティッカー情報の中から現在価格を表示します
    console.log(`XEM 現在価格: ${ticker["last"]} JPY`);
  } catch (e) {
    // 何らかのエラーが発生した場合は、以下のコードが実行されます

    // エラー内容をそのまま表示
    console.log(e.message);
  }
})();
