const passwordInput = document.getElementById('password');
const toggleIcon = document.querySelector('.password-toggle-icon i');

// 👁 Toggle password visibility
toggleIcon?.parentElement?.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    toggleIcon.classList.toggle('fa-eye');
    toggleIcon.classList.toggle('fa-eye-slash');
});

// ✅ Strong password pattern
function isStrongPassword(password) {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
}

// ✨ Sanitize password input (basic, since we don’t render it)
function sanitizeInput(input) {
    return input.trim().slice(0, 128); // Limit to 128 chars for safety
}

// 🚀 Validate and process password
document.getElementById('next-button').addEventListener('click', function () {
    const rawPassword = passwordInput.value;
    const sanitizedPassword = sanitizeInput(rawPassword);

    if (!sanitizedPassword) {
        alert('Please enter your password.');
        return;
    }

    if (!isStrongPassword(sanitizedPassword)) {
        alert('Password must be at least 8 characters and include uppercase, lowercase, a number, and a symbol.');
        return;
    }

    // ✅ Password is valid – continue (don't log it!)
    console.log('Password submitted (not logged for security)');
    window.location.href = 'loading.html';
});
