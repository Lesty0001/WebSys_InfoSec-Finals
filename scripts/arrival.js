const starsContainer = document.querySelector('.stars-container');
const stars = starsContainer.querySelectorAll('.star');
const submitRateBtn = document.getElementById('submitRateBtn');
const skipRateBtn = document.getElementById('skipRateBtn');
const givenRatingDisplay = document.getElementById('givenRating');
let currentRating = 0;

function highlightStars(rating) {
    stars.forEach(star => {
        if (parseInt(star.dataset.value) <= rating) {
            star.classList.remove('far'); 
            star.classList.add('fas'); 
        } else {
            star.classList.remove('fas');
            star.classList.add('far');   
        }
    });
}

starsContainer.addEventListener('mouseover', (event) => {
    if (event.target.classList.contains('star')) {
        const hoverValue = parseInt(event.target.dataset.value);
        highlightStars(hoverValue);
    }
});

starsContainer.addEventListener('mouseout', () => {
    highlightStars(currentRating);
});

starsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('star')) {
        currentRating = parseInt(event.target.dataset.value);
        starsContainer.dataset.rating = currentRating; // Store rating
        highlightStars(currentRating);
        submitRateBtn.disabled = false; // Enable submit button
        console.log(`Rating selected: ${currentRating}`);
    }
});

submitRateBtn.addEventListener('click', () => {
    if (currentRating > 0) {
        console.log(`Submitting rating: ${currentRating}`);
        alert(`Rating of ${currentRating} submitted! Thank you.`);
        givenRatingDisplay.textContent = currentRating + ' Stars';
         givenRatingDisplay.innerHTML += ' <i class="fas fa-star" style="color: #f1c40f;"></i>';
        starsContainer.style.pointerEvents = 'none';
        submitRateBtn.disabled = true;
        submitRateBtn.textContent = 'Submitted';
        skipRateBtn.style.display = 'none'; 

        setTimeout(() => {
            window.location.href = 'homePassenger.html';
        }, 2000);

    } else {
        alert('Please select a rating first.');
    }
});

 skipRateBtn.addEventListener('click', () => {
     console.log('Rating skipped.');
     alert('Rating skipped.');
     window.location.href = 'homePassenger.html';
 });
