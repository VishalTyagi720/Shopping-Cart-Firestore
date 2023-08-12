import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import * as firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
// import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyCaEbyLG0etWQFs2b8rpenIhYMoMg4VtyM",
  authDomain: "cart-2380c.firebaseapp.com",
  projectId: "cart-2380c",
  storageBucket: "cart-2380c.appspot.com",
  messagingSenderId: "547009535091",
  appId: "1:547009535091:web:988b46094406afccde5e06"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);