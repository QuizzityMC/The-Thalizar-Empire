function showAttraction(attraction) {
    const popup = document.getElementById('attraction-popup');
    const title = document.getElementById('attraction-title');
    const description = document.getElementById('attraction-description');

    title.textContent = attraction;
    description.textContent = getAttractionDescription(attraction);

    popup.style.display = 'block';
}

function closePopup() {
    const popup = document.getElementById('attraction-popup');
    popup.style.display = 'none';
}

function getAttractionDescription(attraction) {
    const descriptions = {
        'Grand Palace': 'The majestic Grand Palace of Thalizar, home to the royal family and center of government.',
        'Mystic Gardens': 'A serene oasis filled with rare and magical plants from across the empire.',
        'Ancient Library': 'Housing countless scrolls and tomes, the Ancient Library is a treasure trove of knowledge.',
        'Celestial Observatory': 'Gaze at the stars and unravel the mysteries of the cosmos at the Celestial Observatory.'
    };
    return descriptions[attraction] || 'Description not available.';
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const portalActions = document.getElementById('portal-actions');
    const welcomeMessage = document.getElementById('welcome-message');
    const showBuildingPermit = document.getElementById('show-building-permit');
    const showCitizenship = document.getElementById('show-citizenship');
    const buildingPermitForm = document.getElementById('building-permit-form');
    const citizenshipForm = document.getElementById('citizenship-form');
    const errorMessage = document.getElementById('error-message');
    const authMessage = document.getElementById('auth-message');

    // Check for authentication response
    const urlParams = new URLSearchParams(window.location.search);
    const authStatus = urlParams.get('auth');
    const authErrorMessage = urlParams.get('message');
    
    if (authStatus === 'success') {
        authMessage.textContent = 'Authentication successful!';
        authMessage.style.color = 'green';
        authMessage.style.display = 'block';
    } else if (authStatus === 'error') {
        authMessage.textContent = 'Authentication failed: ' + (authErrorMessage || 'Unknown error');
        authMessage.style.color = 'red';
        authMessage.style.display = 'block';
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        if (username) {
            loginForm.style.display = 'none';
            portalActions.style.display = 'block';
            welcomeMessage.textContent = `Welcome, ${username}!`;
        }
    });

    showBuildingPermit.addEventListener('click', () => {
        buildingPermitForm.style.display = 'block';
        citizenshipForm.style.display = 'none';
    });

    showCitizenship.addEventListener('click', () => {
        citizenshipForm.style.display = 'block';
        buildingPermitForm.style.display = 'none';
    });

    buildingPermitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const location = document.getElementById('build-location').value;
        const description = document.getElementById('build-description').value;
        sendDiscordMessage('Building Permit Request', { username, location, description });
    });

    citizenshipForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const realName = document.getElementById('real-name').value;
        const email = document.getElementById('email').value;
        const reason = document.getElementById('reason').value;
        sendDiscordMessage('Citizenship Request', { username, realName, email, reason });
    });
});

function sendDiscordMessage(type, data) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none';

    fetch('https://bot.quizzitymc.hackclub.app/send-discord-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, data }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(result => {
        console.log('Message sent:', result);
        if (result.success) {
            alert('Your request has been sent successfully!');
        } else {
            throw new Error(result.message || 'Unknown error occurred');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        errorMessage.textContent = `Error: ${error.message}. Please try again later.`;
        errorMessage.style.display = 'block';
    });
}

