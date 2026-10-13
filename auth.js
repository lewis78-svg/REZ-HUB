
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// REZ HUB AND TECHNOLOGY - Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDm_NjHz8Bs6D1tucGYKoA9boUNY5FOtMI",
  authDomain: "rez-hub-technology.firebaseapp.com",
  projectId: "rez-hub-technology",
  storageBucket: "rez-hub-technology.firebasestorage.app",
  messagingSenderId: "700283422991",
  appId: "1:700283422991:web:4ccc543132a4d235d8167a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get HTML elements
const form = document.getElementById("authForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const toggleBtn = document.getElementById("toggleBtn");
const message = document.getElementById("message");

let registering = false;

// Display registration or login mode
nameInput.hidden = true;
nameInput.required = false;

toggleBtn.addEventListener("click", () => {
  registering = !registering;

  nameInput.hidden = !registering;
  nameInput.required = registering;

  passwordInput.autocomplete = registering
    ? "new-password"
    : "current-password";

  submitBtn.textContent = registering
    ? "Create Account"
    : "Log In";

  toggleBtn.textContent = registering
    ? "Already have an account? Log In"
    : "Need an account? Register";

  message.textContent = "";
});

// Register students or log in existing students
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  submitBtn.disabled = true;
  toggleBtn.disabled = true;
  message.textContent = "Please wait...";

  try {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (registering) {
      const fullName = nameInput.value.trim();

      if (!fullName) {
        throw new Error("Please enter your full name.");
      }

      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(credential.user, {
        displayName: fullName
      });
    } else {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    }

    message.textContent = "Login successful. Opening lessons...";

    window.location.href = "lessons.html";

  } catch (error) {
    const messages = {
      "auth/email-already-in-use":
        "This email already has an account. Please log in.",

      "auth/invalid-email":
        "Please enter a valid email address.",

      "auth/weak-password":
        "Your password is too weak. Use at least 6 characters.",

      "auth/invalid-credential":
        "Incorrect email or password. Please try again.",

      "auth/network-request-failed":
        "Network error. Check your internet connection.",

      "auth/too-many-requests":
        "Too many attempts. Please wait and try again.",

      "auth/operation-not-allowed":
        "Email and password sign-in is not enabled in Firebase."
    };

    message.textContent =
      messages[error.code] || error.message || "Something went wrong.";

  } finally {
    submitBtn.disabled = false;
    toggleBtn.disabled = false;
  }
});
