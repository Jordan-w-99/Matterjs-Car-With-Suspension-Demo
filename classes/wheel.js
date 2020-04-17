class Wheel{
    constructor(x, y, r, grip, col){
        this.col = col;

        this.body = Matter.Bodies.circle(x, y, r, {friction: grip})
        Matter.World.addBody(world, this.body);
        //console.log(this.body);
    }

    draw(){
        fill(this.col);

        noStroke();
        ellipseMode(CENTER);
        circle(this.body.position.x, this.body.position.y, this.body.circleRadius*2);
        stroke(255);
        strokeWeight(2);
        line(this.body.position.x, this.body.position.y, this.body.vertices[0].x, this.body.vertices[1].y);
    }
}