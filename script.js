function playGame() {
    window.location.href = 'Level01/index.html';
}

function impossibleChallenge() {
    const youCry = prompt("Are you sure? You will cry after starting, type 'Yes, i will cry like a baby'")

    if (youCry === "Yes, i will cry like a baby") {
        window.location.href = 'impossible_challenge/index.html';
    } else {
        alert("Loser.")
    }
}