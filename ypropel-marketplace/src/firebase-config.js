// src/firebase-config.js
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBf44KDTTX8rMMgTIhr7q4WV2-44mapQII",
    authDomain: "ypropel-marketplace-4e75f.firebaseapp.com",
    projectId: "ypropel-marketplace-4e75f",
    storageBucket: "ypropel-marketplace-4e75f.firebasestorage.app",
    messagingSenderId: "15522752250",
    appId: "1:15522752250:web:2d09fda738a4c057d14b43",
    measurementId: "G-9MX58X7Y0B"
  };

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }
