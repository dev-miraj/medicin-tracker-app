// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // ✅ Ensure this is imported only once
import { getStorage } from "firebase/storage"; // ✅ Import Firebase Storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEHvL57-AVCkCuBMRgnfTe_uwmh3zhQL4",
  authDomain: "medicin-4e3e9.firebaseapp.com",
  projectId: "medicin-4e3e9",
  storageBucket: "medicin-4e3e9.appspot.com", // ✅ Fixed Storage URL
  messagingSenderId: "2724298922",
  appId: "1:2724298922:web:36d6da0d88c5e4def2d0d3",
  measurementId: "G-L0DLPBWXFY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth Initialization (React Native)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firestore & Storage Initialization
export const db = getFirestore(app);