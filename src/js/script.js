'use strict';
const $PRICE = document.getElementsByClassName('p-price');
const $INPUT_TYPE = document.getElementsByClassName('p-itemtype');
const $INPUT_PRICE = document.getElementsByClassName('p-itemprice');
const LIST_REF = firebase.firestore().collection("users").doc('list');
let listNum = 0;


const app = new Vue({
  el: "#app",
  data: {
    prices: {
      total: 0,
      foods: 0,
      commodity: 0,
      public: 0,
    },
    showModal: true,
    showAttention: false,
    keyArray: ['date', 'name', 'type', 'price'],
    tempObj: {
      'date': '', 
      'name': '', 
      'type': '選択してください', 
      'price': '0',
      'listNum': '',
    },
  },
  methods: {
    addList () {
      const tempUpdate = () => {
        for (let i = 0; i < app.keyArray.length; i ++) {
          app.tempObj[app.keyArray[i]] = document.getElementsByClassName(`p-item${app.keyArray[i]}`)[0].value;
        } 
      };
      
      const addDB = () => {
        listNum ++;
        app.tempObj.listNum = listNum;
        LIST_REF.update({
          listArray: firebase.firestore.FieldValue.arrayUnion(app.tempObj)
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
      };
      
      const resetInput = () => {
        document.itemInput.reset();
      };
      
      const showAttention = () => {
        app.showAttention = true;
      };
      
      const hiddenAttention = () => {
        app.showAttention = false;
      };
      
      if ($INPUT_TYPE[0].value === '選択してください' || $INPUT_PRICE[0].value  === "") {
        showAttention()
      } else {
        tempUpdate();
        addDB();
        resetInput();
        hiddenAttention();
      }
    }
  },
});

LIST_REF.onSnapshot((doc) => {
  const list = doc.data().listArray;
  let foodsSum = 0;
  let commoditySum = 0;
  let publicSum = 0;

  listNum = list.length;

  const foodsCulculater = () => {
    for(let i = 0; i < listNum; i ++) {
      if(list[i].type === 'foods') {
        foodsSum += parseInt(list[i].price);
        app.prices.foods = foodsSum;
      }
    }
  };

  const commodityCulculater = () => {
    for(let i = 0; i < listNum; i ++) {
      if(list[i].type === 'commodity') {
        commoditySum += parseInt(list[i].price);
        app.prices.commodity = commoditySum;
      }
    }
  };

  const publicCulculater = () => {
    for(let i = 0; i < listNum; i ++) {
      if(list[i].type === 'public') {
        publicSum += parseInt(list[i].price);
        app.prices.public = publicSum;
      }
    }
  };

  const totalCulculation = () => {
    for(let i = 0; i < listNum; i ++) {
      app.prices.total = foodsSum + commoditySum + publicSum;
    }
  };

  foodsCulculater();
  commodityCulculater();
  publicCulculater();
  totalCulculation();
});