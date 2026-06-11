import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-storage.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCHNfTO077WfsMYdecDp-B-oDuNxO797U",
  authDomain: "amsesha-desert.firebaseapp.com",
  projectId: "amsesha-desert",
  storageBucket: "amsesha-desert.firebasestorage.app",
  messagingSenderId: "1038794046646",
  appId: "1:1038794046646:web:1bcd44821d20a577cd7a17",
  measurementId: "G-5ST6SGFS7D"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
