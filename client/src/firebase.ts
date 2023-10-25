// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD_uuH4Ub9JGigyTIB2Qjt3mN5WRksVHRo",
  authDomain: "o-e2049.firebaseapp.com",
  projectId: "o-e2049",
  storageBucket: "o-e2049.appspot.com",
  messagingSenderId: "358059857666",
  appId: "1:358059857666:web:13180087f2ca99d371541b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);
