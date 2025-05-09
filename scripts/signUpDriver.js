
//This function is used to escape HTML characters to prevent XSS attacks
// It replaces &, <, >, ", and ' with their corresponding HTML entities and converts them to a safe format by making them string
//instead of special characters
function escapeHTML(str) {
return str.replace(/[&<>"']/g, function(m) {
    return ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
    })[m];
});
}

// Password toggle
const passwordFields = document.querySelectorAll('.password-input-container-signup input[type="password"]');
const toggleIcons = document.querySelectorAll('.password-toggle-icon-signup i');
toggleIcons.forEach((icon, index) => {
icon.parentElement.addEventListener('click', function () {
    const input = passwordFields[index];
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});
});

// Password confirmation check
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const confirmPasswordHint = document.getElementById('confirmPasswordHint');

function validatePasswordMatch() {
if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordHint.textContent = 'Passwords do not match!';
    confirmPasswordInput.setCustomValidity("Passwords don't match");
} else {
    confirmPasswordHint.textContent = '';
    confirmPasswordInput.setCustomValidity('');
}
}

passwordInput.addEventListener('input', validatePasswordMatch);
confirmPasswordInput.addEventListener('input', validatePasswordMatch);

// File input handler with MIME type validation
const allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png'];
const fileInputs = document.querySelectorAll('.file-input');

fileInputs.forEach(input => {
input.addEventListener('change', function (e) {
    const file = e.target.files[0];
    const displaySpan = input.closest('.file-upload-wrapper').querySelector('.file-name-display');
    const uploadButton = input.closest('.file-upload-wrapper').querySelector('.file-upload-button');

    if (file) {
    if (!allowedFileTypes.includes(file.type)) {
        alert('Invalid file type. Allowed: PDF, JPEG, PNG.');
        input.value = '';
        displaySpan.textContent = '';
        uploadButton?.classList.remove('file-selected');
        return;
    }
    displaySpan.textContent = `Selected: ${escapeHTML(file.name)}`;
    uploadButton?.classList.add('file-selected');
    } else {
    displaySpan.textContent = '';
    uploadButton?.classList.remove('file-selected');
    }
});
});

// Password strength check
//The function is use to check the strenght of the password for high input validation
function isStrongPassword(password) {
return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
}

// Form submit
const signupForm = document.getElementById('signupDriverForm');
signupForm.addEventListener('submit', function (event) {
event.preventDefault();

const email = document.getElementById('email').value.trim();
const password = passwordInput.value;

// Escape email (basic XSS protection for display use)
const safeEmail = escapeHTML(email);

// Validate password strength
if (!isStrongPassword(password)) {
    alert('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
    passwordInput.focus();
    return;
}

// Password match check
if (password !== confirmPasswordInput.value) {
    confirmPasswordHint.textContent = 'Passwords do not match!';
    confirmPasswordInput.focus();
    return;
}

// File input check
const requiredFiles = document.querySelectorAll('.file-input[required]');
let filesMissing = false;
requiredFiles.forEach(input => {
    if (!input.files || input.files.length === 0) {
    filesMissing = true;
    input.closest('.file-upload-wrapper').style.border = '1px solid #e74c3c';
    } else {
    input.closest('.file-upload-wrapper').style.border = 'none';
    }
});

if (filesMissing) {
    alert('Please upload all required documents.');
    return;
}

alert(`Sign up successful for ${safeEmail} (simulation)!`);
});
