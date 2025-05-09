// Escape HTML characters (prevent XSS if input is used in DOM)
function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function (m) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[m];
    });
}

// Simple email/phone validation
function isValidUsername(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{10,15}$/; // international phone format
    return emailRegex.test(input) || phoneRegex.test(input);
}

// Toggle account creation options
const createAccountLink = document.getElementById('createAccountLink');
const formActions = document.querySelector('.form-actions');
let optionsVisible = false;

createAccountLink.addEventListener('click', function (event) {
    event.preventDefault();

    const existingOptions = formActions.parentNode.querySelector('.account-options');
    if (optionsVisible && existingOptions) {
        existingOptions.remove();
        optionsVisible = false;
        return;
    }

    if (existingOptions) existingOptions.remove(); // Clear leftovers

    const optionsDiv = document.createElement('div');
    optionsDiv.classList.add('account-options');
    optionsDiv.style.marginTop = '15px';
    optionsDiv.style.width = '100%';

    // Create Driver & Passenger buttons
    const driverButton = document.createElement('a');
    driverButton.href = 'signupDriver.html';
    driverButton.textContent = 'For Driver';
    driverButton.classList.add('account-option-button');

    const passengerButton = document.createElement('a');
    passengerButton.href = 'signupPassenger.html';
    passengerButton.textContent = 'For Passenger';
    passengerButton.classList.add('account-option-button');

    optionsDiv.appendChild(driverButton);
    optionsDiv.appendChild(passengerButton);
    formActions.parentNode.insertBefore(optionsDiv, formActions);
    optionsVisible = true;
});

// Validate and sanitize username before redirection
document.getElementById('next-button').addEventListener('click', function () {
    let rawUsername = document.getElementById("username").value || '';
    const trimmed = rawUsername.trim();

    if (!trimmed) {
        alert("Please enter your email or phone number.");
        return;
    }

    if (!isValidUsername(trimmed)) {
        alert("Please enter a valid email address or phone number.");
        return;
    }

    const safeUsername = escapeHTML(trimmed);
    console.log(`Signing in with: ${safeUsername}`);

    window.location.href = "password.html";
});
