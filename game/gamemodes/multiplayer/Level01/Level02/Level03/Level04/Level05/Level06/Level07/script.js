const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const params = new URLSearchParams(window.location.search);

// Reality check for programmers =D
let total_hours_wasted_here = 1;

// Player properties
let player = {
    x: 700,
    y: 520,
    width: 22,
    height: 40,
    speed: 5,
    color: 'black',
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
};

let player2 = {
    x: 730,
    y: 520,
    width: 22,
    height: 40,
    speed: 5,
    color: 'cyan',
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
};

// Game variables
let keys = {};
let isPaused = false;
let time = 0.000;
let winTime = 0.000;
const tileSize = 40; // Define the size of each "tile"

var jump = new Audio('resource/jump.wav');
var shake = new Audio('resource/shake.wav');
var door_sound = new Audio('resource/door.wav');

// Define the level as a grid (2D array) of tiles
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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

                if (player.hasTimeGain) {
                    ctx.fillStyle = '#E2E200'; // Color for key
                    ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
                } else {
                    ctx.fillStyle = '#808080'; // Color for key
                    ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
                }
            } else if (level[row][col] === 4) {
                ctx.fillStyle = '#7F6A00'; // Color for time lose block
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            }
        }
    }
}

// Add a draw function for both players
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}
function drawPlayer2() {
    ctx.fillStyle = player2.color;
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
}



// Handle player movement
// Handle player movement
// Handle player movement
function handleMovement() {
    // Player 1 Movement
    if (player.canMoveX) {
        if (keys['ArrowRight']) {
            player.velocityX = player.speed;
        } else if (keys['ArrowLeft']) {
            player.velocityX = -player.speed;
        } else {
            player.velocityX *= player.friction;  // Apply friction
        }
    }

    // Apply gravity for Player 1
    player.velocityY += player.gravity;
    player.x += player.velocityX;
    player.y += player.velocityY;

    // Prevent Player 1 from leaving the canvas horizontally
    if (player.x <= 0) {
        player.x = 0;
    }
    if (player.x + player.width >= canvas.width) {
        player.x = canvas.width - player.width;
    }

    // Check for collision with platforms (already exists for Player 1)
    checkCollisions(player);

    // Player 1 Jumping Logic (updated)
    if (keys['ArrowUp'] && !player.isJumping && player.grounded) {
        player.velocityY = player.jumpStrength;
        jump.play();
        player.isJumping = true;
    }

    // Prevent Player 1 from falling below the canvas
    if (player.y + player.height >= canvas.height) {
        player.y = canvas.height - player.height;
        player.velocityY = 0;
        player.grounded = true;
        player.isJumping = false;
    }

    // Player 2 Movement
    if (player2.canMoveX) {
        if (keys['d']) {  // Right (WASD for Player 2)
            player2.velocityX = player2.speed;
        } else if (keys['a']) {  // Left
            player2.velocityX = -player2.speed;
        } else {
            player2.velocityX *= player2.friction;  // Apply friction
        }
    }

    // Apply gravity for Player 2
    player2.velocityY += player2.gravity;
    player2.x += player2.velocityX;
    player2.y += player2.velocityY;

    // Prevent Player 2 from leaving the canvas horizontally
    if (player2.x <= 0) {
        player2.x = 0;
    }
    if (player2.x + player2.width >= canvas.width) {
        player2.x = canvas.width - player2.width;
    }

    // Check for collision with platforms (for Player 2)
    checkCollisions(player2);

    // Player 2 Jumping Logic (updated)
    if (keys['w'] && !player2.isJumping && player2.grounded) {
        player2.velocityY = player2.jumpStrength;
        jump.play();
        player2.isJumping = true;
    }

    // Prevent Player 2 from falling below the canvas
    if (player2.y + player2.height >= canvas.height) {
        player2.y = canvas.height - player2.height;
        player2.velocityY = 0;
        player2.grounded = true;
        player2.isJumping = false;
    }
}

// Check for key pickup and apply teamwork
function checkCollisions(player) {
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
                    player.y = platform.y - player.height;  // Snap player to platform
                    player.velocityY = 0;  // Stop downward movement
                    player.grounded = true;  // Player is grounded
                    player.isJumping = false;  // Allow jumping again
                }
            } else {
                // Handle side collisions
                if (collisionFromLeft < collisionFromRight) {
                    player.x = platform.x - player.width;  // Collide from the left
                } else {
                    player.x = platformRight;  // Collide from the right
                }
                player.velocityX = 0;  // Stop horizontal movement when colliding with sides
            }
        }

        // Check collision with the special tile (2)
        if (level[Math.floor(player.y / tileSize)][Math.floor(player.x / tileSize)] === 2) {
            if (player.hasKey) {
                if (!player.alerted) {
                    // Win the game
                    winTime = time;
                    door_sound.play();
                    alert('Great job! You unlocked the door with the key and won!');
                    window.location.href = "Level02/index.html";
                    player.alerted = true; // Prevent further alerts
                }
            } else {
                shakeGameContainer();
            }
        }

        // Key pickup for both players
        if (level[Math.floor(player.y / tileSize)][Math.floor(player.x / tileSize)] === 3) {
            shakeGameContainer();
            player.hasKey = true;
            player2.hasKey = player.hasKey; // Teamwork: Player 2 gets the key as well
        }
    });

    // Check collision with the special tile (4)
    if (level[Math.floor(player.y / tileSize)][Math.floor(player.x / tileSize)] === 4) {
        if (time >= 1.000) {
            time = 1.000;
        } else {
            time += 0.030;
        }
    }
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

// Function to shake the game container
function shakeGameContainer() {
    const gameContainer = document.querySelector('.game-container');

    gameContainer.classList.add('shake');

    shake.play();

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
        drawPlayer(); // Draw Player 1
        drawPlayer2(); // Draw Player 2
        
        // Timer logic
        if (!player.alerted) {
            if (time > 0) {
                time -= 0.016;
                document.getElementById('time').innerText = time.toFixed(3);
            } else {
                document.getElementById('time').innerText = '0.000';
                player.hasKey = false;
                player2.hasKey = false;
                player.timePassed = true;
                player2.timePassed = true;
            }
            if (time >= 1.000) {
                player.hasTimeGain = true
            }
           else 
         if (time >= 0.000);
            player.haskey= false
            player2.haskey= false 
        } else {
            time = winTime;
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