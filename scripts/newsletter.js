// newsletter.js
// This script handles newsletter subscription form submission

const form = document.getElementById('newsletterForm');
const message = document.getElementById('message');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = form.email.value.trim();

  // Visual feedback
  message.textContent = '⏳ Submitting...';
  message.style.color = "white";
  submitBtn.disabled = true;

  try {
    // Mode 'no-cors' is used because Google Apps Script might satisfy the request 
    // but not return CORS headers for the POST request.
    await fetch("https://script.google.com/macros/s/AKfycbw2pVqWa0Bzd0un4str0cLEzWC1OZXxAR6yUiCNhpnzlxAEGZHFWGUymcPdApbKAIds/exec", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    message.textContent = "✅ Submitted, Stay tuned for more updates!";
    message.style.color = "#28a745";
    form.reset();

  } catch (err) {
    console.error("Newsletter error:", err);
    message.textContent = "❌ Submission failed.";
    message.style.color = "#dc3545";
  } finally {
    submitBtn.disabled = false;
  }
});