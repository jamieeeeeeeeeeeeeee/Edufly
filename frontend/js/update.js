import { auth, onAuthStateChanged, signOut } from './database.js';
auth.languageCode = "en";

/// Monitor authentication state with a logout flag
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        const profileLink = document.getElementById('profileLink');
        if (profileLink) {
            profileLink.textContent = `👤 Profile`;
        }
    } else {
        // Check if the logout flag is set, and only redirect if it isn't
        if (!localStorage.getItem('isLoggingOut')) {
            window.location.href = "../../Login_Page/login.html";
        }
    }
});

// // Logout functionality
// document.getElementById("logout-btn").addEventListener("click", () => {
//     signOut(auth).then(() => {
//         alert("Logged out successfully");
//         window.location.href = "../../Login_page/login.html";
//     }).catch((error) => {
//         alert("Error logging out: " + error.message);
//     });
// });

// // Logout functionality with Snackbar
// document.getElementById("logout-btn").addEventListener("click", () => {
//     signOut(auth)
//         .then(() => {
//             showSnackbar("Logged out successfully!");
            
//             // Delay the redirection by 1 second
//             setTimeout(() => {
//                 window.location.href = "../../Login_page/login.html";
//             }, 1000);
//         })
//         .catch((error) => {
//             showSnackbar("Error logging out: " + error.message, true);
//         });
// });

// Logout functionality with Snackbar
document.getElementById("logout-btn").addEventListener("click", () => {
    // Set the logout flag in local storage
    localStorage.setItem('isLoggingOut', 'true');

    signOut(auth)
        .then(() => {
            showSnackbar("Logged out successfully!");
            
            // Delay redirection for the snackbar display
            setTimeout(() => {
                localStorage.removeItem('isLoggingOut'); // Clear the logout flag
                window.location.href = "../../Login_Page/login.html"; // Redirect after snackbar
            }, 1000); // Adjust delay to match snackbar display time
        })
        .catch((error) => {
            showSnackbar("Error logging out: " + error.message, true);
            localStorage.removeItem('isLoggingOut'); // Clear flag if error occurs
        });
});


// Function to show the snackbar
function showSnackbar(message, isError = false) {
    const snackbar = document.getElementById("snackbar");
    
    // Check if the snackbar element exists
    if (!snackbar) {
        console.error("Snackbar element not found!");
        return;
    }

    snackbar.textContent = message;

    // Change background color if it's an error
    snackbar.style.backgroundColor = isError ? '#dc3545' : '#000';

    // Show the snackbar
    snackbar.classList.add("show");

    // Hide the snackbar after 3 seconds
    setTimeout(() => {
        snackbar.classList.remove("show");
    }, 3000);
}






