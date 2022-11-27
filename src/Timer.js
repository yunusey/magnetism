class Timer{
    constructor(minutes, seconds, cord, numParticles){

        this.minutes = minutes;
        this.seconds = seconds;

        this.cord = cord;

        this.numParticles = numParticles;
        this.numParticlesLeft = numParticles;
        this.numParticlesInTheGoalArea = 0;

    }

    drawObject(){

        let secondsString = (this.seconds.toString().length == 1 ? "0" : "") + this.seconds;
        let minutesString = (this.minutes.toString().length == 1 ? "0" : "") + this.minutes;

        let stringToDisplay = minutesString + ":" + secondsString;

        textSize(100);
        stroke(255);
        fill(255);

        text(
            stringToDisplay, 
            this.cord[0] + 10, 
            this.cord[1], 
            this.cord[2] + 19, 
            this.cord[3]
        );

        let leftParticlesCounter = this.numParticlesInTheGoalArea + "/" + this.numParticles;
        text(
            leftParticlesCounter, 
            this.cord[0] + 10, 
            this.cord[1] + 100, 
            this.cord[2] + 10, 
            this.cord[3] + 100
        );

        if(frameCount % 60 == 0 && !isGameFinished){

            if(this.seconds > 0){
                this.seconds--;
            }
            else{
                this.minutes--;
                this.seconds = 59;
            }

        }

        if (!isGameFinished && ((this.minutes == 0 && this.seconds == 0) || this.numParticlesLeft == 0)){

            this.finishTheGame();

        }

        if(isGameFinished){

            textSize(60);
            noStroke();

            if(isGameWon)
                fill(0, 255, 0, 255);
            else
                fill(255, 0, 0, 255);

            text(
                "Game\nFinished⏵", 
                this.cord[0] + 10, 
                this.cord[1] + 300, 
                this.cord[2] + 10, 
                this.cord[3] + 300
            );

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
        this.numParticlesInTheGoalArea++;
        this.numParticlesLeft--;
    }

}