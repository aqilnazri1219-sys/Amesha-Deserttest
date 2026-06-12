import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// Sila pastikan API Key di bawah adalah milik projek Firebase awak sendiri
const firebaseConfig = {
    apiKey: "AIzaSyAy_vIJ0kwEP3oQzevH8_r1APGT3yVrcoY",
    authDomain: "amesha-desert-test.firebaseapp.com",
    projectId: "amesha-desert-test",
    storageBucket: "amesha-desert-test.firebasestorage.app",
    messagingSenderId: "629952708350",
    appId: "1:629952708350:web:acc6e732819681f5a96faf",
    measurementId: "G-7CP2VFR2HX"
  };

// 1. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. PASTIKAN ADA PERKATAAN 'export' DI BAWAH NI:
export const auth = getAuth(app);
export const db = getFirestore(app);
