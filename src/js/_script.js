const $PRICE = document.getElementsByClassName('p-price');
const $INPUT_TYPE = document.getElementsByClassName('p-itemtype');
const $INPUT_PRICE = document.getElementsByClassName('p-itemprice');

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
    defaultValues: {
      'date': '', 
      'name': '', 
      'type': '', 
      'price': 0,
    },
    tempObj: {
      'date': '', 
      'name': '', 
      'type': '選択してください', 
      'price': '0',
    },
    lists: [],
    listCount: 0,
  },
  methods: {
    addList () {
      
      const tempUpdate = () => {
        for (let i = 0; i < app.keyArray.length; i ++) {
          app.tempObj[app.keyArray[i]] = document.getElementsByClassName(`p-item${app.keyArray[i]}`)[0].value;
        } 
        console.log(app.tempObj);
      }
      
      const setStrage = () => {
        app.listCount ++;
        localStorage.setItem(app.listCount, JSON.stringify(app.tempObj));
        localStorage.setItem('latestCount', app.listCount);
        console.log(app.lists);
      }
      
      const setLists = () => {
        app.lists.push(app.tempObj);
      }
      
      const typeCulculater = () => {
        const type = app.lists[app.listCount - 1].type;
        app.prices[type] += parseInt(app.lists[app.listCount - 1].price);
      }
      
      const totalCulculater = () => {
        console.log(111);
        app.prices['total'] += parseInt(app.lists[app.listCount - 1].price);
      }
      
      const resetInput = () => {
        document.itemInput.reset();
      }

      const showAttention = () => {
        app.showAttention = true;
      }

      const hiddenAttention = () => {
        app.showAttention = false;
      }

      if ( $INPUT_TYPE[0].value === '選択してください' || $INPUT_PRICE[0].value  === "") {
        showAttention()
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
  },
});

const updateListCount = () => {
  app.listCount = localStorage.getItem('latestCount');
}

const updateLists = () => {
  for (let i = 1; i <= app.listCount; i ++) {
    app.lists.push(JSON.parse(localStorage.getItem(i)));
  }
}

const reCulculation = () => {
  const listsLength = app.lists.length;
  const totalCulculation = () => {
    for(let i = 0; i < listsLength; i ++) {
      app.prices.total += parseInt(app.lists[i].price);
    }
  }

  const foodsCulculation = () => {
    for(let i = 0; i < listsLength; i ++) {
      if(app.lists[i].type === 'foods') {
        app.prices.foods += parseInt(app.lists[i].price);
      }
    }
  }

  const commodityCulculation = () => {
    for(let i = 0; i < listsLength; i ++) {
      if(app.lists[i].type === 'commodity') {
        app.prices.commodity += parseInt(app.lists[i].price);
      }
    }
  }

  const publicCulculation = () => {
    for(let i = 0; i < listsLength; i ++) {
      if(app.lists[i].type === 'public') {
        app.prices.public += parseInt(app.lists[i].price);
      }
    }
  }

  totalCulculation();
  foodsCulculation();
  commodityCulculation();
  publicCulculation();
}

updateListCount()
updateLists();
reCulculation();