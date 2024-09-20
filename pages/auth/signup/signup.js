// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvei_29gFMSgB9D0zycMIqHNeS7-9sPY0",
  authDomain: "ad-portal-c31c9.firebaseapp.com",
  databaseURL: "https://ad-portal-c31c9-default-rtdb.firebaseio.com",
  projectId: "ad-portal-c31c9",
  storageBucket: "ad-portal-c31c9.appspot.com",
  messagingSenderId: "779401475882",
  appId: "1:779401475882:web:d03277664f3927a7511053",
  measurementId: "G-KX5HNXTQ71"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");

window.signupUser = () => {
  let obj = {
    username: username.value,
    email: email.value,
    password: password.value,
  };

  createUserWithEmailAndPassword(auth, obj.email, obj.password)
  .then((res)=>{
    obj.id = res.user.uid;
    obj.userType = "user";

    Swal.fire({
      icon: 'success',
      title: 'Loged In!',
      text: 'You have successfully sign up!',
    })

    const reference = doc(db, "users", obj.id)
    setDoc(reference, obj)
    .then(()=>{
      const userObj = JSON.stringify(obj)
      localStorage.setItem("user", userObj)
      setTimeout(() => {
        window.location.replace('../login/login.html');
      }, 3000); 
    })
    .catch((e)=>{
      alert("E-message",e.message)
    })
  })
  .catch((err)=>{
    console.log("Error-message",err.message)
    Swal.fire({
      icon: 'warning',
      title: 'Required',
      text: 'Please enter all fields',
    });
  })
};