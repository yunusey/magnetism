class Game{

    constructor(gameX, gameY, numPlayers){

        this.players = [];

        let colorPoleNorth = Array(0, 0, 255, 0);
        let colorPoleSouth = Array(255, 0, 0, 0);

        this.goal = [gameX / 2 - 100, gameY - 150, gameX / 2 + 100, gameY - 50];
        this.goalArea = new goalArea(this.goal, Array(255, 255, 0, 200))

        this.timerCord = [gameX, 100, windowWidth, 300];
        this.timer = new Timer(1, 0, this.timerCord);

        this.expectedRangeX = [25, gameX - 25];
        this.expectedRangeY = [25, gameY - 25];

        this.gameX = gameX;
        this.gameY = gameY;


        for(let i = 0; i < numPlayers; i++){

            let randX = Math.random() * (this.expectedRangeX[1] - this.expectedRangeX[0]) + this.expectedRangeX[0];
            let randY = Math.random() * (this.expectedRangeY[1] - this.expectedRangeY[0]) + this.expectedRangeY[0];

            if(randX + 25 >= this.goal[0] && randX - 25 <= this.goal[2]){
                let newExpectedRangeY1 = [25, this.goal[1] - 25];
                let newExpectedRangeY2 = [this.goal[3] + 25, this.gameY - 25];

                let yRange = 0;
                yRange += Math.max(0, newExpectedRangeY1[1] - newExpectedRangeY1[0]);
                yRange += Math.max(0, newExpectedRangeY2[1] - newExpectedRangeY2[0]);

                randY = Math.random() * yRange;

                if(randY > newExpectedRangeY1[1] + newExpectedRangeY1[0]){
                    let diff = randY - newExpectedRangeY1[0] - newExpectedRangeY1[1];
                    randY = newExpectedRangeY2[0] + diff;
                }
                else{
                    randY += newExpectedRangeY1[0];
                }
            }


            let newPlayer = new Player(randX, randY, Array((i % 2 == 0) * 255, 0, (i % 2 != 0) * 255, 255), i % 2 == 0, 25, this);
            this.players.push(newPlayer);
        }

    }

    drawGame(mouseCordX, mouseCordY){
        
        this.goalArea.drawObject();
        this.timer.drawObject();

        noStroke();
        for(let i = 0; i < numPlayers; i++){
            this.players[i].play(mouseCordX, mouseCordY);
        }

    }
}


class goalArea{
    constructor(goal, color){
        this.goal = goal;
        this.color = color;
    }

    isInTheGoal(xCord, yCord, radius){
        let isInTheGoal = 
            xCord - radius >= this.goal[0] && 
            xCord + radius <= this.goal[2] && 
            yCord - radius >= this.goal[1] &&
            yCord + radius <= this.goal[3];
        
        return isInTheGoal;
    }

    drawObject(){

        stroke(255);
        fill(this.color[0], this.color[1], this.color[2], this.color[3]);
        rect(this.goal[0], this.goal[1], this.goal[2] - this.goal[0], this.goal[3] - this.goal[1]);
        fill(255, 200);
        circle((this.goal[0] + this.goal[2]) / 2, (this.goal[1] + this.goal[3]) / 2, 40);

    }
}

class Timer{
    constructor(minutes, seconds, cord){

        this.minutes = minutes;
        this.seconds = seconds;

        this.cord = cord;

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
        text(stringToDisplay, this.cord[0], this.cord[1], this.cord[2], this.cord[3]);

        let leftPlayersCounter = this.numPlayersInTheGoalArea + "/" + numPlayers;
        text(leftPlayersCounter, this.cord[0], this.cord[1] + 100, this.cord[2], this.cord[3] + 100);

        if(frameCount % 60 == 0){
            if(this.seconds > 0){
                this.seconds--;
            }
            else{
                this.minutes--;
                this.seconds = 59;
            }
        }

        if(this.minutes == 0 && this.seconds == 0){
            finishTheGame();
        }
    }

    finishTheGame(){

    }

    addNumberOfPlayersInTheGoalArea(){
        this.numPlayersInTheGoalArea++;
        this.numPlayersLeft--;
    }
}