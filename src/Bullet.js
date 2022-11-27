class Bullet{

    constructor(xCord, yCord, radius, angle){

        this.x = xCord;
        this.y = yCord;
        this.r = radius;
        this.a = angle;

        this.canShoot = true;

    }

    play(){

        if(this.touchesBoundaries()){
            this.canShoot = false;
        }
        else{

            let d = 20;
            let x1 = this.x + Math.cos(this.a * Math.PI / 180) * d;
            let y1 = this.y - Math.sin(this.a * Math.PI / 180) * d;
            
            this.x = x1;
            this.y = y1;

        }

    }

    touchesBoundaries(){

        return (this.x < 0 || this.x > gameX || this.y < 0 || this.y > gameY);

    }

    touchesParticle(xCord, yCord, radius){

        let xDiff = Math.abs(this.x - xCord);
        let yDiff = Math.abs(this.y - yCord);
        let hDiff = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

        console.log("Difference: ", hDiff, this.r, radius);

        if(hDiff <= this.r + radius){
            return true;
        }
        else{
            return false;
        }

    }

    drawObject(){

        stroke(255);
        fill(0, 255, 0, 255);
        circle(this.x, this.y, this.r * 2);

    }

}