import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0VUUtlfPOdgcwinMNXBu_3OQzY5GVHmw",
  authDomain: "highlights-sync.firebaseapp.com",
  projectId: "highlights-sync",
  storageBucket: "highlights-sync.appspot.com",
  messagingSenderId: "322342360162",
  appId: "1:322342360162:web:67d18eaf10020388e76d3b",
  measurementId: "G-Y23CJPZKVF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();