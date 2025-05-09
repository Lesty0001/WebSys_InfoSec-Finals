const actionButtons = document.querySelectorAll('.history-item-action');
    actionButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            alert('View details functionality not implemented yet.');
        });
    });

    const navLinks = document.querySelectorAll('.main-nav .nav-link');

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