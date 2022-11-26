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
                let newGoalArea = new GoalArea(newGoalCord, Array(255, 255, 0, 200), shape, restriction);
                this.goalAreas.push(newGoalArea);
            }

            else if(shape == "circle"){
                let newGoalCord = [
                    this.goalCords[i][0], this.goalCords[i][1], this.goalCords[i][2]
                ];
                let newGoalArea = new GoalArea(newGoalCord, Array(255, 255, 0, 200), shape, restriction);
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