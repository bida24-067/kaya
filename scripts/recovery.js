import { auth } from "./firebase-config.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const form = document.getElementById("recoveryForm");
const recoveryBtn = form.querySelector('button[type="submit"]');
const recoveryMessage = document.getElementById("recoveryMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("resetEmail").value;

  // Visual feedback
  const originalBtnText = recoveryBtn.textContent;
  recoveryBtn.disabled = true;
  recoveryBtn.textContent = "Sending...";
  recoveryMessage.textContent = "";

  try {
    await sendPasswordResetEmail(auth, email);
    recoveryMessage.textContent = "✅ Reset email sent! Check your inbox.";
    recoveryMessage.style.color = "#28a745";
  } catch (error) {
    console.error("Recovery error:", error);
    recoveryMessage.textContent = "❌ Error: " + error.message;
    recoveryMessage.style.color = "#dc3545";
  } finally {
    recoveryBtn.disabled = false;
    recoveryBtn.textContent = originalBtnText;
  }
});

