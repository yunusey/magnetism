class Particle{

    constructor(startingX, startingY, velX, velY, color, pole, power, radius, game){

        this.color = color;

        this.pole = pole;
        this.power = power;

        this.x = startingX, this.y = startingY, this.r = radius;
        this.velX = velX, this.velY = velY;

        this.isInTheGoal = false;

        this.game = game;

    }

    play(xCord, yCord){

        if(this.isInTheGoal){

            return;

        }

        if(this.isInTheGoals(this.x, this.y, this.r)){

            let hForce = -0.2;
            let xFrict = hForce * this.velX;
            let yFrict = hForce * this.velY;


            this.velX += xFrict;
            this.velY += yFrict;

            let precisionForConsideringTheBallStopped = 0.0001;
            if(Math.abs(this.velX) < precisionForConsideringTheBallStopped && 
               Math.abs(this.velY) < precisionForConsideringTheBallStopped){

                this.isInTheGoal = true;
                this.game.timer.addNumberOfPlayersInTheGoalArea();

            }

        }

        else{

            let xDiff = xCord - this.x, yDiff = yCord - this.y;
            let hDiff = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

            if(hDiff){

                let hForce = (this.pole ? -1 : 1) * Math.min(100 / Math.pow(hDiff, 2), 0.05) * this.power;
                let xForce = hForce * (xDiff / Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2)));
                let yForce = hForce * (yDiff / Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2)));


                this.velX += xForce;
                this.velY += yForce;

            }
        
        }

        this.x += this.velX;
        this.y += this.velY;

        if(this.x - this.r <= 0 || this.x + this.r >= this.game.gameX){
            if(this.game.areBoundariesAllowed)
                this.velX = -this.velX;
            else
                this.game.timer.loseTheGame();
        }
        
        if(this.y - this.r < 0 || this.y + this.r >= this.game.gameY){
            if(this.game.areBoundariesAllowed)
                this.velY = -this.velY;
            else
                this.game.timer.loseTheGame();
        }

    }

    drawBall() {

        fill(this.color[0], this.color[1], this.color[2], this.color[3]);
        circle(this.x, this.y, this.r * 2);

    }

    isInTheGoals(x, y, r){

        for(let i = 0; i < this.game.goalAreas.length; i++){

            let isInTheGoal = this.game.goalAreas[i].isInTheGoal(x, y, r, this.pole);
            if(isInTheGoal){
                return true;
            }

        }

        return false;

    }

}