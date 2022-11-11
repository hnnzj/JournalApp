// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyA_8N8zIfbdf9zeW5Q6vGMPNzXG3qgxR5Y',
    authDomain: 'journal-app-95c00.firebaseapp.com',
    projectId: 'journal-app-95c00',
    storageBucket: 'journal-app-95c00.appspot.com',
    messagingSenderId: '615469841819',
    appId: '1:615469841819:web:55ffdf269facfe8d08b53e',
    measurementId: 'G-37G6GZ4HJ6',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
