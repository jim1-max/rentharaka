import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA2WfWcTiApXrRwfprxOptg2fGTXGfXcoo",
  authDomain: "rentharaka-ba82e.firebaseapp.com",
  projectId: "rentharaka-ba82e",
  storageBucket: "rentharaka-ba82e.firebasestorage.app",
  messagingSenderId: "998609605600",
  appId: "1:998609605600:web:86e10fc6bd3dc8972a5185",
  measurementId: "G-8ESHR4XQVX"
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
