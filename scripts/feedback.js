// feedback.js
// This script handles the feedback form submission using Google Apps Script Web App

  document.getElementById("feedbackForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const email = document.getElementById("feedbackEmail").value;

    const message = document.getElementById("feedbackMessage").value;

    const scriptURL = "https://script.google.com/macros/s/AKfycbwWJum9JXpfwi9YuvBu5XE6KegOiNX2cTugzOVr3fwZmkfxHycZ_CSnb2OvWoc4bzBOVw/exec"; 

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

        alert("Feedback sent successfully. Thank you!");

        document.getElementById("feedbackForm").reset();

      } else {

        alert("Error: " + result.error);

      }

    })

    .catch(error => alert("Error submitting form: " + error.message));

  });
