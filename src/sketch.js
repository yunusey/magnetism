let isPaused = false;

let players = [];
let numPlayers = 100;
let startingLocationX = 300, startingLocationY = 300;

let gameX = null, gameY = null;

let expectedRangeX = null, expectedRangeY = null;

let goal = null;

function setup(){

    createCanvas(windowWidth, windowHeight);

    gameX = windowWidth - 100, gameY = windowHeight;

    goal = [gameX / 2 - 100, gameY - 100, gameX / 2 + 100, gameY];
    expectedRangeX = [25, gameX - 25];
    expectedRangeY = [25, gameY - 25];

    for(let i = 0; i < numPlayers; i++){

        let randX = Math.random() * (expectedRangeX[1] - expectedRangeX[0]) + expectedRangeX[0];
        let randY = Math.random() * (expectedRangeY[1] - expectedRangeY[0]) + expectedRangeY[0];

        let newPlayer = new Player(randX, randY, Array((i % 2 == 0) * 255, 0, (i % 2 != 0) * 255, 255), i % 2 == 0, 25);
        players.push(newPlayer);
    }

}

function draw(){
    
    if(isPaused){
        return;
    }

    background(1);

    noFill();
    stroke(255);
    rect(0, 0, gameX, gameY);

    stroke(255);
    rect(goal[0], goal[1], goal[2] - goal[0], goal[3] - goal[1]);

    noStroke();
    for(let i = 0; i < numPlayers; i++){
        players[i].play(mouseX, mouseY);
    }

    
}

function mousePressed(){

}

function keyTyped(){
    if(key == ' '){
        isPaused = !isPaused;
    }
}
