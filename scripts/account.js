
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
  import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

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
  const db = getFirestore(app);

  const firstNameEl = document.getElementById('firstName');
  const lastNameEl = document.getElementById('lastName');
  const emailEl = document.getElementById('email');
  const logoutBtn = document.getElementById('logoutBtn');

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        firstNameEl.textContent = data.firstName || "N/A";
        lastNameEl.textContent = data.lastName || "N/A";
        emailEl.textContent = data.email || user.email;
      } else {
        alert("No user data found.");
      }
    } else {
      alert("You are not logged in. Redirecting to login...");
      window.location.href = "login.html";
    }
  });

  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
  });
