

//  Bubble constructor function +++++++++++++++++++++++++++++

function Bubble(x, y, dx, dy, rad, clr){
	this.location = new JSVector(x,y);
    this.velocity = new JSVector(dx,dy);
	this.acceleration = new JSVector(0,0);
	this.rad = rad;
	this.clr = clr;
	this.isOverlapping = false;
	this.mass = 0.001;
	this.fx = 0;
	this.fy = 0;
}

  //  placing methods in the prototype (every bubble shares functions)

Bubble.prototype.run = function(){
    this.location.add(this.velocity);
	this.checkOverlapping();
	this.update();
	this.render();
	this.checkEdges();
	this.acceleration.limit(0.1);
	this.velocity.limit(1);
	
}

// check if this bubble is overlapping any other bubble
Bubble.prototype.checkOverlapping = function(){
    this.isOverlapping = false;//  default color
    this.clr =  "rgba(255,255,255,255)"
    let b = game.bubbles;
    for(let i = 0; i < b.length; i++){ // for all the bubbles
       if(this !== b[i]){   // if not this bubble
         let d = Math.sqrt((this.location.x-b[i].location.x)*(this.location.x-b[i].location.x) + (this.location.y-b[i].location.y)*(this.location.y-b[i].location.y));
         if(d < this.rad + b[i].rad){
            this.isOverlapping = true;
            this.clr =  "rgba(100,220,55,10)"
         }
       }
    }

  }

// draw the bubble on the canvas
Bubble.prototype.render = function(){
    let ctx = game.ctx;
    // color depends on whether this bubble overlaps any oher bubble
	if(!this.isOverlapping) {
		ctx.strokeStyle = "rgba(255,155,255,255)"//this.clr;
	}
	else {
		ctx.strokeStyle = "rgba(255,155,155,255)"//this.clr;
	}
    ctx.fillStyle = this.clr;
    ctx.beginPath();
    ctx.beginPath();
	ctx.arc(this.location.x, this.location.y, this.rad, 0, 2 * Math.PI);
	ctx.stroke();

  }

// Move the bubble in a random direction
Bubble.prototype.update = function(){
    //if(!game.gamePaused){
    //  this.velocity.setMagnitude(Math.random()*4-8);
    //}
	this.velocity.add(this.acceleration);
	if(this.acceleration.x > 0.2) {
			this.acceleration.x = 0.2
	}
	if(this.acceleration.y > 0.2) {
			this.acceleration.y = 0.2
	}
	if(this.velocity.x > 0.2) {
			this.velocity.x = 0.2
	}
	if(this.velocity.y > 0.2) {
			this.velocity.x = 0.2
	}
	if(this.acceleration.x < -0.2) {
			this.acceleration.x = -0.2
	}
	if(this.acceleration.y < -0.2) {
			this.acceleration.y = -0.2
	}
	if(this.velocity.x < -0.2) {
			this.velocity.x = -0.2
	}
	if(this.velocity.y < -0.2) {
			this.velocity.x = -0.2
	}
  }

// When a bubble hits an edge of the canvas, it wraps around to the opposite edge.
Bubble.prototype.checkEdges = function(){
    let canvas = game.canvas;
    if(this.location.x > canvas.width)  this.location.x = 0; // wrap around from right to left
    if(this.location.x < 0)  this.location.x = canvas.width; // wrap around from left to right
    if(this.location.y > canvas.height)  this.location.y = 0; // wrap around from bottom to top
    if(this.location.y < 0)  this.location.y = canvas.height; // wrap around from top to bottom
  }
