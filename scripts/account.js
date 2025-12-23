import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firstNameEl = document.getElementById('firstName');
const lastNameEl = document.getElementById('lastName');
const emailEl = document.getElementById('email');
const logoutBtn = document.getElementById('logoutBtn');
const mainContent = document.querySelector('main') || document.body;

// Initially hide content to prevent flash
mainContent.style.visibility = 'hidden';

onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        firstNameEl.textContent = data.firstName || "N/A";
        lastNameEl.textContent = data.lastName || "N/A";
        emailEl.textContent = data.email || user.email;
      } else {
        console.warn("No user data found in Firestore.");
        emailEl.textContent = user.email;
      }
      mainContent.style.visibility = 'visible';
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Error loading account data.");
      window.location.href = "login.html";
    }
  } else {
    window.location.href = "login.html";
  }
});

logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    window.location.href = "login.html";
  } catch (error) {
    console.error("Logout error:", error);
  }
});

