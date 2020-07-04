'use strict';
const $PRICE = document.getElementsByClassName('p-price');
const $INPUT_WHO = document.getElementsByClassName('p-itemwho');
const $INPUT_TYPE = document.getElementsByClassName('p-itemtype');
const $INPUT_PRICE = document.getElementsByClassName('p-itemprice');
const LIST_REF = firebase.firestore().collection("users").doc('list');
let listNum = 0;


const app = new Vue({
  el: "#app",
  data: {
    a: {
      prices: {
        total: 0,
        foods: {
          result: 0,
          sum: 0,
        },
        commodity: {
          result: 0,
          sum: 0,
        },
        public: {
          result: 0,
          sum: 0,
        },
      },
    },
    b: {
      prices: {
        total: 0,
        foods: {
          result: 0,
          sum: 0,
        },
        commodity: {
          result: 0,
          sum: 0,
        },
        public: {
          result: 0,
          sum: 0,
        },
      },
    },
    take: '',
    give: '',
    deffer: 0,
    showModal: true,
    showAttention: false,
    keyArray: ['who', 'date', 'name', 'type', 'price'],
    tempObj: {
      'who': '選択してください',
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
        console.log(app.tempObj['who']);
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
      
      if ($INPUT_WHO[0].value === '選択してください' || $INPUT_TYPE[0].value === '選択してください' || $INPUT_PRICE[0].value  === "") {
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

  listNum = list.length;

  const foodsCulculater = () => {
    for(let i = 0; i < listNum; i ++) {
      if (list[i].who === 'a') {
        if(list[i].type === 'foods') {
          app.a.prices.foods.sum += parseInt(list[i].price);
          app.a.prices.foods.result = app.a.prices.foods.sum;
        }
      } else {
        if(list[i].type === 'foods') {
          app.b.prices.foods.sum += parseInt(list[i].price);
          app.b.prices.foods.result = app.b.prices.foods.sum;
        }
      }
    }
    app.a.prices.foods.sum = 0;
    app.b.prices.foods.sum = 0;
  };

  const commodityCulculater = () => {
    for(let i = 0; i < listNum; i ++) {
      if (list[i].who === 'a') {
        if(list[i].type === 'commodity') {
          app.a.prices.commodity.sum += parseInt(list[i].price);
          app.a.prices.commodity.result = app.a.prices.commodity.sum;
        }
      } else {
        if(list[i].type === 'commodity') {
          app.b.prices.commodity.sum += parseInt(list[i].price);
          app.b.prices.commodity.result = app.b.prices.commodity.sum;
        }
      }
    }
    app.a.prices.commodity.sum = 0;
    app.b.prices.commodity.sum = 0;
  };

  const publicCulculater = () => {
    for(let i = 0; i < listNum; i ++) {
      if (list[i].who === 'a') {
        if(list[i].type === 'public') {
          app.a.prices.public.sum += parseInt(list[i].price);
          app.a.prices.public.result = app.a.prices.public.sum;
        }
      } else {
        if(list[i].type === 'public') {
          app.b.prices.public.sum += parseInt(list[i].price);
          app.b.prices.public.result = app.b.prices.public.sum;
        }
      }
    }
    app.a.prices.public.sum = 0;
    app.b.prices.public.sum = 0;
  };

  const totalCulculater = () => {
    for(let i = 0; i < listNum; i ++) {
      app.a.prices.total = app.a.prices.foods.result + app.a.prices.commodity.result + app.a.prices.public.result;
      app.b.prices.total = app.b.prices.foods.result + app.b.prices.commodity.result + app.b.prices.public.result;
    }
  };

  const defferCulculater = () => {
    const deffer = app.a.prices.total - app.b.prices.total;
    if (deffer >= 0) {
      app.take = 'B';
      app.give = 'A';
    } else {
      app.take = 'A';
      app.give = 'B';
    }
    app.deffer = parseInt(deffer) / 2;
  }

  foodsCulculater();
  commodityCulculater();
  publicCulculater();
  totalCulculater();
  defferCulculater()
});