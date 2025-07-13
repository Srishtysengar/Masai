import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const email = document.getElementById("email");
const password = document.getElementById("password");

document.getElementById("signup-btn").addEventListener("click", (e) => {
  e.preventDefault();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      localStorage.setItem("uid", userCredential.user.uid);
      window.location.href = "dashboard.html";
    });
});

document.getElementById("login-btn").addEventListener("click", (e) => {
  e.preventDefault();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      localStorage.setItem("uid", userCredential.user.uid);
      window.location.href = "dashboard.html";
    });
});