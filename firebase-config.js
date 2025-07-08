import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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
export const auth = getAuth(app);
export const db = getFirestore(app);
 