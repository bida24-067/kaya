// This file is part of Kaya Botswana
// recovery.js
// This script handles password recovery functionality
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCB84FTOdVHbdMKSBLqKZ_YvZYl_QSVZek",
    authDomain: "kahiyaco.firebaseapp.com",
    projectId: "kahiyaco",
    storageBucket: "kahiyaco.firebasestorage.app",
    messagingSenderId: "1034759752393",
    appId: "1:1034759752393:web:659872d47eef97c251db18",
    measurementId: "G-ZB13WQQKGF"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const form = document.getElementById("recoveryForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("resetEmail").value;

    try {
      await sendPasswordResetEmail(auth, email);
      alert("✅ Reset email sent! Check your inbox.");
    } catch (error) {
      alert("❌ Error: " + error.message);
    }
  });
