// Import necessary Firebase functions
import { auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from '../js/database.js';
import { db, doc, getDoc } from '../js/database.js';

function showSnackbar(message) {
    const snackbar = document.getElementById('snackbar');
    snackbar.textContent = message;
    snackbar.className = 'show';
    setTimeout(() => { snackbar.className = snackbar.className.replace('show', ''); }, 3000);
}

function getErrorMessage(errorCode) {
    switch (errorCode) {
        case 'auth/invalid-email':
            return 'The email address is not valid. Please check the format.';
        case 'auth/user-not-found':
            return 'No user found with this email address.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again.';
        case 'auth/network-request-failed':
            return 'Network error. Please check your internet connection.';
        default:
            return 'An unknown error occurred. Please try again later.';
    }
}

// Function to validate password strength
function validatePassword(password) {
    const passwordMinLength = 6; // Example: password must be at least 6 characters
    if (password.length < passwordMinLength) {
        return `Password must be at least ${passwordMinLength} characters long.`;
    }
    // Additional password checks can be added here (e.g., for numbers, special characters)
    return null; // Valid password
}


// Email and Password Login
const submit = document.getElementById('submit');
submit.addEventListener("click", async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Step 1: Validate password strength
    const passwordValidationMessage = validatePassword(password);
    if (passwordValidationMessage) {
        showSnackbar(passwordValidationMessage); // Show validation error if password is weak
        return; // Stop further execution
    }

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
        const userMessage = getErrorMessage(error.code);
        setTimeout(() => {
            showSnackbar(userMessage);
        }, 2000);
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
const reset = document.getElementById('reset');
reset.addEventListener("click", function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;

    // Check if email is provided
    if (!email) {
        showSnackbar("Please enter your email in the Username field and click the 'Forgot Password' link again.");
        return; // Stop further execution if email is not provided
    }

    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            showSnackbar("Password reset email sent. Please check your inbox.");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            showSnackbar(errorMessage);
        });
});

