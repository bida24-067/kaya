import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

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

  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "account.html";
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  });