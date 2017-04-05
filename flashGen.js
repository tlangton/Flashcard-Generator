var inquirer = require("inquirer");
var fs = require("fs");
var construkt = require("./constructors.js");
var cardType = "";
// console.log(construkt.x);

//functions

function writeLog(data, cardType) {
	if (cardType == "Basic") {
		fs.appendFile("Basic.txt", data + "\n", function(err) {
			if (err) throw err;
		});
	} else {
		fs.appendFile("Cloze-Deleted.txt", data + "\n", function(err) {
			if (err) throw err;
		});
	}
}

//Inquirer
var questions = [
{
	type: "list",
	message: "FlashCard type?",
	choices: ["Basic", "Cloze Deletion"],
	name: "cardType"
},
{
	type: "input",
	message: "Front (question) entry: ",
	name: "front",
	when: function(answers) {
		return answers.cardType === "Basic";
	}
},
{
	type: "input",
	message: "Back (answer) entry: ",
	name: "back",
	when: function(answers) {
		return answers.cardType === "Basic";
	}
},
{
	type: "input",
	message: "Cloze deletion entry: ",
	name: "cloze",
	when: function(answers) {
		return answers.cardType === "Cloze Deletion";
	}
},
{
	type: "input",
	message: "Partial text entry: ",
	name: "partial",
	when: function(answers) {
		return answers.cardType === "Cloze Deletion";
	}
}
];

inquirer.prompt(questions).then(function(user) {
	cardType = user.cardType;
    //basic card
    if (cardType == "Basic") {
    	var back = user.back;
    	var front = user.front;
    	capture = new construkt.basic(front, back);
    	var myJSON = JSON.stringify(capture);
    	console.log(myJSON);
    	writeLog(myJSON, cardType);
    }
    //fancy card
    if (user.partial !== "") {
    	if (cardType == "Cloze Deletion") {
    		var cloze = user.cloze;
    		var partial = user.partial;
    		capture = new construkt.cloze(cloze, partial);
    		var myJSON = JSON.stringify(capture);
    		console.log(myJSON);
    		writeLog(myJSON, cardType);
    	}
    } else {
    	console.log("Partial text entry missing!");
    	return;
    }
});