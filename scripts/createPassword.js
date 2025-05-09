// 🔐 Basic HTML escaping utility (helps avoid log injection or accidental DOM insertions)
function escapeHTML(str) {
    return str.replace(/[&<>"']/g, (char) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    })[char]);
}

// 👁️ Password visibility toggle
const passwordContainers = document.querySelectorAll('.password-input-container');

passwordContainers.forEach(container => {
    const passwordInput = container.querySelector('input[type="password"], input[type="text"]'); // Works with toggle
    const toggleIcon = container.querySelector('.password-toggle-icon i');

    if (passwordInput && toggleIcon) {
        toggleIcon.parentElement.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            toggleIcon.classList.toggle('fa-eye');
            toggleIcon.classList.toggle('fa-eye-slash');
        });
    }
});

const newPasswordInput = document.getElementById('newPassword');
const confirmPasswordInput = document.getElementById('confirmNewPassword');
const confirmPasswordHint = document.getElementById('confirmPasswordHint');
const createPasswordForm = document.getElementById('createPasswordForm');

// 🔐 Password strength checker
function isStrongPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
}

// 🔄 Validate password match
function checkPasswordMatch() {
    const pw1 = newPasswordInput.value.trim();
    const pw2 = confirmPasswordInput.value.trim();

    if (pw1 !== pw2) {
        confirmPasswordHint.textContent = 'Passwords do not match!';
        confirmPasswordInput.setCustomValidity("Passwords don't match");
        return false;
    } else {
        confirmPasswordHint.textContent = '';
        confirmPasswordInput.setCustomValidity('');
        return true;
    }
}

// 🧼 Listeners for real-time feedback
confirmPasswordInput.addEventListener('input', checkPasswordMatch);
newPasswordInput.addEventListener('input', () => {
    if (confirmPasswordInput.value) {
        checkPasswordMatch();
    }
});

// ✅ Final validation on button click
document.getElementById('confirm-pw-button').addEventListener('click', function () {
    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    const isMatch = checkPasswordMatch();
    const isStrong = isStrongPassword(newPassword);

    if (!newPassword) {
        alert("New password is required.");
        newPasswordInput.focus();
        return;
    }

    if (!confirmPassword) {
        alert("Please confirm your password.");
        confirmPasswordInput.focus();
        return;
    }

    if (!isStrong) {
        alert("Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.");
        newPasswordInput.focus();
        return;
    }

    if (!isMatch) {
        alert("Passwords do not match.");
        confirmPasswordInput.focus();
        return;
    }

    // Optional: sanitized log (never log passwords in real apps)
    console.log("Password reset securely. [Simulation]");
    alert("Password successfully reset!");
    window.location.href = 'signin.html'; // Simulated redirect
});
