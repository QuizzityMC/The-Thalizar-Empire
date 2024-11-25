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
        'Parliament': 'The heart of the government of Thalizar - the peoples decisionmaking power!',
        'Cities': 'Thalizar contains some cities as old as the world itself - centers of culture, religeon and trade.',
        'Castle': 'Gaze up at the dark and powerful castles the grace the heights of the mountains.'
    };
    return descriptions[attraction] || 'Description not available.';
}

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
    console.log(`Sending ${type} to Discord:`);
    console.log(JSON.stringify(data, null, 2));
    

