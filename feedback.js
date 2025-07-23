// feedback.js
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

  // Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyCB84FTOdVHbdMKSBLqKZ_YvZYl_QSVZek",
    authDomain: "kahiyaco.firebaseapp.com",
    projectId: "kahiyaco",
    storageBucket: "kahiyaco.firebasestorage.app",
    messagingSenderId: "1034759752393",
    appId: "1:1034759752393:web:659872d47eef97c251db18",
    measurementId: "G-ZB13WQQKGF"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Submit Feedback
  const feedbackForm = document.getElementById("feedbackForm");

  feedbackForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("feedbackEmail").value;
    const message = document.getElementById("feedbackMessage").value;

    try {
      await addDoc(collection(db, "feedback"), {
        email: email,
        message: message,
        createdAt: serverTimestamp()
      });

      alert("Recieved With Love! Thank you for your feedback.");
      feedbackForm.reset();
    } catch (error) {
      alert("❌ Error submitting feedback: " + error.message);
    }
  });
