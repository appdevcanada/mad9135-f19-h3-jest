let Robot = function() {
	this.x = 0;
	this.y = 0;
	this.cardinals = ["NORTH", "EAST", "SOUTH", "WEST"];
	this.facing = 0;
	this.ready = false;
	this.drawGridAfterEachCommand = false;
	this.showEachCommand = false;
}

Robot.prototype.do = function(command) {
	command = command.toUpperCase();
	if (!this.ready && command.substring(0,5) !== "PLACE") return;
    let result;

	switch(command.substr(0, command.indexOf(" ") > -1 ? command.indexOf(" ") : undefined)) {
		case "PLACE": 
			let pos = command.substr(6);
			result = this.place(pos);
			break;
		case "REPORT": 
			result = this.report();
			break;
		case "RIGHT":
			result = this.turn(1);
			break;
		case "LEFT":
			result = this.turn(-1);
			break;
		case "MOVE":
			result = this.move();
			break;
	}

	if (this.showEachCommand) console.log(command);
	if (this.drawGridAfterEachCommand) this.drawGrid();
    return result;
}

Robot.prototype.report = function() {
    var report = "";
    report += this.x;
    report += "," + this.y;
    report += "," + this.cardinals[this.facing];

    //console.log(report);
    return {action: 'REPORT', x: parseInt(this.x), y: parseInt(this.y), facing: this.cardinals[this.facing] };
}

Robot.prototype.drawGrid = function() {
	for (let i = 4; i >= 0; i--) {
		var line = "";
		for(let j = 0; j < 5; j++) {
			if (i == this.y && j == this.x) line += ["^", ">", ",", "<"][this.facing];
			else line += "o";
		}
		console.log(line);
	}
	console.log("\n");
    return {action:'GRID DRAWN'};
}

Robot.prototype.turn = function(direction) {
	if (direction > 0) {
		this.facing++;
		if (this.facing > 3) this.facing = 0;	
	}
	if (direction < 0) {
		this.facing--;
		if (this.facing < 0) this.facing = 3;
	}
    return {action: 'TURN', facing: this.cardinals[this.facing]};
}

Robot.prototype.move = function() {
	if (this.facing == this.cardinals.indexOf("NORTH")) this.y++;
	if (this.facing == this.cardinals.indexOf("EAST")) this.x++;
	if (this.facing == this.cardinals.indexOf("SOUTH")) this.y--;
	if (this.facing == this.cardinals.indexOf("WEST")) this.x--;

	if (this.x > 4) this.x = 4;
	if (this.x < 0) this.x = 0;
	if (this.y > 4) this.y = 4;
	if (this.y < 0) this.y = 0;
    return {action:'MOVE', x:this.x, y:this.y, facing: this.cardinals[this.facing]};
}

Robot.prototype.place = function(pos) {
	pos = pos.split(",");
	if (pos[0] > 4 || pos[1] > 4 || pos[0] < 0 || pos[1] < 0) return;
	if (this.cardinals.indexOf(pos[2]) == -1) return;
	this.x = pos[0];
	this.y = pos[1];
	this.facing = this.cardinals.indexOf(pos[2]);
	this.ready = true;
    let obj = {action:'PLACE', x:this.x, y:this.y, facing: this.cardinals[this.facing]};
    return obj;
}

var robot = new Robot();
module.exports = {robot};
