import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4UpeU5F3btkRl36v0pc0zQLXtpTRruDA",
  authDomain: "grocerylist-manager.firebaseapp.com",
  projectId: "grocerylist-manager",
  storageBucket: "grocerylist-manager.firebasestorage.app",
  messagingSenderId: "512665948822",
  appId: "1:512665948822:web:bf76ca3325ed614981a8b7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

signInAnonymously(auth)
  .then(() => console.log("✅ Signed in anonymously"))
  .catch((error) => console.error("Firebase Auth error:", error.message));

export { db };
