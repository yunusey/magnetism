class Player{
    constructor(startingX, startingY, color, pole, radius, game){

        this.color = color;
        console.log(this.color);

        this.pole = pole;

        this.x = startingX, this.y = startingY, this.r = radius;
        this.velX = 0, this.velY = 0;

        this.isInTheGoal = false;

        this.game = game;
    }

    play(xCord, yCord){

        if(this.isInTheGoal){
            this.drawBall();
            return;
        }

        let xDiff = xCord - this.x, yDiff = yCord - this.y;
        let hDiff = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

        if(hDiff){
            let hForce = (this.pole ? 1 : -1) * Math.min(100 / Math.pow(hDiff, 2), 0.05);
            let xForce = hForce * (xDiff / Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2)));
            let yForce = hForce * (yDiff / Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2)));
            this.velX += xForce;
            this.velY += yForce;
            this.x += this.velX;
            this.y += this.velY;
        }
        if(this.x - this.r <= 0 || this.x + this.r >= this.game.gameX){
            this.velX = -this.velX;
        }
        
        if(this.y - this.r < 0 || this.y + this.r > this.game.gameY){
            this.velY = -this.velY;
        }

        if(this.x - this.r >= this.game.goal[0] && 
            this.x + this.r <= this.game.goal[2] && 
            this.y - this.r > this.game.goal[1]){

            this.isInTheGoal = true;
        }

        this.drawBall();
    }

    drawBall() {
        fill(this.color[0], this.color[1], this.color[2], this.color[3]);
        circle(this.x, this.y, this.r * 2);
    }
}