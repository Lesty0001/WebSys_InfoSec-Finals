// =====================
// 📍 Coordinates
// =====================
const valenzuelaCoords = [14.6563, 120.9845];
const roblesCoords = [14.6565, 120.9830];
const wawangpuloCoords = [14.7250, 120.9650];
const currentLocationCoords = [14.6564, 120.9840];

// =====================
// 🗺️ Initialize Map
// =====================
const map = L.map('map').setView(currentLocationCoords, 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// =====================
// 📌 Markers
// =====================
L.marker(roblesCoords)
    .addTo(map)
    .bindPopup('<strong>Start:</strong> Robles St.');

L.marker(wawangpuloCoords)
    .addTo(map)
    .bindPopup('<strong>Destination:</strong> Wawangpulo');

const currentMarkerIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.marker(currentLocationCoords, { icon: currentMarkerIcon })
    .addTo(map)
    .bindPopup('<strong>You are here</strong>')
    .openPopup();

// =====================
// 📶 Trip Progress
// =====================
const progressBarFill = document.getElementById('progressBarFill');
const progressBarText = document.querySelector('.progress-bar-text');
let currentProgress = 60;

function updateProgress(percentage) {
    percentage = Math.max(0, Math.min(100, percentage)); // clamp 0–100
    if (progressBarFill) progressBarFill.style.width = `${percentage}%`;
    if (progressBarText) progressBarText.textContent = `En route... (${percentage}%)`;
}

updateProgress(currentProgress);

// =====================
// 🛑 "Para" Button Handler
// =====================
const paraButton = document.getElementById('paraButton');

if (paraButton) {
    paraButton.addEventListener('click', () => {
        console.log('Para button clicked');
        alert('Notifying driver to stop (simulation)');

        // Button feedback
        paraButton.disabled = true;
        paraButton.innerHTML = '<i class="fas fa-check"></i> Notified';
        paraButton.classList.add('notified'); // Optional: add CSS style

        // Simulate arrival in 3 seconds
        setTimeout(() => {
            console.log('Simulating arrival...');
            window.location.href = 'arrivalDesktop.html';
        }, 3000);
    });
}
