class Ant {
  constructor(initx, inity) {
	this.x = initx;
	this.y = inity;
	this.dir = floor(random(4));
  }

  draw(){
  	noStroke();
  	fill('red');
	rect(this.x * table.resolution, this.y * table.resolution, table.resolution, table.resolution);
  }

  update(){
  	// Langton's_ant rules
	if (table.squareState(this.x, this.y)) { // the ant is in a black square
		this.turnleft();
	} else {  // the ant is in a white square
		this.turnright();
	}
	// in any case:
	table.flipSquareState(this.x, this.y); // flip the color of the current square
	this.forward(); // move forward one unit
	this.checkboundaries();
  }

  turnright(){
  	// 0 up / 1 right / 2 down / 3 left
	this.dir++;
	if (this.dir > 3)
		this.dir = 0;
  }

  turnleft(){
  	// 0 up / 1 right / 2 down / 3 left
	this.dir--;
	if (this.dir < 0)
		this.dir = 3;
  }

  forward(){
  	switch (this.dir){
		case 0: // up
			this.y--;
			break;
		case 1: // right
			this.x++;
			break;
		case 2: // down
			this.y++;
			break;
		case 3: // left
			this.x--;
			break;
		default:
			console.log("ERROR - dir: " + this.dir);
			break;
	}
  }

  checkboundaries(){
  	if (this.x >= table.columns)
		this.x = 0;
	else if (this.x < 0)
		this.x = table.columns - 1;
	if (this.y >= table.rows)
		this.y = 0;
	else if (this.y < 0)
		this.y = table.rows - 1;
  }
}
