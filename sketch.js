let worldWidth = 40000;
let terrain, vehicle, wall;
let world, engine;
let objects = [];

function setup() {
  createCanvas(640, 480);

  engine = Matter.Engine.create();
  world = engine.world;

  terrain = new Terrain();
  vehicle = new Vehicle(200, 10, 200, 10, 30, color(0,0,0, 70)); // x, y, w, h, wSize, col

}

function draw() {
  Matter.Engine.update(engine);
  background(color(170,220,255));
  push();
  
  let mapPos = map(vehicle.parts[0].position.x, 200, worldWidth, 100, 300);
  fill(200,200,160);
  rect(100, 0, 200, 20);
  fill(0);
  circle(mapPos, 10, 10);

  //text("R Wheel angular Speed: " + vehicle.parts[1].angularSpeed,10,50);
  text("Vehicle speed: " + nf(vehicle.parts[0].speed,2,3), 10, 50);
  text("R wheel Rot speed: " + nf(vehicle.parts[1].angularSpeed,2,3), 10, 65);
  text("F wheel Rot speed: " + nf(vehicle.parts[2].angularSpeed,2,3), 10, 80);
  
  pop();

  translate(-vehicle.parts[0].position.x + width/2, -vehicle.parts[0].position.y + height/2);

  if(keyIsDown(39)){
    vehicle.parts[1].torque = 0.5;
    //console.log(vehicle.parts[0]);
    vehicle.parts[2].torque = 0.5;

  }
  if(keyIsDown(37)){
    vehicle.parts[1].torque = -0.5;
    vehicle.parts[2].torque = -0.5;

  }
  vehicle.update();


  for(let i = 0; i< objects.length; i++){
    objects[i].draw();
  }
  vehicle.draw();
  terrain.draw();
}

function mousePressed(){
  let newX = map(mouseX, 0, width, vehicle.parts[0].position.x - width/2, vehicle.parts[0].position.x + width/2);
  let newY = map(mouseY, 0, height, vehicle.parts[0].position.y - height/2, vehicle.parts[0].position.y + height/2);

  objects.push(new Wall(newX, newY, 20,20,0,color(random(255),random(255),random(255))));
}

