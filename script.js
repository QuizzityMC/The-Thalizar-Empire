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

