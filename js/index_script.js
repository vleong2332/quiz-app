/* Requirements:
	1. Object to store questions. (this.questions)
	2. Array as long as number of questions (this.totalQuestions)
	3. Variable to store the number of correct answer (this.totalCorrect)
	4. Function to change the button appearance & text based on where the user is
	5. Function to display the appropriate view
	6. Function to check the answer
	7. Function to decide the feedback
	8. Function to change the question
	9. Function to roll up the explanation
	10. Function that binds event handlers
		a. button click to next
		b. button click to submit
		c. clicking an answer (check)
*/

// Initialize a blank object
var quizApp = {};

// QUESTION DATA SET
quizApp.questions = [
	{
		"topic": "HTML",
		"question": "Almost all tags need to be closed. For example, <div> must be closed with </div>. However, there are few exclusions to the rule. Which one of these tags does not need closing (self-closing)?",
		"choices": ["</p>",
					"<div>",
					"<img>",
					"<button>"],
		"answer": 2,
		"explanation": "<img> is one of the self-closing tags. Usually, you would write it as <img src=\”some_url.pic\” />. See the list of self-closing tags right here.",
		"image": ""
	},
	{
		"topic": "CSS",
		"question": "The MDN defines “specificty” as “the means by which a browser decides which property values are the most relevant to an element and gets to be applied.” Looking at CSS rules below, which one gets to be applied if all of them were present?",
		"choices": ["body section {background: red;}",
					"section.header {background: red;}",
					"section#header {background: red;}",
					"section {background: red;}"],
		"answer": 2,
		"explanation": "ID selectors, \"#\" are quite specific. In most cases it trumps class selectors, \".\", and plain tag name selector such as \"section\".",
		"image": ""
	},
	{
		"topic": "jQuery",
		"question": "Question about jQuery",
		"choices": ["choice 1",
					"choice 2",
					"choice 3",
					"choice 4"],
		"answer": 2,
		"explanation": "Explaining the answer for jQuery",
		"image": ""
	},
	{
		"topic": "JavaScript",
		"question": "Question about JavaScript",
		"choices": ["choice 1",
					"choice 2",
					"choice 3",
					"choice 4"],
		"answer": 2,
		"explanation": "Explaining the answer for JavaScript",
		"image": ""
	},
	{
		"topic": "Git",
		"question": "Question about Git",
		"choices": ["choice 1",
					"choice 2",
					"choice 3",
					"choice 4"],
		"answer": 2,
		"explanation": "Explaining the answer for Git",
		"image": ""
	}
];


// VARIABLES
quizApp.totalStages = quizApp.questions.length + 2;
quizApp.currentQuestion = 0;
quizApp.totalCorrect = 0;
quizApp.userChoice = -1;
quizApp.buttonText = "Start";


// METHODS
quizApp.bindUI = function() {
	// Handle click events on the multiple choice
	var ul = document.getElementById("choices")
	var li = ul.getElementsByTagName("li");
	for (var i = 0; i < li.length; i++) {
		li[i].addEventListener("click", selectAnswer, false);
		li[i].addEventListener("click", setUserChoice, false);
	}

	// Handle click events for button
	var button = document.getElementById("button");
	button.addEventListener("click", processClick, false);

	// Change the appearance of selected answer's icon
	function selectAnswer(e) {
		var x = e.target.parentNode.childNodes;
		for (var i = 0; i < x.length; i++) {
			if (x[i].nodeName == "LI")
			{ 
				x[i].className = "";
			}
		}
		// Change the class name of the answer that user clicks
		e.target.className = "selected";
	}

	// Store which answer that user clicks
	function setUserChoice(e) {
		userChoice = e.target.id;
	}

	function processClick() {
		console.log("processClick fired");
		switch(quizApp.buttonText) {
			case "Start":
				console.log("processClick: Start");
				quizApp.currentQuestion++;
				quizApp.buttonText = "Submit";
				quizApp.render();
				break;
			case "Submit":
				console.log("processClick: Submit");
				quizApp.processInput();
				quizApp.buttonText = "Next";
				quizApp.updateButton(quizApp.buttonText);
				break;
			default:
				console.log("Button clicked, but text is invalid.");
				console.log(quizApp.buttonText);
		}
	}
};

// Decides which slide to show
quizApp.render = function() {
	// If user is at the very beginning...
	if (quizApp.currentQuestion == 0)
	{
		// ...show start slide
		renderStart();
		quizApp.renderButton(quizApp.buttonText);
	}
	// If user is at the very end...
	//else if (currentQuestion == totalStages.length + 1)
	//{
		// ...show result slide
		//showResult();
	//}
	// Show questions slide by default
	else
	{
		renderQuestions();
		quizApp.updateButton(quizApp.buttonText);
		quizApp.renderButton();
	}

	// Show intro/starting slide
	function renderStart() {
		document.getElementById("start").className = "";
		document.getElementById("result").className = "hidden";
		document.getElementById("questions").className = "invisible";
	}

	 function renderResult() {
	 	document.getElementById("start").className = "hidden";
	 	document.getElementById("result").className = "";
	 	document.getElementById("questions").className = "invisible";
	 }

	// Show question slide
	function renderQuestions() {
		document.getElementById("start").className = "hidden";
		document.getElementById("result").className = "hidden";
		document.getElementById("questions").className = "";
	}
};

// Check wether or not user's answer is correct
quizApp.processInput = function() {
	console.log("processInput fired");
	console.log("userChoice is " + quizApp.userChoice);
	console.log("answer is " + quizApp.questions[quizApp.currentQuestion].answer);
	if (quizApp.userChoice == quizApp.questions[quizApp.currentQuestion].answer)
	{
		console.log("processInput true");
		quizApp.totalCorrect++;
		document.getElementById("feedback").innerHTML = "Correct!";
	}
	else
	{
		console.log("processInput false");
		document.getElementById("feedback").innerHTML = "Incorrect";
	}
	quizApp.renderExplanation();
}

// Update the text inside the blue button
quizApp.updateButton = function(text) {
	document.getElementById("button_text").innerHTML = text;
};

// Display appropriate button style according to the text
quizApp.renderButton = function() {
	switch (quizApp.buttonText) {
		case "Start":
			document.getElementById("button_container").style.width = "100%";
			document.getElementById("button_container").className = ""; /* First time, button was invisible */
			break;
		case "Submit":
			document.getElementById("button_container").style.width = "80%";
			break;
		case "Next":
			document.getElementById("button_text").innerHTML = text;
			break;
		case "Start over":
			document.getElementById("button_container").style.width = "100%";
			document.getElementById("button_container").className = "";
			break;
		default:
			console.log("Invalid text for button.");
	}
};

// Display explanation by modifying its style
quizApp.renderExplanation = function() {
	var top = document.getElementById("explanation").style.top;
	console.log("renderExplanation fired");
	console.log(top);
	if (top == 0)
	{

	}
	else
	{
		document.getElementById("explanation").style.top = "0";
		document.getElementById("feedback").className = "";
		document.getElementById("explanation_p").className = "";
	}
};




$(document).ready(function() {
	quizApp.bindUI();
	quizApp.render();
});