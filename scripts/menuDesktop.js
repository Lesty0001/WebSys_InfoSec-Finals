const notificationToggle = document.getElementById('allowNotification');
const audioToggle = document.getElementById('audioEnabled');
const locationToggle = document.getElementById('allowLocation');
const languageSelect = document.getElementById('languageSelect'); // Moved up
const resetBtn = document.getElementById('resetDefaultBtn');
const updatesBtn = document.getElementById('checkUpdatesBtn');
const navLinks = document.querySelectorAll('.main-nav .nav-link'); // Defined early

if (notificationToggle) { notificationToggle.addEventListener('change', (e) => { console.log(`Notification: ${e.target.checked}`); alert(`Notifications ${e.target.checked ? 'enabled' : 'disabled'} (simulation).`); }); }
if (audioToggle) { audioToggle.addEventListener('change', (e) => { console.log(`Audio: ${e.target.checked}`); alert(`Audio ${e.target.checked ? 'enabled' : 'disabled'} (simulation).`); }); }
if (locationToggle) { locationToggle.addEventListener('change', (e) => { console.log(`Location: ${e.target.checked}`); alert(`Location ${e.target.checked ? 'enabled' : 'disabled'} (simulation).`); }); }

if (languageSelect) {
    languageSelect.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        const selectedLanguageText = event.target.options[event.target.selectedIndex].text;
        console.log(`Language selected: ${selectedLanguage} (${selectedLanguageText})`);
        alert(`Language changed to ${selectedLanguageText} (simulation). Application might reload or download resources.`);
    });
}

if (resetBtn) { resetBtn.addEventListener('click', () => { if (confirm('Are you sure you want to reset all settings to their defaults?')) { console.log('Resetting settings to default...'); alert('Settings reset to default (simulation).'); /* Reset UI */ } }); }
if (updatesBtn) { updatesBtn.addEventListener('click', () => { console.log('Checking for updates...'); alert('Checking for updates... (simulation)\n\nYou have the latest version.'); }); }


navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        const pageName = this.textContent;
        const targetUrl = link.getAttribute('href');

        if (pageName === 'Logout') {
            event.preventDefault();
            if (confirm('Are you sure you want to log out?')) {
                console.log('Logging out...');
                window.location.href = 'signin.html'; 
            }
            return;
        }

        if (targetUrl && targetUrl !== '#') {
            console.log(`Following link to ${targetUrl}`);
        }
        else {
            event.preventDefault(); 
            alert(`Navigation for "${pageName}" (href="#") is not implemented yet.`);
        }
    });
});
