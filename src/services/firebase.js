import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey:
    "AIzaSyAneGvCrooISMzE9MymC3GPlIs6XzB00Rg",

  authDomain:
    "movie-ai-40981.firebaseapp.com",

  projectId:
    "movie-ai-40981",

  storageBucket:
    "movie-ai-40981.firebasestorage.app",

  messagingSenderId:
    "280480850077",

  appId:
    "1:280480850077:web:d9b882f936a33ca9cb3474",
};

// INITIALIZE FIREBASE
const app =
  initializeApp(firebaseConfig);

// AUTH
export const auth =
  getAuth(app);

// GOOGLE PROVIDER
export const provider =
  new GoogleAuthProvider();