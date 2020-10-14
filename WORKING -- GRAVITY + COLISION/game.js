function Game(){

    this.gamePaused = false;    // the game may be paused or not
    this.ga = new GameArea();   // create all the dom elements
    // get the canvas as a property of the game
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas
    this.canvas = document.getElementById('canvas');
    // get the context
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    this.ctx = this.canvas.getContext('2d'); // This is the context

    //   create the array of bubble objects
    this.bubbles = [];
    let numBubbles = 21;
    for(var i = 0; i < numBubbles; i++){
        var x, y, dx, dy, diam, clr, r, g, b;
        x = Math.random()*this.canvas.width;
        y = Math.random()*this.canvas.height;
        dx = 0;
        dy = 0;
        diam = Math.random()*20;
        r = 255;
        g = 255;
        b = 255;
        clr = "rgba(" + r + ", "+ g + ","+ b +")"
        this.bubbles.push(new Bubble(x, y, dx, dy, diam, clr)); // add new bubble to array
		this.bubbles.push(new Triangle(x+80, y+80, dx, dy, diam, clr)); // add new bubble to array
    }



    //  Add event handlers to all tile objects
    for(let i = 0; i < this.ga.tiles.length; i++){
        this.ga.tiles[i].addEventListener('mouseover', // mouseover is the name of an event
                                        function(){//  JavaScript has anonymous functions
                                          //  'this' is the listener target object: tile
                                          //  'this' does not refer to the game object
                                          this.style.backgroundColor = "#ac8fe3"
                                        },
                                        false);
        this.ga.tiles[i].addEventListener('mouseout', function(){
            this.style.backgroundColor = "#d5dee0"
          },false);
        this.ga.tiles[i].addEventListener('click', function(){
            game.gamePaused = !game.gamePaused;
            console.log("Mouse Clicked");
          },false);
    }

}//++++++++++++++++++++++  end Bubbles constructor

// function to run the game each animation cycle
Game.prototype.run = function(){
  if(!this.gamePaused){
	
    for(let i = 0; i < this.bubbles.length; i++){
		for(let j = 0; j < this.bubbles.length; j++) {
			let forces = new JSVector(0,0);
			if(i!=j) {
				force = this.bubbles[j].gravity(this.bubbles[i])
				//force.multiply(-1);
				this.bubbles[i].applyForce(force);
				
				//this.bubbles[j].applyForce(force);
			}
		}
		    // run each bubble
		
		
		
	  }
   }
   for(let i=0; i <this.bubbles.length;i++) {
		if (this.bubbles[i]!= null) {
			this.bubbles[i].run();
   }
   
  }
}


