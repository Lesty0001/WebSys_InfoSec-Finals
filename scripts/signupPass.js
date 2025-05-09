// 🔐 Escape special characters to prevent XSS when displaying user inputs
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

// ✅ Strong password validation (8+ chars, upper, lower, digit, special char)
function isStrongPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
}

// 🔒 Password visibility toggle
const passwordFields = document.querySelectorAll('.password-input-container-signup input[type="password"]');
const toggleIcons = document.querySelectorAll('.password-toggle-icon-signup i');

toggleIcons.forEach((icon, index) => {
    icon.parentElement.addEventListener('click', function() {
        const input = passwordFields[index];
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
});

// 📁 File input display and MIME type validation
const allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png'];
const fileInputs = document.querySelectorAll('.file-input');

fileInputs.forEach(input => {
    input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        const displaySpan = input.closest('.file-upload-wrapper').querySelector('.file-name-display');
        const uploadButton = input.closest('.file-upload-wrapper').querySelector('.file-upload-button');

        if (file) {
            if (!allowedFileTypes.includes(file.type)) {
                alert('Invalid file type. Please upload PDF, JPG, or PNG.');
                input.value = ''; // Reset file input
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

// 🔄 Password match check
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const confirmPasswordHint = document.getElementById('confirmPasswordHint');
const signupForm = document.getElementById('signupPassengerForm');

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

// ✅ Handle form submission with validation
signupForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email'); // If you have one
    const email = emailInput ? emailInput.value.trim() : '';
    const safeEmail = escapeHTML(email);

    // 🔐 Password strength check
    if (!isStrongPassword(passwordInput.value)) {
        alert('Password must include uppercase, lowercase, number, special character and be at least 8 characters long.');
        passwordInput.focus();
        return;
    }

    // ✅ Password match check
    if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordHint.textContent = 'Passwords do not match!';
        confirmPasswordInput.focus();
        return;
    }

    // 📁 Required file check
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

    // ✅ Final success message (safe)
    alert(`Passenger Sign Up successful for ${safeEmail || 'user'} (simulation)!`);
    console.log('Passenger form submitted (simulation).');

    // Optionally redirect or clear the form
    // signupForm.reset();
    // window.location.href = 'signin.html';
});
