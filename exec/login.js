// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBk0Wkeo0pXM8y93SfaYZEhLX6bz6QbMgA",
    authDomain: "biscuit-labs-db.firebaseapp.com",
    projectId: "biscuit-labs-db",
    storageBucket: "biscuit-labs-db.appspot.com",
    messagingSenderId: "441739020347",
    appId: "1:441739020347:web:5c5f60ad0b2202b30a341e",
    measurementId: "G-LHD9MF7JMC"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
const button = document.getElementById('btn');
const auth = getAuth(app);
//adds a event for it to trigger
function showError(message) {
    // Access the element by its ID
    var errorMessageElement = document.getElementById('errorMessage');
    // Set the text content to the error message
    errorMessageElement.textContent = message;
}

function showSucc(message) {
    // Access the element by its ID
    var succMessageElement = document.getElementById('succMessage');
    // Set the text content to the error message
    succMessageElement.textContent = message;
}


function validateLogin(email, password) {
    // Example validation logic
    if (!email || !password) {
        showError('Please fill in all the required info.');
        return false;
    }
    // Add more validation as needed
    return true;
} 

document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('pass');
    const togglePassword = document.getElementById('tpassword');

    togglePassword.addEventListener('click', function() {
        // Toggle the type attribute
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Toggle the eye icon
        this.classList.toggle('bxs-hide'); // Show password icon
        this.classList.toggle('bxs-show'); // Hide password icon
    });
}); 

button.addEventListener('click', function (event) {
  //what to do when the trigger is activated
  event.preventDefault()
const email = document.getElementById('email').value;
const password = document.getElementById('pass').value;
//searches the user in db
  if (validateLogin(email, password)) {
        // Proceed with login
        showError(''); // Clear the error message
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      showSucc('Successfully Logged in!')
    //redirect to home oage oncd logged-in
      window.location.href = 'index.html';
})
//if any errors send(s) it here
    .catch((error) => {
      const errorCode = error.code;
      let message = '';
      
      // Customize error messages based on error codes
      switch (errorCode) {
        case 'auth/invalid-email':
          message = 'The email address is not valid.';
          break;
        case 'auth/invalid-credential':
          message = 'The credentials do not match any account.';
          break;
        default:
          message = 'An error occurred. Please try again.';
      }
      
      errorMessage.textContent = message;
});
}
})