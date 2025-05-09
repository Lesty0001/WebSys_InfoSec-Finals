const editInfoBtn = document.getElementById('editInfoBtn');
const changePassBtn = document.getElementById('changePassBtn');
const deleteAccountBtn = document.getElementById('deleteAccountBtn');
const navLinks = document.querySelectorAll('.main-nav .nav-link');
if (editInfoBtn) {
    editInfoBtn.addEventListener('click', () => {
        alert('Edit Information functionality not implemented yet.');
    });
}

if (changePassBtn) {
    changePassBtn.addEventListener('click', () => {
        alert('Change Password functionality not implemented yet.');
    });
}

if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener('click', () => {
        if (confirm('Are you absolutely sure you want to delete your account? This action cannot be undone.')) {
            if(confirm('Final confirmation: Deleting your account will permanently remove all your data.')) {
                console.log('Account deletion confirmed.');
                alert('Account deletion initiated (simulation). You will be logged out.');
                 window.location.href = 'signin.html';
            } else { console.log('Account deletion cancelled (second confirmation).'); }
        } else { console.log('Account deletion cancelled (first confirmation).'); }
    });
}
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