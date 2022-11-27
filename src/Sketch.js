let isPaused = false;
let isGameFinished = false;
let isGameWon = true;

let numPlayers = 2;

let playerCoords = [];
let goalCords = [];
let cannonCords = [];

let areBoundariesAllowed = true;

let gameX = null, gameY = null;

let game = null;

function createGoalCords(){

    return [
        [gameX / 2, gameY / 2, 50, "circle", 0]
    ];

}

function createPlayerCords(){

    // In the last index of each coordinate there must an integer value (0, 1, 2)
    // which represents the restrictions. If;
    // 0, no restrictions (both can be affected),
    // 1, just north pole can be affected,
    // 2, just south pole can be affected,

    return [
        [gameX / 2 - 200, gameY / 2 - 100, -1, 1, 1, false],
        [gameX / 2 + 200, gameY / 2 + 100, 1, -1, 1, true]
    ];

}

function createCannonCords(){

    return [
        [800, 400, 120, 20, false],
        [200, 600, 30, 20, true]
    ];
    
}

function setup(){

    createCanvas(windowWidth, windowHeight);

    gameX = windowWidth - 300, gameY = windowHeight;

    playerCoords = createPlayerCords();
    goalCords = createGoalCords();
    cannonCords = createCannonCords();

    game = new Game(
        gameX, 
        gameY, 
        numPlayers, 
        playerCoords, 
        goalCords, 
        cannonCords, 
        areBoundariesAllowed
    );

}

function draw(){
    
    if(isPaused){
        return;
    }

    background(1);

    noFill();
    stroke(255);
    rect(0, 0, gameX, gameY);

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
