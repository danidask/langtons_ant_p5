// https://en.wikipedia.org/wiki/Langton%27s_ant

let canvaswidth = screen.width * 0.8;
let canvasheight = screen.height * 0.8;

let table, ants;

//DOM elements
let slnumants, slfastforward, slresolution;

function setup() {
	createCanvas(canvaswidth, canvasheight);
	slnumants = createSlider(1, 10, 1);
	slnumants.changed(numantsChanged);
	slnumants.position(screen.width * 0.1, canvasheight+20);
	slfastforward = createSlider(1, 100, 10);
	slfastforward.position(screen.width * 0.3, canvasheight+20);
	slresolution = createSlider(5, 200, 40);  // will be divided by 10
	slresolution.position(screen.width * 0.5, canvasheight+20);
	slresolution.changed(resolutionChanged);
	let resetbutton = createButton('reset');
  	resetbutton.position(screen.width * 0.7, canvasheight+20);
  	resetbutton.mousePressed(resetapp);
	resetapp();
}

function draw() {
	background(220);	
	for (let f=0; f < slfastforward.value(); f++){
		for (let i=0; i < ants.length; i++){
			ants[i].update();
		}
	}
	table.draw();
	for (let i=0; i < ants.length; i++){
		ants[i].draw();
	}
}

function resetapp(){
	ants = [];	
	table = new Table(slresolution.value()/10);
	// First one in the middle
	let posx = floor(table.columns/2);
	let posy = floor(table.rows/2);
	let ant = new Ant(posx, posy);
	ants.push(ant);
	// others at random positions
	for (let i=1; i < slnumants.value(); i++){
		posx = floor(random(table.columns));
		posy = floor(random(table.rows));
		ant = new Ant(posx, posy);
		ants.push(ant);	
	}
}

function numantsChanged(){
	let difference = slnumants.value() - ants.length;
	if (difference > 0){ // We have to add
		for(let i=0; i < difference; i++){
			let posx = floor(random(table.columns));
			let posy = floor(random(table.rows));
			let ant = new Ant(posx, posy);
			ants.push(ant);
		}

	} else if (difference < 0){ // We have to subtract
		for(let i=0; i > difference; i--){
			ants.pop();
		}
	}
}

function resolutionChanged(){
	table.changeResolution(slresolution.value()/10)
}
