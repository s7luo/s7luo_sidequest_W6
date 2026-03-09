let levelData;      
let currentLevel = 0; 
let tileSize = 50;  
// Added vr (visual row) and vc (visual col) to handle smooth physics sliding effects
let player = { r: 1, c: 1, vr: 1, vc: 1 }; 

// --- NEW: Physics/Visual effects variables ---
let particles = []; // Array to store particle effects

function preload() {
  levelData = loadJSON('levels.json');
}

function setup() {
  createCanvas(400, 300);
  noStroke();
  resetPlayer();
}

function draw() {
  background(220);

  let grid = levelData.levels[currentLevel].grid;

  // 1. Draw the map
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      let type = grid[r][c];
      let x = c * tileSize;
      let y = r * tileSize;

      if (type === 1) fill(50);             
      else if (type === 2) fill(100, 255, 100); 
      else if (type === 3) fill(255, 215, 0);   
      else fill(255);                       

      rect(x, y, tileSize, tileSize);
    }
  }

  // --- NEW: Physics (Smooth Movement using Lerp) ---
  // This smoothly transitions the visual position (vr, vc) to the actual grid position (r, c)
  player.vr = lerp(player.vr, player.r, 0.3);
  player.vc = lerp(player.vc, player.c, 0.3);

  // Draw player using visual coordinates (vc, vr) to show the sliding physical feedback
  fill(0);
  rect(player.vc * tileSize + 10, player.vr * tileSize + 10, tileSize - 20, tileSize - 20);

  // --- NEW: Visual Effects (Particle System) ---
  // Reverse loop, making it easier to remove particles from the array when they disappear
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.x += p.vx; // Move based on velocity (Physics X-axis)
    p.y += p.vy; // Move based on velocity (Physics Y-axis)
    p.alpha -= 10; // Fade out gradually

    fill(p.color[0], p.color[1], p.color[2], p.alpha);
    rect(p.x, p.y, p.size, p.size);

    // Remove particles that are completely transparent (disappeared)
    if (p.alpha <= 0) particles.splice(i, 1);
  }

  // Instructions text at the bottom
  fill(50);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Use Arrow Keys to Move. Reach Gold to Win!", width / 2, height - 25);
}

function keyPressed() {
  let grid = levelData.levels[currentLevel].grid;
  let nextR = player.r;
  let nextC = player.c;

  if (keyCode === LEFT_ARROW)  nextC--;
  if (keyCode === RIGHT_ARROW) nextC++;
  if (keyCode === UP_ARROW)    nextR--;
  if (keyCode === DOWN_ARROW)  nextR++;

  // Safety check: ensure we are within grid bounds
  if (nextR >= 0 && nextR < grid.length && nextC >= 0 && nextC < grid[0].length) {
    if (grid[nextR][nextC] !== 1) {
      player.r = nextR;
      player.c = nextC;

      // Check if the goal is reached
      if (grid[nextR][nextC] === 3) {
        // Trigger gold particle explosion
        spawnParticles(player.c * tileSize + 25, player.r * tileSize + 25, [255, 215, 0]); 
        setTimeout(nextLevel, 400); // Slight delay for the level transition so you can see the explosion effect!
      } 
    } else {
      // Hit a wall!
      // Generate grey wall powder/debris particles at the boundary between the player and the wall
      let hitX = ((player.c + nextC) / 2) * tileSize + 25;
      let hitY = ((player.r + nextR) / 2) * tileSize + 25;
      spawnParticles(hitX, hitY, [100, 100, 100]); 
    }
  }
}

// --- NEW: Helper function used to generate physical particle effects ---
function spawnParticles(x, y, colorArr) {
  for (let i = 0; i < 15; i++) {
    particles.push({
      x: x,
      y: y,
      vx: random(-3, 3), // Random X-axis velocity
      vy: random(-3, 3), // Random Y-axis velocity
      alpha: 255,        // Initial opacity
      size: random(4, 8),// Random size
      color: colorArr
    });
  }
}

function nextLevel() {
  currentLevel++;
  if (currentLevel >= levelData.levels.length) {
    currentLevel = 0;
  }
  resetPlayer();
}

function resetPlayer() {
  let grid = levelData.levels[currentLevel].grid;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === 2) {
        player.r = r;
        player.c = c;
        // Reset visual coordinates to prevent sliding from the previous level's exit to the current level's entrance
        player.vr = r;
        player.vc = c; 
        return;
      }
    }
  }
}