// ===================================
// CAT RESCUE GAME
// A 2D platformer by Claude & Paul
// ===================================

// Canvas and context (initialized after DOM loads)
let canvas;
let ctx;

// Game constants
const GRAVITY = 0.6;
const JUMP_STRENGTH = -12;
const MOVE_SPEED = 5;
let GAME_WIDTH = 1280;
let GAME_HEIGHT = 720;

// Game state
let gameState = 'TITLE'; // TITLE, PLAYING, GAME_OVER, VICTORY
let currentLevel = 1;
let lives = 3;
let keys = {};
let camera = { x: 0, y: 0 };

// Player object
const player = {
    x: 100,
    y: 500,
    width: 40,
    height: 60,
    velocityX: 0,
    velocityY: 0,
    onGround: false,
    color: '#9B59B6', // Purple for Scarlett
    hasKey: false,
    caught: false
};

// Game entities
let platforms = [];
let enemies = [];
let projectiles = [];
let fallingRocks = [];
let fox = null;
let cage = null;
let key = null;

// Input handling
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;

    // Jump
    if (e.key === ' ' && player.onGround && gameState === 'PLAYING') {
        player.velocityY = JUMP_STRENGTH;
        player.onGround = false;
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x - camera.x, y - camera.y, width, height);
}

function drawText(text, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.font = `bold ${size}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y);
}

// ===================================
// GAME INITIALIZATION
// ===================================

function startGame() {
    document.getElementById('title-screen').classList.add('hidden');
    gameState = 'PLAYING';
    currentLevel = 1;
    lives = 3;
    updateUI();
    loadLevel(1);
}

function restartGame() {
    document.getElementById('game-over-screen').classList.add('hidden');
    document.getElementById('victory-screen').classList.add('hidden');
    lives = 3;
    currentLevel = 1;
    gameState = 'PLAYING';
    updateUI();
    loadLevel(1);
}

function updateUI() {
    document.getElementById('lives-count').textContent = lives;
    document.getElementById('level-number').textContent = currentLevel;
}

function loseLife() {
    lives--;
    updateUI();

    if (lives <= 0) {
        gameOver();
    } else {
        // Restart current level
        loadLevel(currentLevel);
    }
}

function gameOver() {
    gameState = 'GAME_OVER';
    document.getElementById('game-over-screen').classList.remove('hidden');
}

function victory() {
    gameState = 'VICTORY';
    document.getElementById('victory-screen').classList.remove('hidden');
}

function nextLevel() {
    currentLevel++;
    if (currentLevel > 4) {
        victory();
    } else {
        updateUI();
        loadLevel(currentLevel);
    }
}

// ===================================
// LEVEL LOADING
// ===================================

function loadLevel(level) {
    // Reset entities
    platforms = [];
    enemies = [];
    projectiles = [];
    fallingRocks = [];
    fox = null;
    cage = null;
    key = null;
    camera = { x: 0, y: 0 };

    // Reset player
    player.x = 100;
    player.y = 500;
    player.velocityX = 0;
    player.velocityY = 0;
    player.onGround = false;
    player.hasKey = false;
    player.caught = false;

    if (level === 1) {
        loadLevel1();
    } else if (level === 2) {
        loadLevel2();
    } else if (level === 3) {
        loadLevel3();
    } else if (level === 4) {
        loadLevel4();
    }
}

// ===================================
// LEVEL 1: THE GAUNTLET
// ===================================

function loadLevel1() {
    // Ground platforms
    for (let i = 0; i < 30; i++) {
        platforms.push({
            x: i * 200,
            y: 650,
            width: 200,
            height: 70,
            color: '#228B22'
        });
    }

    // Elevated platforms
    platforms.push({ x: 400, y: 500, width: 150, height: 30, color: '#8B4513' });
    platforms.push({ x: 700, y: 450, width: 150, height: 30, color: '#8B4513' });
    platforms.push({ x: 1000, y: 400, width: 150, height: 30, color: '#8B4513' });
    platforms.push({ x: 1300, y: 500, width: 150, height: 30, color: '#8B4513' });
    platforms.push({ x: 1600, y: 450, width: 200, height: 30, color: '#8B4513' });
    platforms.push({ x: 2000, y: 500, width: 150, height: 30, color: '#8B4513' });
    platforms.push({ x: 2400, y: 550, width: 200, height: 30, color: '#8B4513' });

    // Gaps (no platforms)
    platforms = platforms.filter(p => {
        return !((p.x > 800 && p.x < 1000 && p.y === 650) ||
                 (p.x > 1800 && p.x < 2200 && p.y === 650) ||
                 (p.x > 3000 && p.x < 3400 && p.y === 650));
    });

    // Giant Fox (stationary, shoots projectiles)
    fox = {
        x: 2000,
        y: 200,
        width: 80,
        height: 80,
        color: '#FF4500',
        shootTimer: 0,
        shootInterval: 90
    };

    // Guard Dogs (chase from behind)
    enemies.push({
        x: -100,
        y: 580,
        width: 50,
        height: 40,
        velocityX: 3.5,
        color: '#654321',
        type: 'dog'
    });

    enemies.push({
        x: -200,
        y: 580,
        width: 50,
        height: 40,
        velocityX: 3.5,
        color: '#654321',
        type: 'dog'
    });

    // Goal flag
    platforms.push({
        x: 5000,
        y: 650,
        width: 100,
        height: 70,
        color: '#FFD700',
        isGoal: true
    });
}

// ===================================
// LEVEL 2: THE KEY HUNT
// ===================================

function loadLevel2() {
    // Ground platforms
    for (let i = 0; i < 25; i++) {
        platforms.push({
            x: i * 200,
            y: 650,
            width: 200,
            height: 70,
            color: '#696969'
        });
    }

    // Elevated platforms
    platforms.push({ x: 400, y: 500, width: 150, height: 30, color: '#808080' });
    platforms.push({ x: 700, y: 400, width: 150, height: 30, color: '#808080' });
    platforms.push({ x: 1000, y: 500, width: 150, height: 30, color: '#808080' });
    platforms.push({ x: 1400, y: 450, width: 200, height: 30, color: '#808080' });
    platforms.push({ x: 1800, y: 400, width: 150, height: 30, color: '#808080' });
    platforms.push({ x: 2200, y: 500, width: 150, height: 30, color: '#808080' });
    platforms.push({ x: 2600, y: 450, width: 200, height: 30, color: '#808080' });

    // Gaps
    platforms = platforms.filter(p => {
        return !((p.x > 600 && p.x < 800 && p.y === 650) ||
                 (p.x > 1200 && p.x < 1500 && p.y === 650) ||
                 (p.x > 2000 && p.x < 2300 && p.y === 650));
    });

    // The Key (collectible)
    key = {
        x: 3000,
        y: 400,
        width: 40,
        height: 40,
        color: '#FFD700',
        collected: false
    };

    // Falling rocks spawn over time
    // (handled in update function)
}

// ===================================
// LEVEL 3: DOWN THE RABBIT HOLE
// ===================================

function loadLevel3() {
    // Vertical falling level
    player.y = 100;
    player.x = GAME_WIDTH / 2;

    // Key falling below player
    key = {
        x: GAME_WIDTH / 2 - 20,
        y: 5000, // Far below
        width: 40,
        height: 40,
        color: '#FFD700',
        collected: false
    };

    // Obstacles will be walls protruding from sides
    // Generated procedurally during gameplay
}

// ===================================
// LEVEL 4: THE RESCUE
// ===================================

function loadLevel4() {
    // Small single-screen stealth level
    camera.x = 0;
    camera.y = 0;

    // Ground
    platforms.push({
        x: 0,
        y: 650,
        width: GAME_WIDTH,
        height: 70,
        color: '#2F4F4F'
    });

    // Cage with Blue Bell
    cage = {
        x: 1100,
        y: 500,
        width: 80,
        height: 100,
        color: '#C0C0C0',
        unlocked: false
    };

    // Giant Fox patrolling
    fox = {
        x: 400,
        y: 580,
        width: 80,
        height: 70,
        color: '#FF4500',
        velocityX: 2,
        lookingAway: false,
        lookAwayTimer: 0,
        patrolMin: 200,
        patrolMax: 800
    };

    // Player starts on left
    player.x = 50;
    player.y = 580;
}

// ===================================
// GAME UPDATE LOOP
// ===================================

function update() {
    if (gameState !== 'PLAYING') return;

    if (currentLevel === 1) {
        updateLevel1();
    } else if (currentLevel === 2) {
        updateLevel2();
    } else if (currentLevel === 3) {
        updateLevel3();
    } else if (currentLevel === 4) {
        updateLevel4();
    }
}

function updateLevel1() {
    // Player movement
    if (keys['ArrowLeft']) {
        player.velocityX = -MOVE_SPEED;
    } else if (keys['ArrowRight']) {
        player.velocityX = MOVE_SPEED;
    } else {
        player.velocityX = 0;
    }

    // Apply gravity
    player.velocityY += GRAVITY;

    // Update position
    player.x += player.velocityX;
    player.y += player.velocityY;

    // Platform collision
    player.onGround = false;
    for (let platform of platforms) {
        if (checkCollision(player, platform) && player.velocityY >= 0) {
            player.y = platform.y - player.height;
            player.velocityY = 0;
            player.onGround = true;

            // Check if reached goal
            if (platform.isGoal) {
                nextLevel();
                return;
            }
        }
    }

    // Keep player from going off left edge
    if (player.x < camera.x) {
        player.x = camera.x;
    }

    // Camera follows player
    camera.x = Math.max(0, player.x - 300);

    // Fox shoots projectiles
    if (fox) {
        fox.shootTimer++;
        if (fox.shootTimer >= fox.shootInterval) {
            fox.shootTimer = 0;
            projectiles.push({
                x: fox.x,
                y: fox.y + 40,
                width: 20,
                height: 20,
                velocityX: -6,
                velocityY: 2,
                color: '#FFA500'
            });
        }
    }

    // Update projectiles
    for (let i = projectiles.length - 1; i >= 0; i--) {
        let proj = projectiles[i];
        proj.x += proj.velocityX;
        proj.y += proj.velocityY;

        // Check collision with player
        if (checkCollision(player, proj)) {
            projectiles.splice(i, 1);
            loseLife();
            return;
        }

        // Remove off-screen projectiles
        if (proj.x < camera.x - 100 || proj.x > camera.x + GAME_WIDTH + 100) {
            projectiles.splice(i, 1);
        }
    }

    // Update dogs (chase player)
    for (let enemy of enemies) {
        if (enemy.type === 'dog') {
            enemy.x += enemy.velocityX;

            // Check collision with player
            if (checkCollision(player, enemy)) {
                loseLife();
                return;
            }
        }
    }

    // Death from falling
    if (player.y > GAME_HEIGHT) {
        loseLife();
    }
}

function updateLevel2() {
    // Player movement
    if (keys['ArrowLeft']) {
        player.velocityX = -MOVE_SPEED;
    } else if (keys['ArrowRight']) {
        player.velocityX = MOVE_SPEED;
    } else {
        player.velocityX = 0;
    }

    // Apply gravity
    player.velocityY += GRAVITY;

    // Update position
    player.x += player.velocityX;
    player.y += player.velocityY;

    // Platform collision
    player.onGround = false;
    for (let platform of platforms) {
        if (checkCollision(player, platform) && player.velocityY >= 0) {
            player.y = platform.y - player.height;
            player.velocityY = 0;
            player.onGround = true;
        }
    }

    // Camera follows player
    camera.x = Math.max(0, player.x - 300);

    // Check key collection
    if (key && !key.collected && checkCollision(player, key)) {
        key.collected = true;
        player.hasKey = true;
        // Cutscene: Fox steals key
        setTimeout(() => {
            nextLevel();
        }, 1000);
    }

    // Spawn falling rocks randomly
    if (Math.random() < 0.02) {
        fallingRocks.push({
            x: camera.x + Math.random() * GAME_WIDTH,
            y: -50,
            width: 40,
            height: 40,
            velocityY: 4,
            color: '#696969'
        });
    }

    // Update falling rocks
    for (let i = fallingRocks.length - 1; i >= 0; i--) {
        let rock = fallingRocks[i];
        rock.y += rock.velocityY;

        // Check collision with player
        if (checkCollision(player, rock)) {
            fallingRocks.splice(i, 1);
            loseLife();
            return;
        }

        // Remove rocks that hit ground or go off-screen
        if (rock.y > GAME_HEIGHT) {
            fallingRocks.splice(i, 1);
        }
    }

    // Death from falling
    if (player.y > GAME_HEIGHT) {
        loseLife();
    }
}

function updateLevel3() {
    // Vertical falling - player moves horizontally only
    if (keys['ArrowLeft']) {
        player.x -= MOVE_SPEED;
    }
    if (keys['ArrowRight']) {
        player.x += MOVE_SPEED;
    }

    // Keep player on screen
    if (player.x < 50) player.x = 50;
    if (player.x > GAME_WIDTH - player.width - 50) player.x = GAME_WIDTH - player.width - 50;

    // Player and key fall automatically
    player.y += 5;
    if (key && !key.collected) {
        key.y += 5;
    }

    // Camera follows player vertically
    camera.y = player.y - GAME_HEIGHT / 2;

    // Spawn obstacles (walls from sides)
    if (Math.random() < 0.05) {
        let side = Math.random() < 0.5 ? 'left' : 'right';
        platforms.push({
            x: side === 'left' ? 0 : GAME_WIDTH - 150,
            y: player.y + GAME_HEIGHT,
            width: 150,
            height: 40,
            color: '#654321',
            velocityY: 0
        });
    }

    // Check collision with obstacles
    for (let platform of platforms) {
        if (checkCollision(player, platform)) {
            loseLife();
            return;
        }
    }

    // Check if reached key
    if (key && !key.collected && checkCollision(player, key)) {
        key.collected = true;
        player.hasKey = true;
        setTimeout(() => {
            nextLevel();
        }, 500);
    }

    // Check if key is far above (player fell too slow)
    if (key && !key.collected && player.y > key.y + 200) {
        loseLife();
    }
}

function updateLevel4() {
    // Stealth level - player moves carefully
    let isMoving = false;

    if (keys['ArrowLeft']) {
        player.x -= 2;
        isMoving = true;
    }
    if (keys['ArrowRight']) {
        player.x += 2;
        isMoving = true;
    }

    // Keep player on ground
    player.y = 580;

    // Fox patrol behavior
    if (fox) {
        fox.x += fox.velocityX;

        // Reverse direction at patrol boundaries
        if (fox.x <= fox.patrolMin || fox.x >= fox.patrolMax) {
            fox.velocityX *= -1;
        }

        // Look away mechanic
        fox.lookAwayTimer++;
        if (fox.lookAwayTimer > 120) {
            fox.lookingAway = true;
        }
        if (fox.lookAwayTimer > 180) {
            fox.lookingAway = false;
            fox.lookAwayTimer = 0;
        }

        // Check if player is caught moving
        if (isMoving && !fox.lookingAway) {
            loseLife();
            return;
        }
    }

    // Check if player reached cage
    if (cage && !cage.unlocked && checkCollision(player, cage)) {
        if (fox && fox.lookingAway) {
            cage.unlocked = true;
            victory();
        }
    }
}

// ===================================
// GAME RENDER LOOP
// ===================================

function draw() {
    // Clear canvas
    ctx.fillStyle = currentLevel === 3 ? '#2F4F4F' : '#87CEEB';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    if (gameState !== 'PLAYING') return;

    // Draw platforms
    for (let platform of platforms) {
        drawRect(platform.x, platform.y, platform.width, platform.height, platform.color);
    }

    // Draw fox
    if (fox) {
        drawRect(fox.x, fox.y, fox.width, fox.height, fox.color);

        // Draw eyes
        ctx.fillStyle = currentLevel === 4 && fox.lookingAway ? '#FFFFFF' : '#000000';
        ctx.fillRect(fox.x + 20 - camera.x, fox.y + 20 - camera.y, 10, 10);
        ctx.fillRect(fox.x + 50 - camera.x, fox.y + 20 - camera.y, 10, 10);

        // Indicate looking away in level 4
        if (currentLevel === 4 && fox.lookingAway) {
            ctx.fillStyle = '#00FF00';
            ctx.fillRect(fox.x + fox.width / 2 - 5 - camera.x, fox.y - 20 - camera.y, 10, 10);
        }
    }

    // Draw projectiles
    for (let proj of projectiles) {
        drawRect(proj.x, proj.y, proj.width, proj.height, proj.color);
    }

    // Draw falling rocks
    for (let rock of fallingRocks) {
        drawRect(rock.x, rock.y, rock.width, rock.height, rock.color);
    }

    // Draw enemies
    for (let enemy of enemies) {
        drawRect(enemy.x, enemy.y, enemy.width, enemy.height, enemy.color);
    }

    // Draw key
    if (key && !key.collected) {
        drawRect(key.x, key.y, key.width, key.height, key.color);
        // Sparkle effect
        ctx.fillStyle = '#FFFF00';
        ctx.fillRect(key.x - 5 - camera.x, key.y + 15 - camera.y, 5, 5);
        ctx.fillRect(key.x + key.width - camera.x, key.y + 15 - camera.y, 5, 5);
    }

    // Draw cage
    if (cage) {
        drawRect(cage.x, cage.y, cage.width, cage.height, cage.color);
        // Draw Blue Bell inside
        ctx.fillStyle = '#FFA500';
        ctx.fillRect(cage.x + 20 - camera.x, cage.y + 40 - camera.y, 40, 40);
    }

    // Draw player
    drawRect(player.x, player.y, player.width, player.height, player.color);
    // Draw eyes
    ctx.fillStyle = '#00FF00'; // Green eyes
    ctx.fillRect(player.x + 10 - camera.x, player.y + 15 - camera.y, 8, 8);
    ctx.fillRect(player.x + 22 - camera.x, player.y + 15 - camera.y, 8, 8);

    // Draw level-specific UI
    if (currentLevel === 2 && key && !key.collected) {
        drawText('Find the Key!', GAME_WIDTH / 2, 50, 36, '#FFD700');
    }
    if (currentLevel === 3) {
        drawText('Catch the Key!', GAME_WIDTH / 2, 50, 36, '#FFD700');
    }
    if (currentLevel === 4) {
        drawText('Move when fox looks away!', GAME_WIDTH / 2, 50, 24, '#FFFFFF');
    }
}

// ===================================
// MAIN GAME LOOP
// ===================================

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Initialize game when DOM is ready
function initGame() {
    // Set up canvas
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    GAME_WIDTH = canvas.width;
    GAME_HEIGHT = canvas.height;

    // UI Button handlers
    document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('restart-button').addEventListener('click', restartGame);
    document.getElementById('play-again-button').addEventListener('click', restartGame);

    // Start the game loop
    gameLoop();
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}
