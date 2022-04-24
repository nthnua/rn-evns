// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAlOjk030KMmlLTwDUWTVD1vB-T_3o_Ij8",
    authDomain: "rn-evns.firebaseapp.com",
    projectId: "rn-evns",
    storageBucket: "rn-evns.appspot.com",
    messagingSenderId: "696181640992",
    appId: "1:696181640992:web:f87d921e78aaf7168f1145"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export function addUser(userId, name, type, subscriptions) {
    const db = getDatabase();
    const reference = ref(db, 'users/' + userId);
    set(reference, {
        name,
        type,
        subscriptions
    });
}