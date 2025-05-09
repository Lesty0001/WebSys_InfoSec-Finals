// 🧼 Basic escape function (not always necessary for numbers but good practice if logging/displaying)
function escapeHTML(str) {
    return str.replace(/[&<>"']/g, (char) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    })[char]);
}

// 🔁 Resend Code Button
document.getElementById('resendCodeBtn').addEventListener('click', function() {
    alert('Verification code resent (simulation).');
    this.disabled = true;
    this.textContent = 'Resending...';

    setTimeout(() => {
        this.disabled = false;
        this.textContent = 'Resend Code';
    }, 30000); // 30 seconds cooldown
});

// ✅ Next Button - Validate and sanitize 6-digit code
document.getElementById('next-button').addEventListener('click', function() {
    const codeInput = document.getElementById('verification-code');
    const rawCode = codeInput.value.trim(); // Remove whitespace

    // Regex to check for exactly 6 digits
    const isValid = /^\d{6}$/.test(rawCode);

    if (isValid) {
        const safeCode = escapeHTML(rawCode); // Not strictly needed, but keeps logs safe
        console.log('Verification code entered:', safeCode);

        // Simulate redirection
        window.location.href = 'createPassword.html'; 
    } else {
        alert('Please enter a valid 6-digit verification code.');
        codeInput.focus();
    }
});
