class Game{

    constructor(gameX, gameY, numPlayers, playerCords, goalCords, cannonCords, areBoundariesAllowed){

        this.players = [];

        let colorPoleNorth = Array(0, 0, 255, 255);
        let colorPoleSouth = Array(255, 0, 0, 255);

        this.goalCords = goalCords;
        this.goalAreas = [];
        for(let i = 0; i < goalCords.length; i++){

            let shape = this.goalCords[i][this.goalCords[i].length - 2];
            let restriction = this.goalCords[i][this.goalCords[i].length - 1];

            if(shape == "rect"){
                let newGoalCord = [
                    this.goalCords[i][0], this.goalCords[i][1],
                    this.goalCords[i][2], this.goalCords[i][3]
                ];
                let newGoalArea = new goalArea(newGoalCord, Array(255, 255, 0, 200), shape, restriction);
                this.goalAreas.push(newGoalArea);
            }

            else if(shape == "circle"){
                let newGoalCord = [
                    this.goalCords[i][0], this.goalCords[i][1], this.goalCords[i][2]
                ];
                let newGoalArea = new goalArea(newGoalCord, Array(255, 255, 0, 200), shape, restriction);
                this.goalAreas.push(newGoalArea);
            }
        }

        this.timerCord = [gameX, 100, windowWidth, 300];
        this.timer = new Timer(1, 0, this.timerCord, numPlayers);

        this.expectedRangeX = [25, gameX - 25];
        this.expectedRangeY = [25, gameY - 25];

        this.gameX = gameX;
        this.gameY = gameY;

        this.areBoundariesAllowed = areBoundariesAllowed;

        for(let i = 0; i < numPlayers; i++){

            let isNorth = playerCords[i][5];
            let colorForPlayer = isNorth ? colorPoleNorth : colorPoleSouth;
            let power = playerCords[i][4];

            let newPlayer = new Player(
                playerCords[i][0], playerCords[i][1], 
                playerCords[i][2], playerCords[i][3],
                colorForPlayer, 
                isNorth, power,
                25, this
                );
                
            this.players.push(newPlayer);

        }

        this.cannonCords = cannonCords;
        this.cannons = [];
        for(let i = 0; i < this.cannonCords.length; i++){
            let newCannon = new Cannon(
                this.cannonCords[i][0], 
                this.cannonCords[i][1],
                this.cannonCords[i][2],
                this.cannonCords[i][3],
                this.cannonCords[i][4]
                );
            this.cannons.push(newCannon);
        }

    }

    playGame(mouseCordX, mouseCordY){

        for(let i = 0; i < numPlayers; i++){
            this.players[i].play(mouseCordX, mouseCordY);
        }

        for(let i = 0; i < this.cannons.length; i++){
            this.cannons[i].play(mouseCordX, mouseCordY);
        }

        for(let i = 0; i < numPlayers; i++){
            for(let j = 0; j < this.cannons.length; j++){
                let touches = this.cannons[j].handleTouches(
                    this.players[i].x, 
                    this.players[i].y, 
                    this.players[i].r
                );
                if(touches){
                    this.timer.loseTheGame();
                }
            }
        }

    }

    drawGame(){
        
        for(let i = 0; i < this.goalAreas.length; i++){
            this.goalAreas[i].drawObject();
        }

        noStroke();
        for(let i = 0; i < numPlayers; i++){
            this.players[i].drawBall();
        }

        for(let i = 0; i < this.cannons.length; i++){
            this.cannons[i].drawObject();
        }

        this.timer.drawObject();

    }
}


class goalArea{
    constructor(goalCord, color, shape, restriction){
        this.goalCord = goalCord;
        this.color = color;
        this.shape = shape;

        this.restriction = restriction;

    }

    isInTheGoal(xCord, yCord, radius, pole){

        if(this.restriction == 1 && !pole){
            return false;
        }

        else if(this.restriction == 2 && pole){
            return false;
        }

        if(this.shape == "rect"){

            let isInTheGoal = 
                xCord - radius >= this.goalCord[0] && 
                xCord + radius <= this.goalCord[2] && 
                yCord - radius >= this.goalCord[1] &&
                yCord + radius <= this.goalCord[3];
            return isInTheGoal;

        }    
        else if(this.shape == "circle"){

            let xDiff = Math.abs(xCord - this.goalCord[0]);
            let yDiff = Math.abs(yCord - this.goalCord[1]);

            let hDiff = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2)) + radius;
            if(hDiff <= this.goalCord[2]){
                return true;
            }
            return false;
        }
    }

    drawObject(){

        stroke(255);
        fill(this.color[0], this.color[1], this.color[2], this.color[3]);
        if(this.shape == "rect"){
            rect(
                this.goalCord[0], 
                this.goalCord[1], 
                this.goalCord[2] - this.goalCord[0], 
                this.goalCord[3] - this.goalCord[1]
                );
        }
        else if(this.shape == "circle"){
            circle(
                this.goalCord[0], 
                this.goalCord[1], 
                this.goalCord[2] * 2
                );
        }
    }
}

class Timer{
    constructor(minutes, seconds, cord, numPlayers){

        this.minutes = minutes;
        this.seconds = seconds;

        this.cord = cord;

        this.numPlayers = numPlayers;
        this.numPlayersLeft = numPlayers;
        this.numPlayersInTheGoalArea = 0;
    }

    drawObject(){

        let secondsString = (this.seconds.toString().length == 1 ? "0" : "") + this.seconds;
        let minutesString = (this.minutes.toString().length == 1 ? "0" : "") + this.minutes;

        let stringToDisplay = minutesString + ":" + secondsString;

        //textAlign(CENTER, CENTER);
        textSize(100);
        stroke(255);
        fill(255);
        text(stringToDisplay, this.cord[0] + 10, this.cord[1], this.cord[2] + 19, this.cord[3]);

        let leftPlayersCounter = this.numPlayersInTheGoalArea + "/" + this.numPlayers;
        text(leftPlayersCounter, this.cord[0] + 10, this.cord[1] + 100, this.cord[2] + 10, this.cord[3] + 100);

        if(frameCount % 60 == 0 && !isGameFinished){
            if(this.seconds > 0){
                this.seconds--;
            }
            else{
                this.minutes--;
                this.seconds = 59;
            }
        }

        if (!isGameFinished && ((this.minutes == 0 && this.seconds == 0) || this.numPlayersLeft == 0)){
            this.finishTheGame();
        }

        if(isGameFinished){
            textSize(60);
            noStroke();
            if(isGameWon)
                fill(0, 255, 0, 255);
            else
                fill(255, 0, 0, 255);
            text("Game\nFinished" + '⏵', this.cord[0] + 10, this.cord[1] + 300, this.cord[2] + 10, this.cord[3] + 300);
        }
    }

    finishTheGame(){
        isGameFinished = true;
    }

    loseTheGame(){
        isGameFinished = true;
        isGameWon = false;
    }

    addNumberOfPlayersInTheGoalArea(){
        this.numPlayersInTheGoalArea++;
        this.numPlayersLeft--;
    }
}