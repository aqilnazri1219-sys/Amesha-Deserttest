import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// Ambil elemen UI
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const goToRegister = document.getElementById('go-to-register');
const goToLogin = document.getElementById('go-to-login');

// Fungsi tukar paparan borang (Toggle UI)
goToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
});

goToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

// --- FUNGSI DAFTAR AKAUN (REGISTER) ---
document.getElementById('form-register').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nama = document.getElementById('reg-nama').value;
    const telefon = document.getElementById('reg-telefon').value;
    const alamat = document.getElementById('reg-alamat').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const role = document.getElementById('reg-role').value;

    try {
        // 1. Daftar pengguna dalam Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Simpan maklumat detail profil ke Firestore menggunakan UID pengguna
        await setDoc(doc(db, "users", user.uid), {
            nama: nama,
            telefon: telefon,
            alamat: alamat,
            email: email,
            role: role, // 'customer' atau 'admin'
            tarikhDaftar: new Date()
        });

        alert("Pendaftaran berjaya! Sila log masuk.");
        document.getElementById('form-register').reset();
        goToLogin.click(); // Kembali ke skrin login

    } catch (error) {
        console.error("Ralat pendaftaran:", error);
        alert("Gagal mendaftar: " + error.message);
    }
});

// --- FUNGSI LOG MASUK (LOGIN) ---
document.getElementById('form-login').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        // 1. Log masuk menggunakan Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. Ambil data 'role' pengguna dari Firestore untuk tentukan hala tuju (Redirect)
        const userDoc = await getDoc(doc(db, "users", user.uid));
        
        if (userDoc.exists()) {
            const userData = userDoc.data();
            
            // Semak peranan (Role)
            if (userData.role === 'admin') {
                alert("Selamat datang Admin!");
                window.location.href = "admin.html"; // Hala ke dashboard admin
            } else {
                alert("Selamat datang Pelanggan!");
                window.location.href = "customer.html"; // Hala ke dashboard customer
            }
        } else {
            alert("Data pengguna tidak ditemui di pangkalan data.");
        }

    } catch (error) {
        console.error("Ralat log masuk:", error);
        alert("Log masuk gagal: " + error.message);
    }
});
