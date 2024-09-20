// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// Your web app's Firebase configuration
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

let email = document.getElementById("email");
let password = document.getElementById("password");

window.loginUser = async () => {
  try {
    const emailValue = email.value;
    const passwordValue = password.value;

    // Validate email and password fields
    if (!emailValue || !passwordValue) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please enter both email and password.',
      });
      return;
    }

    // Sign in the user with email and password
    const { user } = await signInWithEmailAndPassword(auth, emailValue, passwordValue);
    const userId = user.uid;

    // Fetch user data from Firestore
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      // Store user data in localStorage
      const userData = userSnap.data();
      localStorage.setItem("user", JSON.stringify(userData));

      // Debugging log
      console.log("User Data:", userData);

      // Check userType and redirect accordingly
      if (userData.userType === 'admin') {
        // Redirect to admin panel
        window.location.replace("../../admin-pannel/admin.html");
      } else if (userData.userType === 'Student') { // Check for 'Student'
        // Redirect to student panel
        window.location.replace("../../student-pannel/student.html");
      } else {
        // Handle unexpected userType
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Unknown user type!',
        });
      }

      // Display success message
      Swal.fire({
        icon: 'success',
        title: 'Logged In!',
        text: 'You have successfully logged in!',
      });
    } else {
      // Handle case where user data is not found
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'User data not found!',
      });
    }
  } catch (error) {
    // Handle login errors
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: error.message.includes("user-not-found") || error.message.includes("wrong-password")
        ? 'Invalid email or password.'
        : 'An unexpected error occurred. Please try again later.',
    });
  }
};
