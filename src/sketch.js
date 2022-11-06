let isPaused = false;

let numPlayers = 100;

let gameX = null, gameY = null;

let game = null;

function setup(){

    createCanvas(windowWidth, windowHeight);

    gameX = windowWidth - 100, gameY = windowHeight;

    game = new Game(gameX, gameY, numPlayers);

}

function draw(){
    
    if(isPaused){
        return;
    }

    background(1);

    noFill();
    stroke(255);
    rect(0, 0, gameX, gameY);

    game.drawGame(mouseX, mouseY);
    
}

function mousePressed(){

}

function keyTyped(){
    if(key == ' '){
        isPaused = !isPaused;
    }
}
