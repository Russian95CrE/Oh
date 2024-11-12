// This code is bad, but works
function impossibleChallenge() {
    const youCry = prompt("Are you sure? You will cry after starting, type 'Yes, I will cry like a baby'")

    const youCryLowerCase = youCry.toLowerCase();


    if (youCryLowerCase  === "yes, i will cry like a baby") {
        window.location.href = 'gamemodes/impossible_challenge/Level01/index.html';
    } else {
        alert("Loser.")
    }
}

// What's is the fucking point of this?
function oneLife() {
    const youCry = prompt("Are you sure? (type, yes 15x)")

    const youCryLowerCase = youCry.toLowerCase();
 

    if (youCryLowerCase  === "yes yes yes yes yes yes yes yes yes yes yes yes yes yes yes") {
        window.location.href = 'gamemodes/1life/Level01/index.html';
    } else if (youCryLowerCase === "no") {
        alert("Dude, you are so stupid, lazy, and a fucking idiot, don't play this game again, you have 2 braincells and one is trying to be a real braincell, but can't");
    } else if (youCryLowerCase === "yesyesyesyesyesyesyesyesyesyesyesyesyesyesyes") {
        window.location.href = 'gamemodes/1life/Level01/index.html';
    } else {
        alert("Loser.")
    }

}

// I don't even know if this is hard
function doubleSpeed() {
    alert("Oh, okay, this game mode is not too hard, I think...")

    window.location.href = 'gamemodes/doubleSpeed/Level01/index.html';
}

function lazy() {
    alert("...");
    alert("why... WHY THIS GAMEMODE?");
    alert("ok, you got it");

    // Oh my fucking god...
    const input = prompt("just type 'yes' and you will be redirected to the game mode");

    const inputLowerCase = input.toLowerCase();

    if (inputLowerCase === "yes") {
        window.location.href = 'gamemodes/lazy/Level01/index.html';
    } else if (inputLowerCase === "no") {
        alert("are you stupid or something?");
        alert("now fuck it on");
        alert("dumb shit you are");
    } else {
        alert("...");
    }
}

// I am not blind
function blind() {
    alert("...");
    alert("I must be blind to be able to play this game mode...");
    alert("...");
    alert("Wait... WAIT... WAIT!!!!!!!!!!!!!");

    window.location.href = 'gamemodes/blind/Level01/index.html';
}

// Oh
function babyMode() {
    alert("...")
    alert("You can't even spell 'Oh'");

    window.location.href = 'gamemodes/baby/Level01/index.html';
}