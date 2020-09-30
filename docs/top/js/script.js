'use strict';

var $MONTH = document.getElementById('date');
var $INPUTAREA = document.getElementsByClassName('p-inputArea');
var $INPUT_WHO = document.getElementsByClassName('p-itemwho');
var $INPUT_TYPE = document.getElementsByClassName('p-itemtype');
var $INPUT_PRICE = document.getElementsByClassName('p-itemprice');
var $INPUT_DATE = document.getElementById('itemdate');
var date = '';
var yyyy = '';
var mm = '';
var dd = '';
var listNum = 0;
var user = null;
var LIST_REF = '';
/**
 * FBAからユーザーのアカウント情報（メールアドレス）を取得（初回のみ）。
 * FBAのメソッドの外にユーザー情報を出せないため一度ローカルストレージ にセットしています。
 */

var getUser = function getUser() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      localStorage.setItem('email', user.email);
    } else {
      console.log('not login');
    }
  });
};

getUser();
/**
 * DBから情報を取得、計算しトップ画面に表示させる処理です。
 */

var showCulculate = function showCulculate() {
  // ローカルストレージからメアドをgetします（初回のみ）。
  var promise = new Promise(function (resolve, reject) {
    var set = setInterval(function () {
      if (user === null) {
        user = localStorage.getItem('email');
      } else {
        clearInterval(set);
        resolve();
      }
    }, 100);
  });
  promise.then(function () {
    LIST_REF = firebase.firestore().collection("Users").doc(user);
    LIST_REF.onSnapshot(function (doc) {
      // DBにユーザー固有のドキュメントを作成（初回のみ）。
      var docData = doc.data();

      if (typeof docData === 'undefined') {
        LIST_REF.set({
          listArray: []
        }).then(function () {
          console.log("Document successfully written!");
        })["catch"](function (error) {
          console.error("Error writing document: ", error);
        });
      }

      var list = doc.data()['listArray'];
      listNum = list.length; // DBのデータからトップ画面に表示させる数値を計算。

      var culculate = function culculate() {
        var typeCulculater = function typeCulculater() {
          // 画面上の分類の合計値をリセット
          app.typeArray.forEach(function (item) {
            app.a.prices[item].result = 0;
            app.b.prices[item].result = 0;
          }); // 各分類の合計値を計算

          list.forEach(function (item) {
            var date = item.date.slice(0, -3);
            var who = item.who;
            var type = item.type;

            if (date === app.selectedMonth) {
              app[who].prices[type].sum += parseInt(item.price);
              app[who].prices[type].result = app[who].prices[type].sum;
            }
          }); // 処理内での分類の合計値をリセット

          app.typeArray.forEach(function (item) {
            app.a.prices[item].sum = 0;
            app.b.prices[item].sum = 0;
          });
        }; // 合計値を計算


        var totalCulculater = function totalCulculater() {
          for (var i = 0; i < listNum; i++) {
            app.a.prices.total = app.a.prices.foods.result + app.a.prices.commodity.result + app.a.prices["public"].result;
            app.b.prices.total = app.b.prices.foods.result + app.b.prices.commodity.result + app.b.prices["public"].result;
          }
        }; // 差額を計算


        var defferCulculater = function defferCulculater() {
          var deffer = app.a.prices.total - app.b.prices.total;

          if (deffer >= 0) {
            app.take = 'B';
            app.give = 'A';
          } else {
            app.take = 'A';
            app.give = 'B';
          }

          app.deffer = Math.abs(deffer) / 2;
        };

        typeCulculater();
        totalCulculater();
        defferCulculater();
      };

      culculate();
    });
  });
};

showCulculate();
/**
 * モーダルのheightを調整
 */

var oriantation = function oriantation() {
  if (window.orientation === 0) {
    $INPUTAREA[0].style.height = '109vh';
  } else {
    $INPUTAREA[0].style.height = '109vw';
  }
};

oriantation();
window.addEventListener('orientationchange', function () {
  oriantation();
});
/**
 * vueの記述
 */

