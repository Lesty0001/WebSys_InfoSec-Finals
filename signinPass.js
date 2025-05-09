// This script handles the sign-in process for the user. It validates the input and redirects to the password page.
document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    var username = document.getElementById("username").value;
    if (username) {
        // Here you can add more validation or send data to server
        window.location.href = "password.html";
    } else {
        alert("Please enter your email or phone number.");
    }
});