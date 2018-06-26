import idb from 'idb';

// =============create service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }

// =================== create db to store list of countries.
const dbPromise = idb.open('currencyConvert', 1, upgradeDB => {
    upgradeDB.createObjectStore('currencies', {
        keyPath: 'id'
    });
  });


//==================use api to get list of all currencies.
fetch('https://free.currencyconverterapi.com/api/v5/currencies?')
.then(
  function(response) {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' +
        response.status);
      return;
    }

    // Examine the text in the response
    response.json().then(function(data) {
        //console.log(data['results']);

        dbPromise.then(function(db) {
            let tx = db.transaction('currencies', 'readwrite');
            let currencieStore = tx.objectStore('currencies');

            //loop through result and add to db
            for(let x in data['results']){ 
                currencieStore.put(data['results'][x])
                //console.log(data['results'][x].currencyName);
                //console.log(x.currencyName);
            }     
        });
    });
  }
)
.catch(function(err) {
  console.log('Fetch Error :-S', err);
});

//query the db
dbPromise.then(function(db) {
    const tx = db.transaction('currencies');
    let currencieStore = tx.objectStore('currencies');
    let currencies = currencieStore.getAllKeys();
    
    //console.log(currencieStore.getAll());
    return currencieStore.getAllKeys();
  }).then( function(currencies){
    console.log(currencies);
    let output = `output`;
    for(let x in currencies){
        output += `<option>${currencies[x]}</option>`;
    }
    document.getElementById("fromCurrency").innerHTML = output;
    document.getElementById("toCurrency").innerHTML = output;
  });

  