// js/firebase.js
window.MLL = window.MLL || {};

// I took these keys from the code you just pasted
const firebaseConfig = {
  apiKey: "AIzaSyAWEkGuNkaAW9FxbOQ-jibs1V1oleT1sLg",
  authDomain: "ltag-a18f5.firebaseapp.com",
  projectId: "ltag-a18f5",
  storageBucket: "ltag-a18f5.firebasestorage.app",
  messagingSenderId: "178548672394",
  appId: "1:178548672394:web:a20fffc1d3e70a8090aa73",
  measurementId: "G-FZQKDR451D"
};

// Initialize Firebase (Compat/Script Tag version)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// ⚠️ Initialize Services & Expose them to your app
// Your dashboard.html and auth.js rely on these specific variables:
window.MLL.db = firebase.firestore();
window.MLL.auth = firebase.auth();