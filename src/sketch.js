let isPaused = false;
let isGameFinished = false;

let numPlayers = 6;

let playerCoords = [
    [100, 300, false],
    [200, 400, true],
    [300, 500, false],
    [300, 600, true],
    [200, 700, false],
    [100, 800, true]
];

// In the last index of each coordinate there must an integer value (0, 1, 2)
// which represents the restrictions. If;
// 0, no restrictions (both can be affected),
// 1, just north pole can be affected,
// 2, just south pole can be affected,

let goalCords = [
    [392.5, 798, 592.5, 898, "rect", 0],
    [492.5, 598, 50, "circle", 2],
    [492.5, 398, 50, "circle", 1]
];

let gameX = null, gameY = null;

let game = null;

function setup(){

    createCanvas(windowWidth, windowHeight);

    gameX = windowWidth - 300, gameY = windowHeight;

    game = new Game(gameX, gameY, numPlayers, playerCoords, goalCords);

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
