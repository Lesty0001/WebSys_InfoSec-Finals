// ✨ Sanitize input to prevent XSS (if used anywhere later)
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

// 📥 Validate format of email or phone (basic regex for now)
function isValidUsername(input) {
    const trimmed = input.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{10,15}$/; // basic international format
    return emailRegex.test(trimmed) || phoneRegex.test(trimmed);
}

// 🔐 Handle sign-in securely
document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let rawUsername = document.getElementById("username").value || '';
    const trimmedUsername = rawUsername.trim();

    if (!trimmedUsername) {
        alert("Please enter your email or phone number.");
        return;
    }

    if (!isValidUsername(trimmedUsername)) {
        alert("Please enter a valid email address or phone number.");
        return;
    }

    // 🔒 Optional: sanitize before logging or inserting into the DOM (not needed for redirection)
    const safeUsername = escapeHTML(trimmedUsername);

    // 🚀 Simulate redirection to password page (in real use, you’d POST this to server first)
    console.log(`Username accepted: ${safeUsername}`);
    window.location.href = "password.html";
});
