'use strict';

$(function () {
  var $totalNum = $('.p-total__num');
  var $foodsNum = $('.p-foods__num');
  var $commodityNum = $('.p-commodity__num');
  var $publicNum = $('.p-public__num');
  var $modalOpen = $('.js-modalOpen');
  var $modalClose = $('.js-modalClose');
  var $inputArea = $('.p-inputArea');
  var $inputAreaInner = $('.p-inputArea__inner');
  var $addItem = $('.js-addItem');
  var $itemDate = $('.p-itemDate');
  var $itemName = $('.p-itemName');
  var $itemType = $('.p-itemType');
  var $itemNum = $('.p-itemNum');
  var $attention = $('<p class="p-attention">未入力の項目があります。</p>');

  var latestNum = function latestNum() {
    return localStorage.getItem('latestNum');
  };

  var listNum = latestNum();
  var itemLengthArray = [];
  var tableLength = itemLengthArray.length;
  var tempObj = {
    '日時': '',
    '商品名': '',
    '分類': '',
    '金額': 0
  };
  var numObj = {
    '合計': 0,
    '食品': 0,
    '日用品': 0,
    '公共料金': 0
  }; // ブラウザ更新時、DBからリストを取得

  var table = function table() {
    for (var i = 1; i <= latestNum(); i++) {
      itemLengthArray.push(JSON.parse(localStorage.getItem(i)));
    }
  };

  table(); // ブラウザ更新時、各分野の合計を計算して表示する

  var culculation = function culculation() {
    tableLength = itemLengthArray.length;

    var totalCulculation = function totalCulculation() {
      for (var i = 0; i <= tableLength - 1; i++) {
        numObj.合計 += parseInt(itemLengthArray[i].金額);
      }

      $totalNum.text(numObj.合計);
    };

    var foodsCulculation = function foodsCulculation() {
      for (var i = 0; i <= tableLength - 1; i++) {
        if (itemLengthArray[i].分類 === '食品') {
          numObj.食品 += parseInt(itemLengthArray[i].金額);
        }
      }

      $foodsNum.text(numObj.食品);
    };

    var commodityCulculation = function commodityCulculation() {
      for (var i = 0; i <= tableLength - 1; i++) {
        if (itemLengthArray[i].分類 === '日用品') {
          numObj.日用品 += parseInt(itemLengthArray[i].金額);
        }
      }

      $commodityNum.text(numObj.日用品);
    };

    var publicCulculation = function publicCulculation() {
      for (var i = 0; i <= tableLength - 1; i++) {
        if (itemLengthArray[i].分類 === '公共料金') {
          numObj.公共料金 += parseInt(itemLengthArray[i].金額);
        }
      }

      $publicNum.text(numObj.公共料金);
    };

    totalCulculation();
    foodsCulculation();
    commodityCulculation();
    publicCulculation();
  };

  culculation(); // 入力画面モーダルの開閉

  var eventModal = function eventModal() {
    $modalOpen.on('click', function () {
      $inputArea.removeClass('is-hidden');
    });
    $modalClose.on('click', function () {
      $inputArea.addClass('is-hidden');
      resetInput();
    });
  };

  eventModal(); // 非同期でのリスト追加、更新

  var eventAddItem = function eventAddItem() {
    $addItem.on('click', function () {
      funcAddItem();
    });
  };

  eventAddItem(); // eventAddItem()での処理

  var showAttention = function showAttention() {
    $inputAreaInner.prepend($attention);
  };

  var hiddenAttention = function hiddenAttention() {
    $('.p-attention').remove();
  };

  var setTempObj = function setTempObj() {
    tempObj.日時 = $itemDate.val();
    tempObj.商品名 = $itemName.val();
    tempObj.分類 = $itemType.val();
    tempObj.金額 = $itemNum.val();
  };

  var addListNum = function addListNum() {
    listNum++;
  };

  var addLocalStorage = function addLocalStorage() {
    localStorage.setItem(listNum, JSON.stringify(tempObj));
    localStorage.setItem('latestNum', listNum);
  };

  var addTable = function addTable() {
    itemLengthArray.push(JSON.parse(localStorage.getItem(latestNum())));
  };

  var update = function update() {
    var addedItemType = itemLengthArray[latestNum() - 1].分類;
    numObj[addedItemType] += parseInt(itemLengthArray[latestNum() - 1].金額);
    $("[data-type=\"".concat(addedItemType, "\"]")).text(numObj[addedItemType]);
    numObj.合計 += parseInt(itemLengthArray[latestNum() - 1].金額);
    $totalNum.text(numObj.合計);
  };

  var resetInput = function resetInput() {
    $inputArea.find('input').val('');
    $inputArea.find('select').val('選択してください');
  };

  var funcAddItem = function funcAddItem() {
    if ($inputArea.find('.p-itemNum').val() === '' || $inputArea.find('select').val() === '選択してください') {
      showAttention();
    } else {
      hiddenAttention();
      setTempObj();
      addListNum();
      addLocalStorage();
      addTable();
      update();
      resetInput();
    }
  };
});