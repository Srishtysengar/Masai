const firebaseConfig = {
  apiKey: "AIzaSyCKS8dnGBv_pYt9YbP2d64G0TLQ3aANxCE",
  authDomain: "quickcart-b361e.firebaseapp.com",
  projectId: "quickcart-b361e",
  storageBucket: "quickcart-b361e.firebasestorage.app",
  messagingSenderId: "431888201102",
  appId: "1:431888201102:web:a4df987458a374e702e0df",
  databaseURL:"https://quickcart-b361e-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

firebase.initializeApp(firebaseConfig);
window.db=firebase.database();
