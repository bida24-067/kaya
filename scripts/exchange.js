// exchange.js
// This script handles currency conversion for pricing on the pricing page
const exchangeRates = {
  BWP: 1,
  USD: 0.074, // Example: 1 BWP = 0.073 USD
  EUR: 0.064, // Example: 1 BWP = 0.067 EUR
  ZAR: 1.328   // Example: 1 BWP = 1.32 ZAR
};

const currencySymbols = {
  BWP: 'P',
  USD: '$',
  EUR: '€',
  ZAR: 'R'
};

const basePrices = [810, 3191.50, 6040]; // Prices in BWP for Launch Pad, Growth Engine, Authority Suite

function updatePrices(selectedCurrency) {
  document.querySelectorAll('#price').forEach((priceEl, idx) => {
    const rate = exchangeRates[selectedCurrency];
    const symbol = currencySymbols[selectedCurrency];
    const converted = Math.round(basePrices[idx] * rate);
    priceEl.textContent = `${symbol} ${converted.toLocaleString()}`;
  });
}

document.getElementById('currencySelector').addEventListener('change', function() {
  updatePrices(this.value);
});

// Initialize prices on page load
updatePrices('BWP');