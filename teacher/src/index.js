import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app';
import "firebase/analytics";

// Set up Firebase config
var firebaseConfig = {
  apiKey: "AIzaSyAJ0fQ_zRpTXxm7BpJmsJs5nwQGlOPjg6M",
  authDomain: "readingaid-42419.firebaseapp.com",
  projectId: "readingaid-42419",
  storageBucket: "readingaid-42419.appspot.com",
  messagingSenderId: "1007749465687",
  appId: "1:1007749465687:web:571c35a33931c55edc4512",
  measurementId: "G-YLN0KB3RL5",
  databaseURL: "https://readingaid-42419-default-rtdb.firebaseio.com/",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
