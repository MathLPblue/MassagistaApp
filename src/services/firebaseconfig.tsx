// firebaseConfig.js
import { initializeApp } from '@firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwZ4sA-UKJFGFs71-s8OBFHMMoZKwSWvI",
  authDomain: "massagem-do-marlon.firebaseapp.com",
  projectId: "massagem-do-marlon",
  storageBucket: "massagem-do-marlon.appspot.com",
  messagingSenderId: "332265225627",
  appId: "1:332265225627:web:1e5f5c012308e5ae26353e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
