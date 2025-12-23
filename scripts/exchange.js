// exchange.js
// This script handles currency conversion for pricing on the pricing page using live rates

const STATIC_RATES = {
  BWP: 1,
  USD: 0.075,
  EUR: 0.064,
  ZAR: 1.302,
};

const currencySymbols = {
  BWP: 'P',
  USD: '$',
  EUR: '€',
  ZAR: 'R'
};

const basePrices = [810, 3492, 6340]; // Prices in BWP
let currentRates = { ...STATIC_RATES };

/**
 * Fetches latest exchange rates from a public API
 */
async function fetchLiveRates() {
  const cacheKey = 'kaya_exchange_rates';
  const cachedData = sessionStorage.getItem(cacheKey);

  // Try to use cache if available and fresh (less than 1 hour old)
  if (cachedData) {
    const { rates, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < 3600000) {
      console.log("Using cached exchange rates");
      return rates;
    }
  }

  try {
    const response = await fetch('https://open.er-api.com/v6/latest/BWP');
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();
    const rates = {
      BWP: 1,
      USD: data.rates.USD,
      EUR: data.rates.EUR,
      ZAR: data.rates.ZAR,
    };

    // Cache the successful response
    sessionStorage.setItem(cacheKey, JSON.stringify({
      rates,
      timestamp: Date.now()
    }));

    console.log("Fetched live exchange rates");
    return rates;
  } catch (error) {
    console.warn("Using fallback static exchange rates:", error.message);
    return STATIC_RATES;
  }
}

function updatePrices(selectedCurrency) {
  document.querySelectorAll('#price').forEach((priceEl, idx) => {
    const rate = currentRates[selectedCurrency] || STATIC_RATES[selectedCurrency];
    const symbol = currencySymbols[selectedCurrency];
    const converted = Math.round(basePrices[idx] * rate);
    priceEl.textContent = `${symbol} ${converted.toLocaleString()}`;
  });
}

// Event listener for currency selection
const currencySelector = document.getElementById('currencySelector');
if (currencySelector) {
  currencySelector.addEventListener('change', function () {
    updatePrices(this.value);
  });
}

// Initialize on load
async function init() {
  currentRates = await fetchLiveRates();
  const initialCurrency = currencySelector ? currencySelector.value : 'BWP';
  updatePrices(initialCurrency);
}

init();