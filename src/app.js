let leftinput = document.querySelector('#curr-left');
let rightinput = document.querySelector('#curr-right');
let amountInput = document.querySelector('#from-input');
let resultInput = document.querySelector('#to-result');
let convertBtn = document.querySelector('#btn');

// Populate dropdowns
fetch('https://api.frankfurter.dev/v1/latest')
  .then(res => res.json())
  .then((data) => {
    let currencies = ['EUR', ...Object.keys(data.rates)];

    currencies.forEach(currency => {
      //left input
      let option1 = document.createElement('option');
      option1.value = currency;
      option1.textContent = currency;
      leftinput.appendChild(option1);
      //right input
      let option2 = document.createElement('option');
      option2.value = currency;
      option2.textContent = currency;
      rightinput.appendChild(option2);
    });
  });

// Convert currency when button is clicked
convertBtn.addEventListener('click', () => {
  let fromCurrency = leftinput.value;
  let toCurrency = rightinput.value;
  let amount = amountInput.value;

  if (fromCurrency === toCurrency) {
    alert("Choose two different currencies.");
    return;
  }

  if (amount === '' || amount <= 0) {
    alert("Enter a valid amount.");
    return;
  }

  let url = `https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      let converted = data.rates[toCurrency]; 
      resultInput.value = converted;
    })
    .catch(err => {
      alert("Something went wrong.");
      console.error(err);
    });
});

