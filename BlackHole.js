

//  Bubble constructor function +++++++++++++++++++++++++++++

function BlackHole(x, y, dx, dy, rad, clr, force){
	this.location = new JSVector(x,y);
    this.velocity = new JSVector(dx,dy);
	this.acceleration = new JSVector(Math.random()*0.01,Math.random()*0.01);
	this.rad = rad;
	this.clr = "rgba(0,0,0,10)"
	this.isOverlapping = false;
	this.force = force;
	this.mass = 10000;
	this.fx = 0;
	this.fy = 0;
	
}

  //  placing methods in the prototype (every bubble shares functions)

BlackHole.prototype.run = function(){
    this.location.add(this.velocity);
	if(this.acceleration.x > 5 || this.acceleration.y > 5) {
		this.velocity.multiply(-1);
	}
	this.checkOverlapping();
	this.update();
	this.render();
	this.checkEdges();
	this.mode = 0;
	
}

// check if this bubble is overlapping any other bubble
BlackHole.prototype.checkOverlapping = function(){
    this.isOverlapping = false;//  default color
    this.clr =  "rgba(255,215,0,255)"
    let b = game.bubbles;
	intersects = 0;
    for(let i = 0; i < b.length; i++){ // for all the bubbles
       if(this !== b[i]){   // if not this bubble
			let dx = this.location.x - b[i].location.x;
			let dy = this.location.y - b[i].location.y;
			b[i].velocity.setDirection(Math.atan2(dy,dx));
			let r = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
			if (r<1) { 
				r=1;
			}
			let f = (this.mass * b[i].mass) / Math.pow(r,2);
			let fx = f * dx / r;
			let fy = f * dy / r;
			b[i].fx += fx;
			b[i].fy += fy;
			
			b[i].velocity.x += (b[i].fx / b[i].mass);
			b[i].velocity.y += (b[i].fy / b[i].mass);
			
			//this.velocity.x -= (this.fx / b[i].mass);
			//this.velocity.y -= (this.fx / b[i].mass);
			
			
			//b[i].x += b[i].velocity.x * 2;
			//b[i].y += b[i].velocity.y * 2;
			
			if (dx + dy > this.rad*2) {
					intersects++;
			}
				
       }
    }
	this.rad = intersects*0.75 + 20;
	this.mass = intersects*5 + 500;

  }

// draw the bubble on the canvas
BlackHole.prototype.render = function(){
    let ctx = game.ctx;
    // color depends on whether this bubble overlaps any oher bubble
	if(!this.isOverlapping) {
		ctx.strokeStyle = "rgba(0,0,0,10)"//this.clr;
	}
	else {
		ctx.strokeStyle = "rgba(0,0,0,10)"//this.clr;
	}
    ctx.fillStyle = "rgba(0,0,0,10)";
    ctx.beginPath();
    ctx.beginPath();
	ctx.arc(this.location.x, this.location.y, this.rad, 0, 2 * Math.PI);
	ctx.fill();
	ctx.lineWidth=5;
	ctx.stroke();

  }

// Move the bubble in a random direction
BlackHole.prototype.update = function(){
    //if(!game.gamePaused){
    //  this.velocity.setMagnitude(Math.random()*4-8);
    //}
  }

// When a bubble hits an edge of the canvas, it wraps around to the opposite edge.
BlackHole.prototype.checkEdges = function(){
    let canvas = game.canvas;
    if(this.location.x > canvas.width)  this.location.x = 0; // wrap around from right to left
    if(this.location.x < 0)  this.location.x = canvas.width; // wrap around from left to right
    if(this.location.y > canvas.height)  this.location.y = 0; // wrap around from bottom to top
    if(this.location.y < 0)  this.location.y = canvas.height; // wrap around from top to bottom
  }
