class Vehicle{
    constructor(x, y, w, h, wSize, col){
        this.col = col;
        this.rTyreGrip = 1;
        this.fTyreGrip = 1;

        this.rStiffness = 0.1;
        this.rDamping = 0.1;
        this.rSpringHeight = 50;
        this.fStiffness = 0.1;
        this.fDamping = 0.1;
        this.fSpringHeight = 50;
        this.w = w;
        this.wSize = wSize;

        this.parts = [];
        this.suspension = [];
        
        // Bottom Layer (Frame and Suspension)

        // Frame
        this.options = {
            density: 0.01
        }

        this.parts.push(Matter.Bodies.rectangle(x, y, w, h, this.options)); // Frame
        this.parts[0].collisionFilter.group = -1;

        // Rear
        this.options = {
            friction: this.rTyreGrip,
            //restitution: 0.1,
        }
        this.parts.push(Matter.Bodies.circle(x - w/2  , y + wSize, wSize, this.options)); // Rear Wheel
        this.parts[1].collisionFilter.group = -1;

        this.options = { // Main Strut
            bodyA: this.parts[0],
            bodyB: this.parts[1],
            pointA: {
                x: - w/2,
                y: 0
            },
            stiffness: this.rStiffness,
            damping: this.rDamping,
            length: this.rSpringHeight,
        }
        this.suspension.push(Matter.Constraint.create(this.options));

        this.options = { // Support Strut
            bodyA: this.parts[0],
            bodyB: this.parts[1],
            pointA: {
                x: - w/3,
                y: h *4
            },
            length: w/5,
            stiffness: 1,
            damping: 0,
        }
        this.suspension.push(Matter.Constraint.create(this.options));


        // Front
        this.options = {
            friction: this.rTyreGrip,
            //restitution: 0.1,
        }
        this.parts.push(Matter.Bodies.circle(x + w/2, y + wSize, wSize, this.options)); // Front Wheel
        this.parts[2].collisionFilter.group = -1;

        this.options = { // Main Strut
            bodyA: this.parts[0],
            bodyB: this.parts[2],
            pointA: {
                x: w/2,
                y: 0
            },
            stiffness: this.fStiffness,
            damping: this.fDamping,
            length: this.fSpringHeight,
        }
        this.suspension.push(Matter.Constraint.create(this.options));

        this.options = { // Support Strut
            bodyA: this.parts[0],
            bodyB: this.parts[2],
            pointA: {
                x: w/3,
                y: h *4
            },
            length: w/5,
            stiffness: 1,
            damping: 0,
        }
        this.suspension.push(Matter.Constraint.create(this.options));


        console.log(this.suspension);
        console.log(this.parts);

        Matter.World.add(world, this.parts);
        Matter.World.add(world, this.suspension);
    }

    update(){
        // let activeHeight = dist(this.suspension[0].bodyA.position.x + this.suspension[0].pointA.x, this.suspension[0].bodyA.position.y + this.suspension[0].pointA.y, this.suspension[0].bodyB.position.x + this.suspension[0].pointB.x, this.suspension[0].bodyB.position.y + this.suspension[0].pointB.y);
        // this.suspension[2].length = sqrt(sq(this.w/2 - this.wSize)+sq(activeHeight));

        // activeHeight = dist(this.suspension[1].bodyA.position.x + this.suspension[1].pointA.x, this.suspension[1].bodyA.position.y + this.suspension[1].pointA.y, this.suspension[1].bodyB.position.x + this.suspension[1].pointB.x, this.suspension[1].bodyB.position.y + this.suspension[1].pointB.y);
        // this.suspension[3].length = sqrt(sq(this.w/2 - this.wSize)+sq(activeHeight));

        //this.parts[2].
    }

    draw(){
        fill(this.col);
        noStroke(); 
     

        for(let i = 0; i < this.parts.length; i++){
            beginShape();
            for(let j = 0; j < this.parts[i].vertices.length; j++){
                vertex(this.parts[i].vertices[j].x, this.parts[i].vertices[j].y);
            }

            endShape(CLOSE);

        }

        stroke(0);
        strokeWeight(2);
        line(this.parts[1].position.x, this.parts[1].position.y, this.parts[1].vertices[0].x, this.parts[1].vertices[0].y);
        line(this.parts[2].position.x, this.parts[2].position.y, this.parts[2].vertices[0].x, this.parts[2].vertices[0].y);


        stroke(255,0,0);
        strokeWeight(3);


        for(let i = 0; i < this.suspension.length; i++){
            line(this.suspension[i].bodyA.position.x + this.suspension[i].pointA.x, this.suspension[i].bodyA.position.y + this.suspension[i].pointA.y, this.suspension[i].bodyB.position.x + this.suspension[i].pointB.x, this.suspension[i].bodyB.position.y + this.suspension[i].pointB.y)
        }
    }
}