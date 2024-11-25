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

// For portal.html
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    if (username) {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('portal-actions').style.display = 'block';
        document.getElementById('welcome-message').textContent = `Welcome, ${username}!`;
    }
}

function handleRequest(type) {
    const username = document.getElementById('username').value;
    console.log(`${type} requested for user: ${username}`);
    // Here you would typically send this data to your game server or Discord bot
    alert(`Your ${type} request has been submitted!`);
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const portalActions = document.getElementById('portal-actions');
    const welcomeMessage = document.getElementById('welcome-message');
    const showBuildingPermit = document.getElementById('show-building-permit');
    const showCitizenship = document.getElementById('show-citizenship');
    const buildingPermitForm = document.getElementById('building-permit-form');
    const citizenshipForm = document.getElementById('citizenship-form');

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
        alert('Your building permit request has been submitted!');
        buildingPermitForm.reset();
    });

    citizenshipForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const realName = document.getElementById('real-name').value;
        const email = document.getElementById('email').value;
        const reason = document.getElementById('reason').value;
        sendDiscordMessage('Citizenship Request', { username, realName, email, reason });
        alert('Your citizenship request has been submitted!');
        citizenshipForm.reset();
    });
});

function sendDiscordMessage(type, data) {
    // Simulate sending a message to Discord
    console.log(`Sending ${type} to Discord:`);
    console.log(JSON.stringify(data, null, 2));
    
    // In a real application, you would make an HTTP request to a server
    // that would then use a Discord bot to send the message.
    // For example:
    // 
    // fetch('https://your-server.com/send-discord-message', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ type, data }),
    // })
    // .then(response => response.json())
    // .then(result => console.log('Message sent:', result))
    // .catch(error => console.error('Error:', error));
}

