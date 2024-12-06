let color = "black";

//  ̄\_(ツ)_/ ̄
function classic() {
    alert("classic. classic...");
    window.location.href = 'gamemodes/classic/Level01/index.html?color=' + color;
}

//  ̄\_(ツ)_/ ̄ (MultiPlayer)
function multiplayer() {
    alert("let's play together!");
    window.location.href = 'gamemodes/multiplayer/Level01/index.html';
}

//  ̄\_(ツ)_/ ̄ (MultiPlayer Hard)
function multiplayerHard() {
    alert("fuck you, you are not playing multiplayerhard");
}

// idk
function Level01Plus() {
    alert("classic. hard...");
    window.location.href = 'gamemodes/classic/Level01Plus/index.html?color=' + color;
}

// hehe, try it
function impossibleChallenge() {
    const userResponse = prompt("are you sure you want to start? type 'Yes, I will cry like a baby'");

    if (userResponse) {
        const sanitizedResponse = userResponse.trim().toLowerCase();
    
        if (sanitizedResponse === "yes, i will cry like a baby") {
            window.location.href = 'gamemodes/impossible_challenge/Level01/index.html?color=' + color;
        } else {
            alert("your mom doesn't love you, your dad left you, your grandma hates you, and you're gonna grow up to become Adam Sandler.");
        }
    } else {
        alert("Please provide a response.");
    }
}

function Level01Impossible() {
    const userResponse = prompt("are you sure you want to suffer? type 'Yes, I will cry like a baby'");

    // TODO fix this please too
    if (userResponse && userResponse.toLowerCase() === "yes, i will cry like a baby") {
        window.location.href = 'gamemodes/impossible_challenge/Level01Impossible/index.html?color=' + color;
    } else {
        alert("your mom doesn't love you, your dad left you, your grandma hates you, and you're gonna grow up to become Adam Sandler.");
    }
}


// one life seems eazy... right?
function oneLife() {
    const userResponse = prompt("Are you sure? (type 'yes' 15 times)");

    if (userResponse) {
        const sanitizedResponse = userResponse.replace(/\s/g, '').toLowerCase();
    
        if (sanitizedResponse === "yes".repeat(15)) {
            window.location.href = 'gamemodes/1life/Level01/index.html?color=' + color;
        } else if (sanitizedResponse === "no") {
            alert("your mom doesn't love you, your dad left you, your grandma hates you, and you're gonna grow up to become Adam Sandler.");
        } else {
            alert("your mom doesn't love you, your dad left you, your grandma hates you, and you're gonna grow up to become Adam Sandler.");
        }
    } else {
        alert("Please provide a response.");
    }
}

function NoLife() {
    const userResponse = prompt("Are you sure you have no life? (type 'yes' 15 times)");

    // TODO fix this please
    if (userResponse && userResponse.replace(/\s/g, '').toLowerCase() === "yes".repeat(15)) {
        window.location.href = 'gamemodes/1life/Level01NoLife/index.html?color=' + color;
    } else if (userResponse && userResponse.toLowerCase() === "no") {
        alert("your mom doesn't love you, your dad left you, your grandma hates you, and you're gonna grow up to become Adam Sandler.");
    } else {
        alert("your mom doesn't love you, your dad left you, your grandma hates you, and you're gonna grow up to become Adam Sandler.");
    }
}


// who make this idea?
function cooldown() {
    // Little message here =D
    alert("fuck you");
    window.location.href = 'gamemodes/cooldownJump/Level01/index.html?color=' + color;
}

function MoreCooldown() {
    // Little message here =D
    alert("fuck you even more");
    window.location.href = 'gamemodes/cooldownJump/MoreCooldown/index.html?color=' + color;
}

// haha
function invisible() {
    alert("haha you are funny");
    window.location.href = 'gamemodes/invisible/Level01/index.html'
}
 
function InvisibleReal() {
    alert("haha you are unfunny");
    window.location.href = 'gamemodes/invisible/InvisibleReal/index.html'
}
 
// double speed!!!
function doubleSpeed() {
    alert("wait...");
    window.location.href = 'gamemodes/doubleSpeed/Level01/index.html?color=' + color;
}

function Level01DoubleSpeed() {
    alert("They don't love you.");
    window.location.href = 'gamemodes/doubleSpeed/Level01DoubleSpeed/index.html?color=' + color;
}


// wait... why i can't see?
function blind() {
    alert("hehe");
    window.location.href = 'gamemodes/blind/Level01/index.html';
}

function Level01Blind() {
    alert("stop it bro");
    window.location.href = 'gamemodes/blind/Level01Blind/index.html';
}


// not again bro...
function doubleJump() {
    alert("not again...");
    window.location.href = 'gamemodes/doubleJump/Level01/index.html?color=' + color;
}

function Level01DoubleJump() {
    alert("please again...");
    window.location.href = 'gamemodes/doubleJump/Level01DoubleJump/index.html?color=' + color;
}


// inverted
function inverted() {
    alert("classic inverted.");
    window.location.href = 'gamemodes/inverted/Level01/index.html?color=' + color;
}

function Level01Inverted() {
    alert(".detrevni cissalc");
    window.location.href = 'gamemodes/inverted/Level01Inverted/index.html?color=' + color;
}