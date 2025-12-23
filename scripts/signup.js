import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const form = document.getElementById("signupForm");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupBtn = form.querySelector('button[type="submit"]');
const signupMessage = document.getElementById("signupMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  signupMessage.textContent = "";

  // Basic Validation
  if (!firstName || !lastName || !email || !password) {
    signupMessage.textContent = "❌ Please fill in all fields.";
    signupMessage.style.color = "#dc3545";
    return;
  }

  if (password.length < 6) {
    signupMessage.textContent = "❌ Password should be at least 6 characters.";
    signupMessage.style.color = "#dc3545";
    return;
  }

  // Visual feedback
  const originalBtnText = signupBtn.textContent;
  signupBtn.disabled = true;
  signupBtn.textContent = "Creating account...";

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      firstName,
      lastName,
      email,
      createdAt: new Date()
    });

    signupMessage.textContent = "✅ Account created successfully!";
    signupMessage.style.color = "#28a745";

    setTimeout(() => {
      window.location.href = "account.html";
    }, 1500);

  } catch (error) {
    console.error("Signup error:", error);
    signupMessage.textContent = "❌ Failed to create account: " + error.message;
    signupMessage.style.color = "#dc3545";
  } finally {
    signupBtn.disabled = false;
    signupBtn.textContent = originalBtnText;
  }
});

