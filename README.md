# 簡単プログラミング！XEMの現在価格を表示しよう（Node.js編）

https://nemlog.nem.social/blog/51551


みなさん、こんにちは。

XEMの値上がりがすごいことになっていて、目が離せませんね！

今回は[Node.js](https://nodejs.org/ja/about/)を使ってXEMの現在価格を表示してみます。

Node.jsを使ってプログラムを書くと、サーバー上だったり、ご自身のPC上で実行できます。また、WEBアプリとして起動すれば、ブラウザからアプリにアクセスして実行結果を確認することもできます。
以前の記事でご紹介したJavaScriptプログラムは、ブラウザのみで動作する単純なものでしたが、Node.jsを使ったプログラムでは開発用の環境構築が必要になります。

## Node.jsを使う準備

Gitpodにインストール済みのNode.js環境を確認します。コンソールの`$` 記号より後に、次のようにタイプしてください。 
現在のバージョンが表示されます。

```
gitpod /workspace/nemlog-post-51551 $ node -v
v12.19.1

gitpod /workspace/nemlog-post-51551 $ npm -v
6.14.8
```


プロジェクトを作成します。

```
gitpod /workspace/nemlog-post-51551 $ npm init -y
Wrote to /workspace/nemlog-post-51551/package.json:

{
  "name": "nemlog-post-51551",
  "version": "1.0.0",
  "description": "https://nemlog.nem.social/blog/51551",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/naoland/nemlog-post-51551.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/naoland/nemlog-post-51551/issues"
  },
  "homepage": "https://github.com/naoland/nemlog-post-51551#readme"
}
```

ライブラリをインストールします。

```
gitpod /workspace/nemlog-post-51551 $ npm install ccxt


> ccxt@1.38.23 postinstall /workspace/nemlog-post-51551/node_modules/ccxt
> node postinstall

                                                         
                         :Siiiiiiiiiiir    rSiiiiiiiiiiS:
                         r&9hh&&&&&&&A5    SG99h&&&&&&GHr
                         ;hX32;::::::;,    i9X9S:;:::::;,
                         ;hX9S             ihXhr         
                         ;hX32::::::,:,    i9X9i::::::,:.
                         rG999GGGGGGGAS    iG99hGGGGGGGAr
                         ;2S55SSSSSSS2r    r2555SSSSSSS2;
                         ;2S5s    ;2S2r    r2SS555555SS2;
                         rAh&2    sAhAS    SAGGh9999GGGAr
                         .:,::rrrs::::,    ,:,,;9X3X:,,:.
                              &A&H,            ,hX33     
                         ,;:;;;;;r;;:;,        ,hX3X.    
                         rHGAX    sAGA5        :&9h9.    
                         :Ssir    ;isir        ,Siii     
                                                         
                                  Stars: 15,027                                 
                                  Forks: 4,236                                  
                                 Contributors: 0                                
                                  Size: 0.87MB                                  

                          Thanks for installing ccxt 🙏                         
                 Please consider donating to our open collective                
                        to help us maintain this package.                       
              👉 Donate: https://opencollective.com/ccxt/donate 🎉              
     Thanks to our 45 backers we are operating on an annual budget of $6,792    
                                                                 
              ---------------------------------------------------
                                                                 
                     You can contribute in crypto directly:      
                                                                 
                 ETH 0x26a3CB49578F07000575405a57888681249c35Fd  
                 BTC 33RmVRfhK2WZVQR1R83h2e9yXoqRNDvJva          
                 BCH 1GN9p233TvNcNQFthCgfiHUnj5JRKEc2Ze          
                 LTC LbT8mkAqQBphc4yxLXEDgYDfEax74et3bP          
                                                                 
              ---------------------------------------------------
                                                                 
                                   Thank you!                    
                                                                 
npm notice created a lockfile as package-lock.json. You should commit this file.
+ ccxt@1.38.23
added 1 package from 1 contributor and audited 1 package in 1.412s
found 0 vulnerabilities

```


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

このコードの実行結果は次のように表示されます。

```
gitpod /workspace/nemlog-post-51551 $ node index.js 
XEM 現在価格: 17.08 JPY
```

コメントを読んでいただければ、おおよその動作を理解できるかと思いますが、
このコードの中で重要な点は、

```javascript
(async function () {
```
と

```javascript
// ティッカー情報を同期処理として取得します
const ticker = await zaif.fetchTicker(pair);
```

の部分で、ティッカー情報が取得できるまで待ってくれます。もし、 `await` の記述がなかった場合は、ティッカー情報の取得を待つことなく `ticker` 変数に値が入りますが、まだ取得できていないので値が存在しないことを表現する `undefined` という値が入ってしまいます。

`async`、`await`を使用しない場合の実行例

```javascript
XEM 現在価格: undefined JPY
```

`function()`の前に`async`があるのは、`await`を使うためです。

`undefined`については、関連情報へのリンクを参照してください。


このコードを実行するには次のようにコンソールに入力してください。

> node index.js


## まとめ

Node.js環境を作って、ライブラリをインストールして、コードを実行するという一連の流れを紹介しました。
今回はGitPodを利用しているのでNode.jsの導入は必要ありませんでしたが、通常は自分のPCにNode.js環境をインストールする必要があります。

今回のようなNode.jsを使ったコードでは、ブラウザではなく、コンソールに表示するだけなので、すっきりとしたコード内容になっていると思います。


## 関連情報へのリンク

- [簡単プログラミング！XEM の現在価格を表示しよう](https://nemlog.nem.social/blog/51387)
- [Node.js とは | Node.js](https://nodejs.org/ja/about/)
- [undefined - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/undefined)
- [CCXT – CryptoCurrency eXchange Trading Library](https://github.com/ccxt/ccxt#ccxt--cryptocurrency-exchange-trading-library)
