// This function initiates the impossible challenge mode
function impossibleChallenge() {
    const userResponse = prompt("Are you sure you want to start? Type 'Yes, I will cry like a baby'");

    if (userResponse && userResponse.toLowerCase() === "yes, i will cry like a baby") {
        window.location.href = 'gamemodes/impossible_challenge/Level01/index.html?color=black';
    } else {
        alert("Your mom doesn't love you, Your dad left you, Your grandma hates you, and you're gonna grow up to become Adam Sandler.");
    }
}

// This function initiates the one life challenge mode
function oneLife() {
    const userResponse = prompt("Are you sure? (type 'yes' 15 times)");

    if (userResponse && userResponse.replace(/\s/g, '').toLowerCase() === "yes".repeat(15)) {
        window.location.href = 'gamemodes/1life/Level01/index.html?color=black';
    } else if (userResponse && userResponse.toLowerCase() === "no") {
        alert("Your mom doesn't love you, Your dad left you, Your grandma hates you, and you're gonna grow up to become Adam Sandler.");
    } else {
        alert("Your mom doesn't love you, Your dad left you, Your grandma hates you, and you're gonna grow up to become Adam Sandler.");
    }
}

// This function initiates the double speed challenge mode
function doubleSpeed() {
    alert("Get ready for double speed mode!");
    window.location.href = 'gamemodes/doubleSpeed/Level01/index.html?color=black';
}

// This function initiates the blind challenge mode
function blind() {
    alert("Prepare yourself for the blind mode...");
    window.location.href = 'gamemodes/blind/Level01/index.html';
}

// This function initiates the inverted challenge mode
function inverted() {
    alert("Classic inverted.");
    window.location.href = 'gamemodes/inverted/Level01/index.html';
}