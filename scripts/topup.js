// Secure and Enhanced Top-up Script

const topupForm = document.getElementById('topupForm');
const topupAmountInput = document.getElementById('topupAmount');
const successMessageDiv = document.getElementById('successMessage');
const toppedUpAmountSpan = document.getElementById('toppedUpAmount');
const newBalanceSpan = document.getElementById('newBalance');
const topupCurrentBalSpan = document.getElementById('topupCurrentBal');
const closeSuccessBtn = document.getElementById('closeSuccessBtn');

// 🧼 Clean numeric input safely
function sanitizeAmountInput(input) {
    const sanitized = input.replace(/[^\d.]/g, ''); // remove everything except digits and dot
    return sanitized;
}

// 💰 Strong numeric validation: Positive number, no weird decimals, safe bounds
function isValidTopupAmount(amount) {
    return (
        typeof amount === 'number' &&
        !isNaN(amount) &&
        amount > 0 &&
        amount < 1000000 && // set max top-up limit for safety (adjust as needed)
        /^\d+(\.\d{1,2})?$/.test(amount.toFixed(2)) // max 2 decimal places
    );
}

// 🧮 Handle top-up form
topupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const rawAmount = sanitizeAmountInput(topupAmountInput.value.trim());
    const amount = parseFloat(rawAmount);

    const currentBalanceText = topupCurrentBalSpan.textContent.replace(/[^0-9.]/g, '');
    const currentBalance = parseFloat(currentBalanceText);

    // 🚫 Validate amount
    if (!isValidTopupAmount(amount)) {
        alert('Please enter a valid top-up amount (max ₱1,000,000, two decimal places).');
        topupAmountInput.focus();
        return;
    }

    if (isNaN(currentBalance)) {
        alert('Error reading current balance.');
        return;
    }

    const simulatedNewBalance = currentBalance + amount;

    // 🧾 Display updated info (safely formatted)
    toppedUpAmountSpan.textContent = `₱${amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;

    newBalanceSpan.textContent = `₱${simulatedNewBalance.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;

    topupCurrentBalSpan.textContent = `₱${simulatedNewBalance.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;

    // ✅ Show success
    successMessageDiv.style.display = 'block';
    topupForm.style.display = 'none';

    // Clear input after success
    topupAmountInput.value = '';

    console.log(`Top-up successful: ₱${amount}. New balance: ₱${simulatedNewBalance}`);
});

// 🔁 Reset to form view
closeSuccessBtn.addEventListener('click', () => {
    successMessageDiv.style.display = 'none';
    topupForm.style.display = 'block';
});
