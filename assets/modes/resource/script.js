let color = "black";

// This function initiates the impossible challenge mode
function impossibleChallenge() {
    const userResponse = prompt("are you sure you want to start? type 'Yes, I will cry like a baby'");

    if (userResponse && userResponse.toLowerCase() === "yes, i will cry like a baby") {
        window.location.href = 'gamemodes/impossible_challenge/Level01/index.html?color=' + color;
    } else {
        alert("your mom doesn't love you, your dad left you, your grandma hates you, and you're gonna grow up to become Adam Sandler.");
    }
}

// This function initiates the one life challenge mode
function oneLife() {
    const userResponse = prompt("Are you sure? (type 'yes' 15 times)");

    if (userResponse && userResponse.replace(/\s/g, '').toLowerCase() === "yes".repeat(15)) {
        window.location.href = 'gamemodes/1life/Level01/index.html?color=' + color;
    } else if (userResponse && userResponse.toLowerCase() === "no") {
        alert("your mom doesn't love you, your dad left you, your grandma hates you, and you're gonna grow up to become Adam Sandler.");
    } else {
        alert("your mom doesn't love you, your dad left you, your grandma hates you, and you're gonna grow up to become Adam Sandler.");
    }
}

function cooldown() {
    alert("fuck you");
    window.location.href = 'gamemodes/cooldownJump/Level01/index.html?color=' + color;
}

// This function initiates the double speed challenge mode
function doubleSpeed() {
    alert("wait...");
    window.location.href = 'gamemodes/doubleSpeed/Level01/index.html?color=' + color;
}

// This function initiates the blind challenge mode
function blind() {
    alert("hehe");
    window.location.href = 'gamemodes/blind/Level01/index.html';
}

function doubleJump() {
    alert("not again...");
    window.location.href = 'gamemodes/doubleJump/Level01/index.html?color=' + color;
}

// This function initiates the inverted challenge mode
function inverted() {
    alert("classic inverted.");
    window.location.href = 'gamemodes/inverted/Level01/index.html?color=' + color;
}