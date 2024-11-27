const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const params = new URLSearchParams(window.location.search);

// Player properties
let player = {
    x: 700,
    y: 520,
    width: 22,
    height: 40,
    speed: 5,
    color: params.get('color'),
    velocityX: 0,
    velocityY: 0,
    isJumping: false,
    gravity: 0.5,
    friction: 0.7,
    jumpStrength: -10,
    grounded: false,
    hasKey: false,
    alerted: false,
    canMoveX: true,
    canMoveY: true,
    timePassed: false
}

// Game variables
let keys = {};
let isPaused = false;
let time = 0.100;
let winTime = 0.000;
const tileSize = 40; // Define the size of each "tile"

var jump = new Audio('resource/jump.wav');

// Define the level as a grid (2D array) of tiles

// 1 - Wall
// 2 - Door
// 3 - Key
// 4 - Time Lose Block
// 5 - Invisible Key
// 6 - Teleport Block

const level = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] // Ground row
];

// Function to generate platforms from the level array
function createPlatformsFromLevel() {
    const platforms = [];
    for (let row = 0; row < level.length; row++) {
        for (let col = 0; col < level[row].length; col++) {
            if (level[row][col] === 1) {
                platforms.push({
                    x: col * tileSize,
                    y: row * tileSize,
                    width: tileSize,
                    height: tileSize
                });
            }
        }
    }
    return platforms;
}

const platforms = createPlatformsFromLevel(); // Generate platforms from the level array

// Draw platforms
function drawPlatforms() {
    for (let row = 0; row < level.length; row++) {
        for (let col = 0; col < level[row].length; col++) {
            if (level[row][col] === 1) {
                ctx.fillStyle = '#dcdcdc'; // Color for platforms
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            } else if (level[row][col] === 2) {
                ctx.fillStyle = '#303030'; // Color for door
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            } else if (level[row][col] === 3) {
                if (!player.timePassed) {
                    ctx.fillStyle = '#E2E200'; // Color for key
                    ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
                }
            } else if (level[row][col] === 4) {
                ctx.fillStyle = '#FF0000'; // Color for Time Lose Block
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            } else if (level[row][col] === 6) {
                ctx.fillStyle = '#B200FF'; // Color for Teleport Block
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            }
        }
    }
}

// Draw player
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Handle player movement
function handleMovement() {

    if (player.canMoveX) {
        // Apply horizontal movement
        if (keys['ArrowRight']) {
            player.velocityX = player.speed;
        } else if (keys['ArrowLeft']) {
            player.velocityX = -player.speed;
        } else {
            player.velocityX *= player.friction; // Slow down due to friction
        }
    }


    // Apply gravity
    player.velocityY += player.gravity;

    // Move player
    player.x += player.velocityX;
    player.y += player.velocityY;

    // Prevent player from leaving the canvas horizontally
    if (player.x <= 0) {
        player.x = 0;
    }
    if (player.x + player.width >= canvas.width) {
        player.x = canvas.width - player.width;
    }

    // Check for collision with platforms
    player.grounded = false;
    platforms.forEach(platform => {
        const playerBottom = player.y + player.height;
        const playerRight = player.x + player.width;
        const platformBottom = platform.y + platform.height;
        const platformRight = platform.x + platform.width;

        // Check if the player is falling onto the platform
        if (playerBottom > platform.y &&
            player.y < platformBottom &&
            playerRight > platform.x &&
            player.x < platformRight) {

            const collisionFromTop = playerBottom - platform.y;
            const collisionFromLeft = playerRight - platform.x;
            const collisionFromRight = platformRight - player.x;

            // Check if collision is from the top of the platform
            if (collisionFromTop < Math.min(collisionFromLeft, collisionFromRight)) {
                if (player.velocityY > 0) {
                    player.y = platform.y - player.height; // Snap player to the top of the platform
                    player.velocityY = 0; // Stop downward movement
                    player.grounded = true; // Player is on a platform
                    player.isJumping = false; // Allow jumping again
                }
            } else {
                // Handle side collisions
                if (collisionFromLeft < collisionFromRight) {
                    player.x = platform.x - player.width; // Collide from the left
                } else {
                    player.x = platformRight; // Collide from the right
                }
                player.velocityX = 0; // Stop horizontal movement when colliding with sides
            }
        }
    });
        if (level[Math.floor(player.y / tileSize)][Math.floor(player.x / tileSize)] === 6) {
            window.location.href = "Level01_/index.html?color=" + player.color;
        }

    // Apply jumping
    if (keys['ArrowUp'] && !player.isJumping && player.grounded) {
        player.velocityY = player.jumpStrength; // Apply jump velocity
        jump.play();
        player.isJumping = true;
    }


    // Prevent player from falling below the canvas
    if (player.y + player.height >= canvas.height) {
        player.y = canvas.height - player.height;
        player.velocityY = 0;
        player.grounded = true;
        player.isJumping = false;
    }
}

// Function to shake the game container
function shakeGameContainer() {
    const gameContainer = document.querySelector('.game-container');
    gameContainer.classList.add('shake');

    // Remove the shake class after the animation is complete
    setTimeout(() => {
        gameContainer.classList.remove('shake');
    }, 500); // 500ms is the duration of the shake animation
}

// Update game state
function update() {
    if (!isPaused) {
        handleMovement();
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPlatforms();
        drawPlayer();

        if (!player.alerted) {
            if (time > 0) {
                time -= 0.016;
                document.getElementById('time').innerText = time.toFixed(3);
            } else {
                document.getElementById('time').innerText = '0.000';
                player.haskey = false
                player.timePassed = true
            }
        } else {
            time = winTime
            document.getElementById('time').innerText = time.toFixed(3);
        }

    }
}


// Game loop
setInterval(update, 1000 / 60); // Run update function at 60 FPS

// Event listeners for keyboard input
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});
