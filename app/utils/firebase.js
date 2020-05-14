import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyD7Wi69dVJO9AQdKwLemGLGwnh6K9idAlU",
    authDomain: "tenedores-96c0a.firebaseapp.com",
    databaseURL: "https://tenedores-96c0a.firebaseio.com",
    projectId: "tenedores-96c0a",
    storageBucket: "tenedores-96c0a.appspot.com",
    messagingSenderId: "21256492329",
    appId: "1:21256492329:web:f2eab1990c99b2d60a1338"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);