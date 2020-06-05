"use strict";

var $PRICE = document.getElementsByClassName('p-price');
var $INPUT_TYPE = document.getElementsByClassName('p-itemtype');
var $INPUT_PRICE = document.getElementsByClassName('p-itemprice');
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
    defaultValues: {
      'date': '',
      'name': '',
      'type': '',
      'price': 0
    },
    tempObj: {
      'date': '',
      'name': '',
      'type': '選択してください',
      'price': '0'
    },
    lists: [],
    listCount: 0
  },
  methods: {
    addList: function addList() {
      var tempUpdate = function tempUpdate() {
        for (var i = 0; i < app.keyArray.length; i++) {
          app.tempObj[app.keyArray[i]] = document.getElementsByClassName("p-item".concat(app.keyArray[i]))[0].value;
        }

        console.log(app.tempObj);
      };

      var setStrage = function setStrage() {
        app.listCount++;
        localStorage.setItem(app.listCount, JSON.stringify(app.tempObj));
        localStorage.setItem('latestCount', app.listCount);
        console.log(app.lists);
      };

      var setLists = function setLists() {
        app.lists.push(app.tempObj);
      };

      var typeCulculater = function typeCulculater() {
        var type = app.lists[app.listCount - 1].type;
        app.prices[type] += parseInt(app.lists[app.listCount - 1].price);
      };

      var totalCulculater = function totalCulculater() {
        console.log(111);
        app.prices['total'] += parseInt(app.lists[app.listCount - 1].price);
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
        setStrage();
        setLists();
        typeCulculater();
        totalCulculater();
        resetInput();
        hiddenAttention();
      }
    }
  }
});

var updateListCount = function updateListCount() {
  app.listCount = localStorage.getItem('latestCount');
};

var updateLists = function updateLists() {
  for (var i = 1; i <= app.listCount; i++) {
    app.lists.push(JSON.parse(localStorage.getItem(i)));
  }
};

var reCulculation = function reCulculation() {
  var listsLength = app.lists.length;

  var totalCulculation = function totalCulculation() {
    for (var i = 0; i < listsLength; i++) {
      app.prices.total += parseInt(app.lists[i].price);
    }
  };

  var foodsCulculation = function foodsCulculation() {
    for (var i = 0; i < listsLength; i++) {
      if (app.lists[i].type === 'foods') {
        app.prices.foods += parseInt(app.lists[i].price);
      }
    }
  };

  var commodityCulculation = function commodityCulculation() {
    for (var i = 0; i < listsLength; i++) {
      if (app.lists[i].type === 'commodity') {
        app.prices.commodity += parseInt(app.lists[i].price);
      }
    }
  };

  var publicCulculation = function publicCulculation() {
    for (var i = 0; i < listsLength; i++) {
      if (app.lists[i].type === 'public') {
        app.prices["public"] += parseInt(app.lists[i].price);
      }
    }
  };

  totalCulculation();
  foodsCulculation();
  commodityCulculation();
  publicCulculation();
};

updateListCount();
updateLists();
reCulculation();