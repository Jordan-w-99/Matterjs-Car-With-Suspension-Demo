class Wall{
    constructor(x, y, w, h, rot, col){
        this.col = col;
        this.body = Matter.Bodies.rectangle(x, y, w, h, {angle: rot, friction: 0.6});
        Matter.World.addBody(world, this.body);
    }

    draw(){
        fill(this.col);
        noStroke();
       
        beginShape();
        for(let j = 0; j < this.body.vertices.length; j++){
            vertex(this.body.vertices[j].x, this.body.vertices[j].y);
        }

        endShape(CLOSE);
    }
}