// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  authDomain: "edufly-61bfe.firebaseapp.com",
  projectId: "edufly-61bfe",
  storageBucket: "edufly-61bfe.firebasestorage.app",
  messagingSenderId: "467191151194",
  appId: "1:467191151194:web:cac30fd47ebff5a7233663",
  measurementId: "G-NQN411353D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const submit = document.getElementById('submit')
submit.addEventListener("click", function(event){
  event.preventDefault()

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          alert("Creating Account...")
          window.location.href = "../Login Page/login_teacher.html"
          // ...
      }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage)
          // ..
  });

})