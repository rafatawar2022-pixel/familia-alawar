import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCyBMYLz7FmTdKCCegyFatnbb8PK05LVwY",
  authDomain: "familia-d5ae2.firebaseapp.com",
  projectId: "familia-d5ae2",
  storageBucket: "familia-d5ae2.firebasestorage.app",
  messagingSenderId: "251522687008",
  appId: "1:251522687008:web:aa27299290a7acddf21c45"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);