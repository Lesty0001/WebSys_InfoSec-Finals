// 🧼 Simple escapeHTML to prevent potential XSS/log injection
function escapeHTML(str) {
    return str.replace(/[&<>"']/g, (char) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    })[char]);
}

// Elements
const findNowBtnWeb = document.getElementById('findNowWeb');
const bookingSection = document.getElementById('bookingSection');
const searchResultsSection = document.getElementById('searchResultsSection');
const topUpButton = document.querySelector('.add-balance-btn-widget');
const quickActionButtons = document.querySelectorAll('.quick-actions-widget .action-button');
const navLinks = document.querySelectorAll('.main-nav .nav-link');

// --- Event Listeners ---

// 🔎 "Find Now" Button Listener with sanitization
if (findNowBtnWeb) {
    findNowBtnWeb.addEventListener('click', () => {
        const fromRaw = document.getElementById('from').value.trim();
        const toRaw = document.getElementById('to').value.trim();
        const passengersRaw = document.getElementById('totalPass').value.trim();

        const fromLocation = escapeHTML(fromRaw);
        const toLocation = escapeHTML(toRaw);
        const passengers = parseInt(passengersRaw);

        if (!fromLocation || !toLocation || isNaN(passengers) || passengers < 1 || passengers > 50) {
            alert("Please fill in all fields correctly. Passengers must be a number between 1 and 50.");
            return;
        }

        console.log(`Searching for ${passengers} passenger(s) from ${fromLocation} to ${toLocation}`);

        bookingSection.style.display = 'none';
        searchResultsSection.style.display = 'block';
        searchResultsSection.innerHTML = '<h2>Searching... <i class="fas fa-spinner fa-spin"></i></h2>';

        setTimeout(() => {
            searchResultsSection.innerHTML = `
                <h2>Nearby Jeepney Found</h2>
                <div class="found-jeepney-details">
                    <div class="detail-row"> <span class="detail-label">Driver's Name:</span> <span class="detail-value">Mark Reyes</span> </div>
                    <div class="detail-row"> <span class="detail-label">Rating:</span> <span class="detail-value">4 <i class="fas fa-star" style="color: #f1c40f;"></i></span> </div>
                    <div class="detail-row"> <span class="detail-label">License Plate:</span> <span class="detail-value">ABC-1234</span> </div>
                    <div class="detail-row"> <span class="detail-label">Pick Up Location:</span> <span class="detail-value">Monumento Circle</span> </div>
                    <div class="detail-row"> <span class="detail-label">Estimated time:</span> <span class="detail-value">3 mins</span> </div>
                </div>
                <div class="found-jeepney-actions">
                    <button class="action-button cancel-button" id="cancelSearchBtn">Cancel</button>
                    <button class="action-button book-now-button" id="bookNowBtn">Book Now</button>
                </div>
            `;

            document.getElementById('cancelSearchBtn')?.addEventListener('click', cancelSearch);
            document.getElementById('bookNowBtn')?.addEventListener('click', bookNow);
        }, 2500);
    });
}

// 💰 Top Up Button Listener
if (topUpButton) {
    topUpButton.addEventListener('click', () => {
        console.log('Navigating to Top Up page...');
        window.location.href = 'topupDesktop.html';
    });
}

// ⚡ Quick Action Buttons
quickActionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.textContent.trim();
        if (action.includes('Recent Trips')) {
            console.log('Navigating to History page from Quick Actions...');
            window.location.href = 'historyDesktop.html';
        } else if (action.includes('View Routes')) {
            alert('View Routes functionality not implemented yet.');
        } else {
            alert(`Action "${escapeHTML(action)}" not implemented yet.`);
        }
    });
});

// 🔗 Navigation Links Listener
navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        const pageName = this.textContent.trim();
        const href = link.getAttribute('href');

        if (pageName === 'Logout') {
            event.preventDefault();
            if (confirm('Are you sure you want to log out?')) {
                console.log('Logging out...');
                window.location.href = 'signin.html';
            }
            return;
        }

        if (href && href !== '#') {
            console.log(`Following link to ${escapeHTML(href)}`);
        } else {
            event.preventDefault();
            if (pageName === 'Settings') {
                console.log('Navigating to Settings page...');
                window.location.href = 'settingsDesktop.html';
            } else {
                alert(`Navigation for "${escapeHTML(pageName)}" not implemented yet.`);
            }
        }
    });
});

// 🔁 Cancel Booking
function cancelSearch() {
    console.log("Search cancelled.");
    searchResultsSection.style.display = 'none';
    searchResultsSection.innerHTML = '';
    bookingSection.style.display = 'flex';
}

// ✅ Book Now
function bookNow() {
    console.log("Booking initiated!");
    searchResultsSection.innerHTML = `
        <h2>Booking Confirmed! <i class="fas fa-check-circle" style="color: #2ecc71;"></i></h2>
        <p>Your trip is starting. Redirecting to the status page...</p>
        <i class="fas fa-spinner fa-spin fa-2x" style="margin-top: 15px;"></i>
    `;
    setTimeout(() => {
        console.log("Navigating to Trip Status page...");
        window.location.href = 'tripStatusDesktop.html';
    }, 2000);
}
