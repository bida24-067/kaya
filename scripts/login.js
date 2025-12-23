import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const loginForm = document.getElementById("loginForm");
const loginBtn = loginForm.querySelector('button[type="submit"]');
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Visual feedback
  const originalBtnText = loginBtn.textContent;
  loginBtn.disabled = true;
  loginBtn.textContent = "Logging in...";
  loginMessage.textContent = "";

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "account.html";
  } catch (error) {
    console.error("Login error:", error);
    loginMessage.textContent = "❌ " + (error.code === 'auth/invalid-credential' ? 'Invalid email or password.' : error.message);
    loginMessage.style.color = "#dc3545";
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = originalBtnText;
  }
});