	//collect data from form
	function collectData(){
        console.log("Call to collect data");
        const fromCurrency = document.getElementById('fromCurrency').value;
        const toCurrency = document.getElementById('toCurrency').value;
        let answer = '';

        let query = `${fromCurrency}_${toCurrency}`;

        //send data collected to api
        fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`)
        .then(
        function(response) {
            if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
            response.status);
            return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
            console.log(data[query]);
            const rate = data[query];
            answer = `${fromCurrency} to ${toCurrency} at rate of ${rate} is `;
            document.getElementById('answer').innerHTML = answer;
            });
        }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
          }  
          