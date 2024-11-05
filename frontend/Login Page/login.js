// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
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

// when user manually keys in 

const submit = document.getElementById('submit')
submit.addEventListener("click", function (event) {
  event.preventDefault()

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      alert("Logging In")
      window.location.href = "../Homepage/home_teacher.html"
      // ...
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      // ..
    });

})

// when user uses Google Sign-in method
const auth = getAuth(app);
auth.languageCode = "en"
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-login-btn");
googleLogin.addEventListener("click", function () {
    signInWithPopup(auth, provider)
        .then((result) => {
            // Access Token and user info
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            console.log(user);

            // Redirect to the teacher's homepage after successful login
            window.location.href = "../Homepage/home_teacher.html";
        })
        .catch((error) => {
            // Handle Errors here
            console.error("Error during sign-in:", error.message);
        });
});