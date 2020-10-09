

//  Bubble constructor function +++++++++++++++++++++++++++++

function BubbleAttractive(x, y, dx, dy, rad, clr, force){
	this.location = new JSVector(x,y);
    this.velocity = new JSVector(dx,dy);
	this.acceleration = new JSVector(Math.random()*0.01,Math.random()*0.01);
	this.rad = rad;
	this.clr = clr;
	this.isOverlapping = false;
	this.force = force;
}

  //  placing methods in the prototype (every bubble shares functions)

BubbleAttractive.prototype.run = function(){
    this.location.add(this.velocity);
	if(this.acceleration.x > 5 || this.acceleration.y > 5) {
		this.velocity.multiply(-1);
	}
	this.checkOverlapping();
	this.update();
	this.render();
	this.checkEdges();
	
}

// check if this bubble is overlapping any other bubble
BubbleAttractive.prototype.checkOverlapping = function(){
    this.isOverlapping = false;//  default color
    this.clr =  "rgba(255,215,0,255)"
    let b = game.bubbles;
    for(let i = 0; i < b.length; i++){ // for all the bubbles
       if(this !== b[i]){   // if not this bubble
         let d = Math.sqrt((this.location.x-b[i].location.x)*(this.location.x-b[i].location.x) + (this.location.y-b[i].location.y)*(this.location.y-b[i].location.y));
         if(d < this.rad + b[i].rad + this.force){
            let x = this.location.x-b[i].location.x
			let y = this.location.y-b[i].location.y
			b[i].velocity.setDirection(Math.atan2(y,x));
			//b[i].acceleration.sub(this.acceleration);
			//b[i].acceleration.normalize();
			//b[i].acceleration.multiply(0.03);
			this.attract = JSVector.subGetNew(b[i].location,this.location);
			this.attract.normalize();
			this.attract.multiply(0.05);
			b[i].velocity.add(this.attract);
         }
       }
    }

  }

// draw the bubble on the canvas
BubbleAttractive.prototype.render = function(){
    let ctx = game.ctx;
    // color depends on whether this bubble overlaps any oher bubble
	if(!this.isOverlapping) {
		ctx.strokeStyle = "rgba(255,215,0,10)"//this.clr;
	}
	else {
		ctx.strokeStyle = "rgba(255,215,0,10)"//this.clr;
	}
    ctx.fillStyle = this.clr;
    ctx.beginPath();
    ctx.beginPath();
	ctx.arc(this.location.x, this.location.y, this.rad, 0, 2 * Math.PI);
	ctx.stroke();

  }

// Move the bubble in a random direction
BubbleAttractive.prototype.update = function(){
    //if(!game.gamePaused){
    //  this.velocity.setMagnitude(Math.random()*4-8);
    //}
  }

// When a bubble hits an edge of the canvas, it wraps around to the opposite edge.
BubbleAttractive.prototype.checkEdges = function(){
    let canvas = game.canvas;
    if(this.location.x > canvas.width)  this.location.x = 0; // wrap around from right to left
    if(this.location.x < 0)  this.location.x = canvas.width; // wrap around from left to right
    if(this.location.y > canvas.height)  this.location.y = 0; // wrap around from bottom to top
    if(this.location.y < 0)  this.location.y = canvas.height; // wrap around from top to bottom
  }
