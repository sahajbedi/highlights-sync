import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAco3QHK4bc0meBP_TjjcrxpuIGVP_3GW0",
  authDomain: "react-test-3301e.firebaseapp.com",
  projectId: "react-test-3301e",
  storageBucket: "react-test-3301e.appspot.com",
  messagingSenderId: "116996115315",
  appId: "1:116996115315:web:0a5e8d171bacd975c19306"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();