var app = new Vue({
  el: "#app",
  data: {
    a: {
      prices: {
        total: 0,
        foods: {
          result: 0,
          sum: 0
        },
        commodity: {
          result: 0,
          sum: 0
        },
        "public": {
          result: 0,
          sum: 0
        }
      }
    },
    b: {
      prices: {
        total: 0,
        foods: {
          result: 0,
          sum: 0
        },
        commodity: {
          result: 0,
          sum: 0
        },
        "public": {
          result: 0,
          sum: 0
        }
      }
    },
    selectedMonth: '',
    today: '',
    take: '',
    give: '',
    deffer: 0,
    showModal: true,
    showMenu: true,
    showAttention: false,
    keyArray: ['who', 'date', 'name', 'type', 'price'],
    typeArray: ['foods', 'commodity', 'public'],
    tempObj: {
      'who': '',
      'date': '',
      'name': '',
      'type': '選択してください',
      'price': '0',
      'listNum': ''
    }
  },
  methods: {
    // 日付の取得
    window: onload = function onload() {
      date = new Date();
      yyyy = date.getFullYear();
      mm = ("0" + (date.getMonth() + 1)).slice(-2);
      dd = ("0" + date.getDate()).slice(-2);
      app.selectedMonth = yyyy + '-' + mm;
      app.today = yyyy + '-' + mm + '-' + dd;
    },
    // 表示月の変更（もどる）
    changePrevMonth: function changePrevMonth() {
      if (mm > 1) {
        mm = ("0" + (Number(mm) - 1)).slice(-2);
      } else {
        yyyy -= 1;
        mm = '12';
      }

      app.selectedMonth = yyyy + '-' + mm;
    },
    // 表示月の変更（すすむ）
    changeNextMonth: function changeNextMonth() {
      if (mm < 12) {
        mm = ("0" + (Number(mm) + 1)).slice(-2);
      } else {
        yyyy += 1;
        mm = '01';
      }

      app.selectedMonth = yyyy + '-' + mm;
    },
    // データを追加した際の再計算
    reCulculate: function reCulculate() {
      LIST_REF.onSnapshot(function (doc) {
        var list = doc.data()['listArray'];
        listNum = list.length;

        var culculate = function culculate() {
          var typeCulculater = function typeCulculater() {
            // 画面上の分類の合計値をリセット
            app.typeArray.forEach(function (item) {
              app.a.prices[item].result = 0;
              app.b.prices[item].result = 0;
            }); // 各分類の合計値を計算

            list.forEach(function (item) {
              var date = item.date.slice(0, -3);
              var who = item.who;
              var type = item.type;

              if (date === app.selectedMonth) {
                app[who].prices[type].sum += parseInt(item.price);
                app[who].prices[type].result = app[who].prices[type].sum;
              }
            }); // 処理内での分類の合計値をリセット

            app.typeArray.forEach(function (item) {
              app.a.prices[item].sum = 0;
              app.b.prices[item].sum = 0;
            });
          };

          var totalCulculater = function totalCulculater() {
            for (var i = 0; i < listNum; i++) {
              app.a.prices.total = app.a.prices.foods.result + app.a.prices.commodity.result + app.a.prices["public"].result;
              app.b.prices.total = app.b.prices.foods.result + app.b.prices.commodity.result + app.b.prices["public"].result;
            }
          };

          var defferCulculater = function defferCulculater() {
            var deffer = app.a.prices.total - app.b.prices.total;

            if (deffer >= 0) {
              app.take = 'B';
              app.give = 'A';
            } else {
              app.take = 'A';
              app.give = 'B';
            }

            app.deffer = Math.abs(deffer) / 2;
          };

          typeCulculater();
          totalCulculater();
          defferCulculater();
        };

        culculate();
      });
    },
    // 購入者の選択
    whoChecker: function whoChecker() {
      Array.prototype.forEach.call($INPUT_WHO, function (elem) {
        if (elem.checked) {
          elem.parentNode.classList.add('is-selected');
        } else {
          elem.parentNode.classList.remove('is-selected');
        }
      });
    },
    // 商品の分類の選択
    typeChecker: function typeChecker() {
      Array.prototype.forEach.call($INPUT_TYPE, function (elem) {
        if (elem.checked) {
          elem.parentNode.classList.add('is-selected');
        } else {
          elem.parentNode.classList.remove('is-selected');
        }
      });
    },
    // データをDBに追加する処理
    addList: function addList() {
      var tempUpdate = function tempUpdate() {
        for (var i = 0; i < app.keyArray.length; i++) {
          app.tempObj[app.keyArray[i]] = document.getElementsByClassName("p-item".concat(app.keyArray[i]))[0].value;
        }

        Array.prototype.filter.call($INPUT_WHO, function (elem) {
          if (elem.checked) {
            app.tempObj[elem.dataset.item] = elem.value;
          }
        });
        Array.prototype.filter.call($INPUT_TYPE, function (elem) {
          if (elem.checked) {
            app.tempObj[elem.dataset.item] = elem.value;
          }
        });
      };

      var addDB = function addDB() {
        listNum++;
        app.tempObj.listNum = listNum;
        LIST_REF.update({
          listArray: firebase.firestore.FieldValue.arrayUnion(app.tempObj)
        }).then(function () {
          console.log("Document successfully written!");
        })["catch"](function (error) {
          console.error("Error writing document: ", error);
        });
      };

      var resetInput = function resetInput() {
        document.itemInput.reset();
        Array.prototype.forEach.call($INPUT_WHO, function (elem) {
          if (Array.prototype.includes.call(elem.parentNode.classList, 'is-selected')) {
            elem.parentNode.classList.remove('is-selected');
          }
        });
        Array.prototype.forEach.call($INPUT_TYPE, function (elem) {
          if (Array.prototype.includes.call(elem.parentNode.classList, 'is-selected')) {
            elem.parentNode.classList.remove('is-selected');
          }
        });
      };

      var showAttention = function showAttention() {
        app.showAttention = true;
      };

      var hiddenAttention = function hiddenAttention() {
        app.showAttention = false;
      };

      if ($INPUT_WHO[0].value === '選択してください' || $INPUT_TYPE[0].value === '選択してください' || $INPUT_PRICE[0].value === "") {
        showAttention();
      } else {
        tempUpdate();
        addDB();
        resetInput();
        hiddenAttention();
      }
    },
    // メニューを閉じる
    closeMenu: function closeMenu() {
      if (!app.showMenu) {
        app.showMenu = true;
      }
    },
    // ログアウト
    logOut: function logOut() {
      firebase.auth().signOut().then(function () {
        localStorage.removeItem('email');
      })["catch"](function (error) {
        console.log("\u30ED\u30B0\u30A2\u30A6\u30C8\u6642\u306B\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F (".concat(error, ")"));
      });
    }
  }
});