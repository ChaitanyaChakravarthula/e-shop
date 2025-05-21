// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products 

const firebaseConfig = {
  apiKey: "AIzaSyCtjyKsO_oJPNjIDzcDmddO33GY9cwPkcU",
  authDomain: "e-shop-984ff.firebaseapp.com",
  projectId: "e-shop-984ff",
  storageBucket: "e-shop-984ff.firebasestorage.app",
  messagingSenderId: "554801931775",
  appId: "1:554801931775:web:69e71b1db7ab62d6e933ca"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB,auth } ;