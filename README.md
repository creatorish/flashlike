jQuery CrossTable Plugin
======================
トップページによくある画像切り替えするFlashコンテンツっぽいものを作るjQueryプラグイン

デモ
------
[Demo1](http://dev.creatorish.com/demo/flashlike/demo1.html)  
[Demo2](http://dev.creatorish.com/demo/flashlike/demo2.html)

使い方
------

### HTML ###

    <div id="flashlike"><img src="images/default.jpg" alt="" /></div>

### JS ###

    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/flashlike.min.js"></script>

シーン用のオブジェクトを作ります。

    var scenes = [ 
        { 
            url: "images/demo1/01.jpg", 
            fadeIn: 1000, wait: 2000 
        },
        {
            url: "images/demo1/02.jpg", 
            fadeIn: 1000, 
            wait: 2000 
        },
        ...
    ];

設定できる項目は以下の通りです。

+    url: ""(必須) : シーンに使用する画像のパスです。
+    wait: null : シーンの表示時間です。指定しない場合、そのシーンに留まります。
+    fadeIn: null : シーン表示時のフェードイン速度を指定します。指定しない場合、即座に表示されます。
+    fadeOut: null : シーン削除時のフェードアウト速度を指定します。指定しない場合、即座に非表示となります。
+    top: 0 : シーン画像の位置を上から指定します。数字または文字列（"10px","50%")などで指定します。
+    left: 0 : シーン画像の位置を左から指定します。数字または文字列（"10px","50%")などで指定します。
+    live: null : シーンを削除するタイミングを指定します。指定しない場合は、次のシーンのfadeInが完了したときに削除されます。  
1を指定した場合、次のシーンが表示されている間はそのまま残り、2つ先のシーンが表示されたときに削除されます。
（１シーン分生き残らせるという意味合い）
+    zIndex: null : 重なり順を指定します。指定しない場合は、後のシーンが上に表示されます。  
FlashLakeでのデフォルトは重なり順＝シーンの順番-1で自動付与されます。（最初のシーンを0とする）２シーン目の場合はzIndexは1となります。  
このプロパティに1を指定するとzIndexはシーンの順番と同じ値が設定されます。
+    animate: null : シーン画像に対しアニメーションを付加します。アニメーションの設定は以下のように行います。

    animate: {
        param: {
            top: 30
        },
        time: 1000,
        easing: “swing”,
        delay: 0,
        callback: null
    }
    //param   アニメーションさせる内容です。jQueryのanimateのparamsと同じです。
    //time   アニメーションの時間をミリ秒で指定します。
    //easing   アニメーションのイージングを指定します。
    //delay   アニメーション開始までのディレイタイムを指定します。
    //callback   アニメーション完了時に実行する関数を指定します。

+    callback: null : シーンが表示されたときに実行する処理を指定します。

### 設定用オブジェクトの作成 ###

     var setting = {
         id: "flashlike", //FlashLikeを作成するエレメントのID 
         width: 960, //FlashLikeのステージ横幅 
         height: 320, //FlashLikeのステージ縦幅 
         loader: "images/ajax-loader.gif", //ローディングの画像パス 
         loaderWidth: 35, //ローディングの画像横幅 
         loaderHeight: 35, //ローディングの画像縦幅 
         scene: 0, //初期表示シーン 
         loop: false //ループ設定 
     };

### FlashLikeの初期化 ###

    var flashlike = new FlashLike(scenes,setting);

以上で完了です。

イベント
------

初期化したFlashLikeオブジェクトに以下のイベントをjQueryのbindでフックすることができます。

+    FlashLikeEvent.INIT : 初期化時に発生
+    FlashLikeEvent.START : 画像が読み込み終わって、シーン表示を開始するときに発生
+    FlashLikeEvent.CHANGE : シーンが切り替わるときに発生
+    FlashLikeEvent.FINISH : シーンの再生がすべて完了したときに発生

プロパティ
------

FlashLikeオブジェクトからは以下の情報が取得できます。

+    flashlike.index : 現在表示されているシーンのインデックス
+    flashlike.isPlay : 再生状態かどうかのフラグ
+    flashlike.isFinish : 再生が完了したかどうかのフラグ

関数
------

FlashLikeオブジェクトから以下の関数が実行できます。

+    flashlike.replay() : シーンを一番初めから再生し直します。
+    flashlike.skip() : 再生をスキップして最終シーンへ遷移します。
+    flashlike.goTo(index) : 引数に指定したインデックスのシーンへ遷移します。

ライセンス
--------
[MIT]: http://www.opensource.org/licenses/mit-license.php
Copyright &copy; 2012 creatorish.com
Distributed under the [MIT License][mit].

作者
--------
creatorish yuu  
Weblog: <http://creatorish.com>  
Facebook: <http://facebook.com/creatorish>  
Twitter: <http://twitter.jp/creatorish>