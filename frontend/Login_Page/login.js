// Import necessary Firebase functions
import { auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from '../js/database.js';
import { db, doc, getDoc } from '../js/database.js';

function showSnackbar(message) {
    const snackbar = document.getElementById('snackbar');
    snackbar.textContent = message;
    snackbar.className = 'show';
    setTimeout(() => { snackbar.className = snackbar.className.replace('show', ''); }, 3000);
}


// Email and Password Login
const submit = document.getElementById('submit');
submit.addEventListener("click", async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (user) {
            const userEmail = user.email;

            // Check if the user's email exists in the "Students" collection
            const studentDocRef = doc(db, 'Students', userEmail);
            const studentDocSnap = await getDoc(studentDocRef);

            if (studentDocSnap.exists()) {
                showSnackbar("Welcome, Student!");
                setTimeout(() => window.location.href = "../Student/Homepage/home_student.html", 1000);
                // window.location.href = "../Student/Homepage/home_student.html";
            } else {
                showSnackbar("Welcome, Teacher!");
                setTimeout(() => window.location.href = "../Teacher/Homepage/home_teacher.html", 1000);
                // window.location.href = "../Teacher/Homepage/home_teacher.html";
            }
        }
    } catch (error) {
        console.error("Error logging in:", error.code, error.message);
        alert(error.message);
    }
});

// Google Sign-In
auth.languageCode = "en";
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-login-btn");
googleLogin.addEventListener("click", async function () {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        if (user) {
            const userEmail = user.email;

            // Check if the user's email exists in the "Students" collection
            const studentDocRef = doc(db, 'Students', userEmail);
            const studentDocSnap = await getDoc(studentDocRef);

            if (studentDocSnap.exists()) {
                console.log('User found in Students collection:', studentDocSnap.data());
                showSnackbar("Welcome, Student!");
                setTimeout(() => window.location.href = "../Student/Homepage/home_student.html", 1000);
            } else {
                showSnackbar("Welcome, Teacher!");
                setTimeout(() => window.location.href = "../Teacher/Homepage/home_teacher.html", 1000);
            }
        }
    } catch (error) {
        console.error("Error during Google sign-in:", error.message);
        alert("Failed to sign in. Please try again.");
    }
});

// when user forgets password and wants to reset
const reset = document.getElementById('reset')
reset.addEventListener("click", function (event) {
    event.preventDefault()
    const email = document.getElementById('email').value

    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            // ..
            alert("Email sent")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            // ..
        });
})
