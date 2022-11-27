class Cannon{

    constructor(xCord, yCord, angle, freq, directable){

        this.x = xCord;
        this.y = yCord;
        this.angle = angle;

        this.freq = freq;

        this.directable = directable;

        this.bullets = [];

    }

    play(xCord, yCord){

        if(!this.directable){

            for(let i = 0; i < this.bullets.length; i++){
                if(this.bullets[i].canShoot)
                    this.bullets[i].play();
            }

        }
        else{

            let xDiff = xCord - this.x;
            let yDiff = yCord - this.y;

            let tanValue = -yDiff / xDiff;
            let angle = Math.atan(tanValue);

            this.angle = angle * 180 / Math.PI;

            for(let i = 0; i < this.bullets.length; i++){
                if(this.bullets[i].canShoot){
                    this.bullets[i].a = this.angle;
                    this.bullets[i].play();
                }
            }
        }

        if(frameCount % this.freq == 0){
            let newBullet = new Bullet(this.x, this.y, 10, this.angle);
            this.bullets.push(newBullet);
        }

    }

    drawObject(){

        let length = 200;
        let x1 = this.x - length * Math.cos(this.angle * Math.PI / 180);
        let y1 = this.y + length * Math.sin(this.angle * Math.PI / 180);

        stroke(255);
        strokeWeight(20);
        line(this.x, this.y, x1, y1);
        strokeWeight(1);
        
        let newBullets = [];

        for(let i = 0; i < this.bullets.length; i++){
            if(this.bullets[i].canShoot){
                this.bullets[i].drawObject();
                newBullets.push(this.bullets[i]);
            }
        }
        this.bullets = newBullets;
    }

    handleTouches(xCord, yCord, radius){
        for(let i = 0; i < this.bullets.length; i++){
            let bulletTouches = this.bullets[i].touchesBall(xCord, yCord, radius);
            if(bulletTouches){
                return true;
            }
        }
        return false;
    }

}