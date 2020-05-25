'use strict';
$(() => {
  const $totalNum = $('.p-total__num');
  const $foodsNum = $('.p-foods__num');
  const $commodityNum = $('.p-commodity__num');
  const $publicNum = $('.p-public__num');
  const $modalOpen = $('.js-modalOpen');
  const $modalClose = $('.js-modalClose');
  const $inputArea = $('.p-inputArea');
  const $inputAreaInner = $('.p-inputArea__inner');
  const $addItem = $('.js-addItem');
  const $itemDate = $('.p-itemDate');
  const $itemName = $('.p-itemName');
  const $itemType = $('.p-itemType');
  const $itemNum = $('.p-itemNum');
  const $attention = $('<p class="p-attention">未入力の項目があります。</p>');
  let latestNum = () => {
    return localStorage.getItem('latestNum');
  };
  let listNum = latestNum();
  let itemLengthArray = [];
  let tableLength = itemLengthArray.length;
  const tempObj = {'日時': '', '商品名': '', '分類': '', '金額': 0,};
  const numObj = {
    '合計': 0,
    '食品': 0,
    '日用品': 0,
    '公共料金': 0,
  };

  // ブラウザ更新時、DBからリストを取得
  const table = () => {
    for (let i = 1; i <= latestNum(); i ++) {
      itemLengthArray.push(JSON.parse(localStorage.getItem(i)));
    }
  }
  table();
  
  // ブラウザ更新時、各分野の合計を計算して表示する
  const culculation = () => {
    tableLength = itemLengthArray.length;
    const totalCulculation = () => {
      for(let i = 0; i <= tableLength - 1; i ++) {
        numObj.合計 += parseInt(itemLengthArray[i].金額);
      }
      $totalNum.text(numObj.合計);
    }
  
    const foodsCulculation = () => {
      for(let i = 0; i <= tableLength - 1; i ++) {
        if(itemLengthArray[i].分類 === '食品') {
          numObj.食品 += parseInt(itemLengthArray[i].金額);
        }
      }
      $foodsNum.text(numObj.食品);
    }
  
    const commodityCulculation = () => {
      for(let i = 0; i <= tableLength - 1; i ++) {
        if(itemLengthArray[i].分類 === '日用品') {
          numObj.日用品 += parseInt(itemLengthArray[i].金額);
        }
      }
      $commodityNum.text(numObj.日用品);
    }
  
    const publicCulculation = () => {
      for(let i = 0; i <= tableLength - 1; i ++) {
        if(itemLengthArray[i].分類 === '公共料金') {
          numObj.公共料金 += parseInt(itemLengthArray[i].金額);
        }
      }
      $publicNum.text(numObj.公共料金);
    }
  
    totalCulculation();
    foodsCulculation();
    commodityCulculation();
    publicCulculation();
  }
  culculation();

  // 入力画面モーダルの開閉
  const eventModal = () => {
    $modalOpen.on('click', () => {
      $inputArea.removeClass('is-hidden');
    });
    $modalClose.on('click', () => {
      $inputArea.addClass('is-hidden');
      resetInput();
    });
  }
  eventModal();
  
  // 非同期でのリスト追加、更新
  const eventAddItem = () => {
    $addItem.on('click', () => {
      funcAddItem();
    });
  }
  eventAddItem();

  // eventAddItem()での処理
  const showAttention = () => {
    $inputAreaInner.prepend($attention);
  }
  const hiddenAttention = () => {
    $('.p-attention').remove();
  }
  const setTempObj = () => {
    tempObj.日時 = $itemDate.val();
    tempObj.商品名 = $itemName.val();
    tempObj.分類 = $itemType.val();
    tempObj.金額 = $itemNum.val();
  }
  const addListNum = () => {
    listNum ++;
  }
  const addLocalStorage = () => {
    localStorage.setItem(listNum, JSON.stringify(tempObj));
    localStorage.setItem('latestNum', listNum);
  }
  const addTable = () => {
    itemLengthArray.push(JSON.parse(localStorage.getItem(latestNum())));
  }
  const update = () => {
    const addedItemType = itemLengthArray[latestNum() - 1].分類;
    numObj[addedItemType] += parseInt(itemLengthArray[latestNum() - 1].金額);
    $(`[data-type="${addedItemType}"]`).text(numObj[addedItemType]);
    numObj.合計 += parseInt(itemLengthArray[latestNum() - 1].金額);
    $totalNum.text(numObj.合計);
  }
  const resetInput = () => {
    $inputArea.find('input').val('');
    $inputArea.find('select').val('選択してください');
  }
  const funcAddItem = () => {
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
  }
});
