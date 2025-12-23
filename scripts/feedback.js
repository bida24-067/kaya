// feedback.js
// This script handles the feedback form submission using Google Apps Script Web App

const feedbackForm = document.getElementById("feedbackForm");
const resultMsg = document.getElementById("feedbackMessageResult");
const submitBtn = feedbackForm.querySelector('button[type="submit"]');

feedbackForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("feedbackEmail").value;
  const message = document.getElementById("feedbackMessage").value;
  const scriptURL = "https://script.google.com/macros/s/AKfycbwWJum9JXpfwi9YuvBu5XE6KegOiNX2cTugzOVr3fwZmkfxHycZ_CSnb2OvWoc4bzBOVw/exec";

  // Visual feedback
  resultMsg.textContent = "⏳ Sending feedback...";
  resultMsg.style.color = "white";
  submitBtn.disabled = true;

  fetch(scriptURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      'email': email,
      'message': message,
    })
  })
    .then(response => response.json())
    .then(result => {
      if (result.result === "success") {
        resultMsg.textContent = "✅ Feedback sent successfully. Thank you!";
        resultMsg.style.color = "#28a745";
        feedbackForm.reset();
      } else {
        resultMsg.textContent = "❌ Error: " + result.error;
        resultMsg.style.color = "#dc3545";
      }
    })
    .catch(error => {
      console.error("Feedback error:", error);
      resultMsg.textContent = "❌ Error submitting form: " + error.message;
      resultMsg.style.color = "#dc3545";
    })
    .finally(() => {
      submitBtn.disabled = false;
    });
});
