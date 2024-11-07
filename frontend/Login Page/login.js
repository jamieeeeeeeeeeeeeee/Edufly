import { auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '../js/database.js';

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
// const auth = getAuth(app);
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