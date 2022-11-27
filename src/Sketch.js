let isPaused = false;
let isGameFinished = false;
let isGameWon = true;

let numParticles = 0;

let particleCords = [];
let goalCords = [];
let cannonCords = [];

let areBoundariesAllowed = true;

let gameX = null, gameY = null;
let game = null;

function createGoalCords(){

    // For each Goal Area, you should create an Array.
    // These Arrays will be a member of another Array which the function should return.

    // If Circle,
    // The first two indices (0, 1) represent the x-coordinate and y-coordinate of center respectively.
    // The next index (2) represents the radius.
    // The next index (3) represents the type which should be "circle".
    // The next index (4) represents the restriction.


    // If Rectangle,
    // The first two indices (0, 1) represent the x-coordinate and y-coordinate of top-left corner respectively.
    // The next two indices (2, 3) represent the x-coordinate and y-coordinate of bottom-right corner respectively.
    // The next index (4) represents the type which should be "rect".
    // The next index (5) represents the restriction.

    // In the last index of each coordinate there must be an integer value (0, 1, 2)
    // which represents the restrictions. If;
    // 0, no restrictions (both can be affected);
    // 1, just north pole can be affected;
    // 2, just south pole can be affected.
    // What meant by "affected" is the goal can slow down the particles unless they stopped.
    // If they stopped already, it will increase the number of particles that are captured.

    return [
        [gameX / 2, gameY / 2, 50, "circle", 0]
    ];

}

function createParticleCords(){
    
    // For each Particle, you should create an Array.
    // These Arrays will be a member of another Array which the function should return.

    // Make sure to assign the number of particles to numParticles (global variable).
    numParticles = 2;

    // The first two indices (0, 1) represent the x-coordinate and y-coordinate of particle respectively.
    // The next two indices (2, 3) represent the velocity-x and velocity-y respectively.
    // The last index (4) represents the pole. (If North (N), true; If South (S), false).

    return [
        [gameX / 2 - 200, gameY / 2 - 100, -1, 1, 1, false],
        [gameX / 2 + 200, gameY / 2 + 100, 1, -1, 1, true]
    ];

}

function createCannonCords(){

    // For each Cannon, you should create an Array.
    // These Arrays will be a member of another Array which the function should return.

    // The first two indices (0, 1) represent the x-coordinate and y-coordinate of top of the cannon respectively.
    // The next index (2) represents the angle of the cannon. (In degrees)
    // The next index (3) represents how many frames needed to create a new bullet. (Frames per Bullet)

    return [
        [800, 400, 120, 20, false]
    ];
    
}

function setup(){

    createCanvas(windowWidth, windowHeight);

    gameX = windowWidth - 300, gameY = windowHeight;

    particleCords = createParticleCords();
    goalCords = createGoalCords();
    cannonCords = createCannonCords();

    game = new Game(
        gameX, 
        gameY, 
        numParticles, 
        particleCords, 
        goalCords, 
        cannonCords, 
        areBoundariesAllowed
    );

}

function draw(){
    
    if(isPaused){
        return;
    }

    background(0);

    if(!isGameFinished)
        game.playGame(mouseX, mouseY);
    
    game.drawGame();
    
}

function mousePressed(){

}

function keyTyped(){

    if(key == ' '){
        isPaused = !isPaused;
    }

}
