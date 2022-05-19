const firebaseConfig = {
    apiKey: "AIzaSyDWpFXJJ8b3XzAlTm0LAdKgr3QpaRwuuhw",
    authDomain: "movie-app-80306.firebaseapp.com",
    projectId: "movie-app-80306",
    storageBucket: "movie-app-80306.appspot.com",
    messagingSenderId: "780283292847",
    appId: "1:780283292847:web:16da8c5210968b4ee8385a",
    measurementId: "G-9EZFMTD5MB",
};

// Initialize Firebase with a "default" Firebase project
const defaultProject = firebase.initializeApp(firebaseConfig);
console.log(defaultProject.name);  // "[DEFAULT]"
const container = document.getElementById('container');

window.onload = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        checkIfLoggedIn();
    });
};

let displayName = "";
let email = "";
let photoURL = "";
let emailVerified = "";
let uid = "";

function checkIfLoggedIn() {
    const user = firebase.auth().currentUser;
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        if (pageName === "index") {
            // location.href = "account.html"
            console.log("user logged in - index");
        }

        displayName = user.displayName;
        email = user.email;
        photoURL = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;

        //document.getElementById('welcome_message').innerText = "Welcome back " + displayName + ", this is your account";
        document.getElementById('welcome_description').innerText = "Welcome back " + displayName + ", this is your account";

    } else {
        // No user is signed in.
        if (pageName === "account") {
            //  location.href = "index.html"
            console.log("user isn't logged in - account");
        }
    }

}

function loginSubmit() {
    const email = document.getElementById('login_email').value;
    const password = document.getElementById('login_password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            firebase.auth().currentUser = userCredential.user;
            console.log(user);
            location.href = "account.html"
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log("errorCode: " + errorCode);
            console.log("errorMessage: " + errorMessage);
        });

}

function sendResetEmail() {
    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            // Password reset email sent!
            // ..
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });
}

function signupSubmit() {
    const name = document.getElementById('signup_name').value;
    const email = document.getElementById('signup_email').value;
    const password = document.getElementById('signup_password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            firebase.auth().currentUser = userCredential.user;
            console.log(user);

            user.updateProfile({
                displayName: name,
            }).then(() => {
                // Update successful
                firebase.auth().currentUser.sendEmailVerification()
                    .then(() => {
                        // Email verification sent!
                        location.href = "account.html";
                    });
            }).catch((error) => {
                // An error occurred
                // ...
            });

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;


            console.log("errorCode: " + errorCode);
            console.log("errorMessage: " + errorMessage);
        });
}