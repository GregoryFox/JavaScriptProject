//Gregory Fox
//Globe Wanderer Javascript File
//19 February 2014

function Location(id,name,desc,pickUp,beenTo)
{
	this.id = id;
	this.name = name;
	this.desc = desc;
	this.pickUp = pickUp;
	this.beenTo = beenTo;

}

	var northAmerica = new Location(0,"North America","You have traveled to the U.S. and Canada on a mission to capture a dangerous enemy fugitive. But, you did not find him. \n\n", "nothing", false);
	var southAmerica = new Location(1,"South America","You are now in South America, you travel through Brazil and Ecuador, you find information that shows that you need to go to Scandinavia.\n\n", "nothing", false);
	var arcticCircle = new Location(2,"Arctic Circle","You are now in the Arctic Circle, you are in a barren landscape and there is nothing in sight.\n\n", "ice pickaxe", false);
	var europe = new Location(3,"Europe","You are now in Europe, you visit the MI6 headquarters in London and are granted information about the fugitive you are looking for. \n\n", "nothing", false);
	var asia = new Location(4,"Asia","You are now in Asia, you visit China, but find nothing useful there. Your mission is not making progress. \n\n", "nothing", false);
	var scandinavia = new Location(5,"Scandinavia", "You are now in Scandinavia and encounter the dangerous fugitive. He fights with you and you kill him. \n\n Congratulations you win! \n\n","nothing", false);
	var africa = new Location(6,"Africa", "You are now in Africa, you make friends with the people there and they will help you however you need. \n\n", "poison blowdart", false);
	var australia = new Location(7,"Australia", "You are now in Australia, you try to get information but no one can help you. Your mission is not making progress. \n\n", "nothing", false);
	var russia = new Location(8,"Russia", "You are now in Russian enemy territory and you are in danger. You are killed and cannot complete the mission. \n\n Game over. \n\n", "silenced ppk pistol", false);

//The nine locations in the game, each location has at least 2 possible ways to go.
	var locations = new Array();
locations[-1] = "Agent you cannot travel in this direction. Try another direction. Stay on target."
locations[0]  = northAmerica; //Main location, starting point
locations[1]  = southAmerica;
locations[2]  = arcticCircle;
locations[3]  = europe;
locations[4]  = asia;
locations[5]  = scandinavia;
locations[6]  = africa;
locations[7]  = australia;
locations[8]  = russia;


	var currentLocale = 0;
	var inventory = [];
	var score = 0;
	var pickedUp = true;



//2 dimensional matrix
var matrix = [
	                //0  1  2  3
/*North America    */[2, 1, 3, 4],
/*South America    */[0,-1, 6, 7],
/*Arctic Circle    */[-1,0, 5, 8],
/*Europe           */[5, 6,-1, 0],
/*Asia             */[8, 7, 0,-1], 
/*Scandinavia      */[-1,3,-1, 2], 
/*Africa           */[3,-1,-1, 1], 
/*Russia           */[-1,4, 2,-1]
];



function display(){
		document.getElementById("output").value = locations[currentLocale].desc + " " +
		"Location: " + locations[currentLocale].name + " " +
		"Score: " + score + " " + "Inventory: " + inventory;
		
}


function move(cl){
	var moveDir = document.getElementById("textInput").value;

	if (moveDir === "n" || "N" || "north" || "North"){
	
		var newLocation = matrix[cl][0];
		var loc = 0;
		
	} else if (moveDir === "s" || "S" || "south" || "South"){
		
		var newLocation = matrix[cl][1];
		var loc = 1;
		
	} else if (moveDir === "e" || "E" || "east" || "East"){
	
		var newLocation = matrix[cl][2];
		var loc = 2;
		
	} else if (moveDir === "w" || "W" || "west" || "West"){
		
		var newLocation = matrix[cl][3];
		var loc = 3;
		
	}
	
	if (newLocation >= 0){
		
		currentLocale = newLocation;
		display();
	}
	
	else {
		
		document.getElementById("display").value = "Agent you cannot travel in this direction. Try another direction. Stay on target.";
	}


	if (locations[currentLocale].beenTo === false){
		locations[currentLocale].beenTo = true;
		score = score + 5;

		display();
	}
}

function movement(cl,dir)
{
	var newLocation = matrix[cl][dir];
	
		if (newLocation >= 0) {
		currentLocale = newLocation;
		document.getElementById("alert").value = " ";
		display();
		
		}
		
		else if (newLocation === -1) {
			
			document.getElementById("alert").value = "Agent you cannot travel in this direction. Try another direction. Stay on target.";
			display();
		}

		if (locations[currentLocale].beenTo === false)
		{
			locations[currentLocale].beenTo = true;
			score = score + 5;
			display();
		}
}

function pickingUp(){

	if (locations[currentLocale] === arcticCircle){
		
		inventory.push(locations[currentLocale].pickUp);
		document.getElementById("alert").value = "You picked up the ice pickaxe.";
		display();
	}	
	
	if (locations[currentLocale] === africa){
		
		inventory.push(locations[currentLocale].pickUp);
		document.getElementById("alert").value = "You picked up the poison blowdart.";
		display();
	}
	
	if (locations(currentLocale) === scandinavia && inventory.indexOf("ice pickaxe") === -1){
		
			document.getElementById("alert").value = "You could not kill the fugitive. He got away.";

			currentLocale = 0;
		
			display();
		}
		
	if (locations(currentLocale) === scandinavia && inventory.indexOf("poison dart") === -1){
		
			document.getElementById("alert").value = "You could not kill the fugitive. He got away.";

			currentLocale = 0;
		
			display();
		}
		
			else if(locations(currentLocale) === scandinavia) {
			
				document.getElementById("alert").value = "You killed the fugitive and completed your mission!";
				pickedUp = false;
				
		}
		
}				
				
function help(){

	document.getElementById("alert").value = "Globe Wanderer may be tough, but just try another directional command. At least two directions should work unless you are killed. (If you are killed refresh the page.) \n";
	
}