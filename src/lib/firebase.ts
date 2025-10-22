// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3eJPmzI6Br7GvQcfL-E1GbsPh0ie-mL0",
  authDomain: "rai-constructions-solutions.firebaseapp.com",
  projectId: "rai-constructions-solutions",
  storageBucket: "rai-constructions-solutions.firebasestorage.app",
  messagingSenderId: "130809639409",
  appId: "1:130809639409:web:c54a3f9fc547cfdf1a5450",
  measurementId: "G-4M9NNWBSTZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app, "raiconstructionsolution");
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
