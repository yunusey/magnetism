class Game{

    constructor(gameX, gameY, numPlayers){

        this.players = [];

        let colorPoleNorth = Array(0, 0, 255, 0);
        let colorPoleSouth = Array(255, 0, 0, 0);

        this.goal = [gameX / 2 - 100, gameY - 100, gameX / 2 + 100, gameY];
        this.expectedRangeX = [25, gameX - 25];
        this.expectedRangeY = [25, gameY - 25];

        this.gameX = gameX;
        this.gameY = gameY;


        for(let i = 0; i < numPlayers; i++){

            let randX = Math.random() * (this.expectedRangeX[1] - this.expectedRangeX[0]) + this.expectedRangeX[0];
            let randY = Math.random() * (this.expectedRangeY[1] - this.expectedRangeY[0]) + this.expectedRangeY[0];

            if(randX + 25 >= this.goal[0] && randX - 25 <= this.goal[2]){
                let newExpectedRangeY = [25, this.goal[1] - 25];
                randY = Math.random() * (newExpectedRangeY[1] - newExpectedRangeY[0]) + newExpectedRangeY[0];
            }


            let newPlayer = new Player(randX, randY, Array((i % 2 == 0) * 255, 0, (i % 2 != 0) * 255, 255), i % 2 == 0, 25, this);
            this.players.push(newPlayer);
        }

    }

    drawGame(mouseCordX, mouseCordY){
        
        stroke(255);
        fill(255, 255, 0, 200);
        rect(this.goal[0], this.goal[1], this.goal[2] - this.goal[0], this.goal[3] - this.goal[1]);
        noFill();
        fill(255, 200);
        circle((this.goal[0] + this.goal[2]) / 2, (this.goal[1] + this.goal[3]) / 2, 40);

        noStroke();
        for(let i = 0; i < numPlayers; i++){
            this.players[i].play(mouseCordX, mouseCordY);
        }

    }
}