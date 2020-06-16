'use strict';

var $PRICE = document.getElementsByClassName('p-price');
var $INPUT_TYPE = document.getElementsByClassName('p-itemtype');
var $INPUT_PRICE = document.getElementsByClassName('p-itemprice');
var LIST_REF = firebase.firestore().collection("users").doc('list');
var listNum = 0;
var app = new Vue({
  el: "#app",
  data: {
    prices: {
      total: 0,
      foods: 0,
      commodity: 0,
      "public": 0
    },
    showModal: true,
    showAttention: false,
    keyArray: ['date', 'name', 'type', 'price'],
    tempObj: {
      'date': '',
      'name': '',
      'type': '選択してください',
      'price': '0',
      'listNum': ''
    }
  },
  methods: {
    addList: function addList() {
      var tempUpdate = function tempUpdate() {
        for (var i = 0; i < app.keyArray.length; i++) {
          app.tempObj[app.keyArray[i]] = document.getElementsByClassName("p-item".concat(app.keyArray[i]))[0].value;
        }
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
      };

      var showAttention = function showAttention() {
        app.showAttention = true;
      };

      var hiddenAttention = function hiddenAttention() {
        app.showAttention = false;
      };

      if ($INPUT_TYPE[0].value === '選択してください' || $INPUT_PRICE[0].value === "") {
        showAttention();
      } else {
        tempUpdate();
        addDB();
        resetInput();
        hiddenAttention();
      }
    }
  }
});
LIST_REF.onSnapshot(function (doc) {
  var list = doc.data().listArray;
  var foodsSum = 0;
  var commoditySum = 0;
  var publicSum = 0;
  listNum = list.length;

  var foodsCulculater = function foodsCulculater() {
    for (var i = 0; i < listNum; i++) {
      if (list[i].type === 'foods') {
        foodsSum += parseInt(list[i].price);
        app.prices.foods = foodsSum;
      }
    }
  };

  var commodityCulculater = function commodityCulculater() {
    for (var i = 0; i < listNum; i++) {
      if (list[i].type === 'commodity') {
        commoditySum += parseInt(list[i].price);
        app.prices.commodity = commoditySum;
      }
    }
  };

  var publicCulculater = function publicCulculater() {
    for (var i = 0; i < listNum; i++) {
      if (list[i].type === 'public') {
        publicSum += parseInt(list[i].price);
        app.prices["public"] = publicSum;
      }
    }
  };

  var totalCulculation = function totalCulculation() {
    for (var i = 0; i < listNum; i++) {
      app.prices.total = foodsSum + commoditySum + publicSum;
    }
  };

  foodsCulculater();
  commodityCulculater();
  publicCulculater();
  totalCulculation();
});
