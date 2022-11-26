class GoalArea{
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