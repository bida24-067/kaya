// newsletter.js
// This script handles newsletter subscription form submission

const form = document.getElementById('newsletterForm');

const message = document.getElementById('message');

form.addEventListener('submit', async (e) => {

  e.preventDefault();

  const email = form.email.value.trim();

  message.textContent = '⏳ Submitting...';

  try {

    await fetch("https://script.google.com/macros/s/AKfycbw2pVqWa0Bzd0un4str0cLEzWC1OZXxAR6yUiCNhpnzlxAEGZHFWGUymcPdApbKAIds/exec", {

      method: "POST",

      mode: "no-cors",  // no response expected due to CORS

      headers: {

        "Content-Type": "application/json"

      },

      body: JSON.stringify({ email })

    });

    message.textContent = "✅ Submitted, Stay tuned for more updates!";

    form.reset();

  } catch (err) {

    console.error(err);

    message.textContent = "❌ Submission failed.";

  }

});

 