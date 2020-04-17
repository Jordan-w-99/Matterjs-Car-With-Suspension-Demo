class Terrain{
    constructor(){
        this.body = Matter.Bodies.rectangle(worldWidth/2, height - 40, worldWidth, 80, {restitution: 0.1, friction: 1, staticFriction: 1,isStatic: true});
        
        Matter.World.addBody(world, this.body);
        
        this.terrain = [];
        this.terrain.push(Matter.Bodies.trapezoid(600, height - 75, 100, 20, 0.5, {isStatic: true}));
        Matter.World.add(world, this.terrain);

        this.col = color(0,0,0);

        console.log(this.terrain);
    }

    draw(){
        fill(this.col);
        noStroke();

        beginShape();
        for(let i=0; i<this.body.vertices.length;i++){
            vertex(this.body.vertices[i].x, this.body.vertices[i].y);
        }
        endShape(CLOSE);

        beginShape();
        for(let i=0; i<this.terrain.length;i++){
            for(let j = 0; j< this.terrain[i].vertices.length; j++){

                vertex(this.terrain[i].vertices[j].x, this.terrain[i].vertices[j].y);
            }
        }
        endShape(CLOSE);

    }
}