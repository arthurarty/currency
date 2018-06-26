	//collect data from form
	function collectData(){
        console.log("Call to collect data");
        const fromCurrency = document.getElementById('fromCurrency').value;
        const toCurrency = document.getElementById('toCurrency').value;
        const amount = document.getElementById('amount').value;

        let answer = `<p class='text-center'>`;

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
            //console.log(data[query]);

            //store the rate in variable
            const rate = data[query];

            //compute amount in next currency
            const exchange = Number(amount) * rate;

            //store output in answer
            answer += `${amount} ${fromCurrency} equals ${exchange} ${toCurrency} at rate of ${rate}`;
            answer += `<br><button class='btn btn-success' onClick='location.reload()'>Convert more</button></p>`;
            document.getElementById('answer').innerHTML = answer;
            });
        }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
          }  