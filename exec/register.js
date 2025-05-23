window.onerror = function(message, source, lineno, colno, error) {
    console.log(`Error: ${message} at ${source}:${lineno}:${colno}`);
    alert(`Error: ${message}`);
    return true; // Prevent the default browser error handling
  };
//document.getElementById('registerForm').addEventListener('submit', function(event) {
function showError(message) {
    // Access the element by its ID
    var errorMessageElement = document.getElementById('errorMessage');
    var errorMessageElementp = document.getElementById('errorMessageP');
    // Set the text content to the error message
    errorMessageElement.style.display = 'flex'
    errorMessageElementp.textContent = message;
    setTimeout(() => {
      errorMessageElement.style.display = 'none';
  }, 5000);
  }
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
function showSucc(message) {
    var succMessageElement = document.getElementById('succMessage');
    var succMessageElementp = document.getElementById('succMessageP');
    // Set the text content to the error message
    succMessageElement.style.display = 'flex'
    succMessageElementp.textContent = message;
    setTimeout(() => {
      succMessageElement.style.display = 'none';
  }, 5000);
  }
function containsSpaces(input) {
  const hasSpace = /\s/.test(input); // Checks for any whitespace
  return hasSpace;
};
var toscb = document.getElementById('toss'); // Example validation logic
const button = document.getElementById('btn-1')
// const = username2 = "hhh"
button.addEventListener('click', function(event) {
  event.preventDefault()
  // Example: Generating an error
  // This will trigger the error handler
  const email = document.getElementById('email').value;
  const username = document.getElementById('usern').value;
  const password = document.getElementById('pass').value;
  const confirmpassword = document.getElementById('cpass').value;
  if (!username || !password || !confirmpassword || !email) {
    showError('Please fill in all the required info.');
    return;
  }
  if (username.length < 8) {
    showError("The username should be atleast 8 letters long")
    return;
  }
  if (password.length < 12) {
    showError("The password should be atleast 12 letters long")
    return;
  }
  if (containsSpaces(username)) {
    showError("Usernames much not contain spaces");
    return;
}
  if (containsSpaces(password)) {
    showError("Passwords must not contain spaces");
    return;
  }
  if (!isValidEmail(email)) {
    showError("Please enter valid email address")
    return;
  }
  if (password !== confirmpassword) {
    showError('The password does not match.');
    return;
  } // Get the checkbox state
  if (!toscb.checked) {
    showError('You need to agree to our terms of conditions to register.');
    return;
  }
  // Add more validation as needed
  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      username, email, password }),
  })
  .then(response => response.text())
  .then(data => {
    showSucc(data);
    setTimeout(() => {
      window.location.href = '/user/login';
    }, 3000)
  })
  .catch(error => {
    showError(error);
    console.error('Error:', error);
  });
});
//)};

function deleteAccount(email) {
  fetch('/delete-account', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email }),
  })
  .then (response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return response.text();
  })
  .then (data => {
    console.log(data);
  })
  .catch(error => {
    console.error("Error deleting account", error)
  });
};

//deleteAccount("aaronfernan78@gmail.com");

document.addEventListener('DOMContentLoaded', function() {
  const passwordInput1 = document.getElementById('pass');
  const passwordInput2 = document.getElementById('cpass');
  const togglePasswordd = document.getElementById('tpassword1');
  const togglePassworddd = document.getElementById('tpassword2');

  function setupToggle(passwordInput1, togglePasswordd, passwordInput2) {
    togglePasswordd.addEventListener('click', function() {
      // Toggle the type attribute
      const type = passwordInput1.getAttribute('type') === 'password' ? 'text': 'password';
      passwordInput1.setAttribute('type', type);

      // Toggle the eye icon
      this.classList.toggle('bxs-hide'); // Show password icon
      this.classList.toggle('bxs-show'); // Hide password icon
    });
    //});
  };

  setupToggle(passwordInput1, togglePasswordd);
  setupToggle(passwordInput2, togglePassworddd);
});

//button.addEventListener('click', function(event) {
//event listener
//event.preventDefault()
//gets all inputs
//const email = document.getElementById('email').value;
//const username = document.getElementById('usern').value;
//const password = document.getElementById('pass').value;
//const confirmpassword = document.getElementById('cpass').value;
//Creates user in db
//if (validateRegister(username, password, confirmpassword, email)) {
// Proceed with login
//showError(''); // Clear the error message
//createUserWithEmailAndPassword(auth, email, password)
//.then((userCredential) => {
//IGNIRE THIS PART

// Add more validation as needed
//const user = userCredential.user;
//showSucc('Successfully Registered!');
//Redirects to the login page
//window.location.href = 'login.html';

//})
//gets all the errors
//.catch((error) => {
//const errorCode = error.code;
//let message = '';

// Customize error messages based on error codes
//switch (errorCode) {
//case 'auth/invalid-email':
//message = 'The email address is not valid.';
//break;
//case 'auth/email-already-in-use':
//message = 'The email address is already in use.';
//break;
//case 'auth/weak-password':
//message = 'The password is too weak.';
//break;
//default:
//message = 'An error occurred. Please try again.';
//}

//errorMessage.textContent = message;
//});
//}
//})