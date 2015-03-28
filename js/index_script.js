// Initialize a blank object
var quizApp = {};

// =================
// QUESTION DATA SET
// =================
quizApp.questions = [
	{
		"topic": "HTML",
		"question": "Almost all tags need to be closed. For example, &#60div&#62 must be closed with &#60/div&#62. However, there are few exclusions to the rule. Which one of these tags does not need closing (self-closing)?",
		"choices": ["&#60/p&#62",
					"&#60div&#62",
					"&#60img&#62",
					"&#60button&#62"],
		"answer": 3,
		"explanation": "&#60img&#62 is one of the self-closing tags. Usually, you would write it as &#60img src=\”some_url.pic\” /&#60. See the list of self-closing tags right here.",
		"image": ""
	},
	{
		"topic": "CSS",
		"question": "The MDN defines “specificty” as “the means by which a browser decides which property values are the most relevant to an element and gets to be applied.” Looking at CSS rules below, which one gets to be applied if all of them were present?",
		"choices": ["body section {background: red;}",
					"section.header {background: red;}",
					"section#header {background: red;}",
					"section {background: red;}"],
		"answer": 3,
		"explanation": "ID selectors, \"#\" are quite specific. In most cases it trumps class selectors, \".\", and plain tag name selector such as \"section\".",
		"image": ""
	},
	{
		"topic": "jQuery",
		"question": "You've been using a lot of \"$()\" method in jQuery. A lot of JavaScript is done behind the scene for you when you use that method. What does \"$()\" method do?",
		"choices": ["Selects DOM element(s)",
					"Declares function(s)",
					"Initiates loop(s)",
					"Converts string to integer"],
		"answer": 1,
		"explanation": "\"$()\" method selects DOM element(s). It is the equivalent of document.querySelector() in vanilla JavaScript. However, the jQuery method or function works out browswer inconsitencies and legacy issues for the programmer.",
		"image": ""
	},
	{
		"topic": "JavaScript",
		"question": "Good understanding of programming concepts is also a must-have for a front-end developer. In JavaScript, every object has a prototype chain that can be traced all the way back to this.",
		"choices": ["prototype",
					"Object",
					"undefined",
					"null"],
		"answer": 4,
		"explanation": "\"null\" is the ultimate prototype of every object in JavaScript. It has no prototype of itself. JavaScript is the programming language behind a lot of popular professional framework. Familiarity with JavaScript will help you learn other popular technologies.",
		"image": ""
	},
	{
		"topic": "Git",
		"question": "Version Control is crucial in any software or web developemtn. GitHub is just one of the many tools out there that helps us manage different versions of our work. What would be the correct flow in saving your work on GitHub?",
		"choices": ["init -> pull -> merge -> add",
					"add -> commit -> push -> merge",
					"add -> pull -> push -> commit",
					"commit -> merge -> push -> add"],
		"answer": 2,
		"explanation": "After initializing both local and remote repository, you would normally \"add\" -> \"commit\" -> \"push\" to the branch that you're working on. If you're satisfied with the result, you can merge it to the master branch to publish your work.",
		"image": ""
	}
];


// =================
// VARIABLES
// =================
quizApp.totalStages = quizApp.questions.length + 1;
quizApp.currentQuestion = 0;
quizApp.totalCorrect = 0;
quizApp.userChoice = -1;
quizApp.buttonText = "Start";


// =================
// METHODS
// =================
// Attach event handlers to elements
quizApp.bindUI = function() {
	// Attach click handler on the multiple choice
	var ul = document.getElementById("choices")
	var li = ul.getElementsByTagName("li");
	for (var i = 0; i < li.length; i++) {
		li[i].addEventListener("click", selectAnswer, false);
		li[i].addEventListener("click", setUserChoice, false);
	}

	// Attach click handler for button
	var button = document.getElementById("button");
	button.addEventListener("click", processClick, false);

	// Change the appearance of selected answer's icon
	function selectAnswer(e) {
		var x = e.target.parentNode.children;
		for (var i = 0; i < x.length; i++) {
			x[i].className = "";
		}
		// Change the class name of the answer that user clicks
		e.target.className = "selected";
	}

	// Store which answer user clicks
	function setUserChoice(e) {
		console.log("setUserChoice fired")
		quizApp.userChoice = e.target.id;
		console.log(quizApp.userChoice);
	}

	// CHECKPOINT OF THE FLOW
	// Decides what to do when user clicks the blue button
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
			case "Next":
				console.log("processClick: Next");
				quizApp.hideExplanation();
				quizApp.currentQuestion++;
				quizApp.userChoice = -1;
				quizApp.buttonText = "Submit";
				quizApp.render();
				break;
			case "Start over":
				console.log("processClick: Start over");
				quizApp.currentQuestion = 1;
				quizApp.totalCorrect = 0;
				quizApp.userChoice = -1;
				quizApp.resetAnswer();
				quizApp.buttonText = "Submit";
				quizApp.updateButton(quizApp.buttonText);
				quizApp.render();
			default:
				console.log("Button clicked, but text is invalid.");
				console.log("The text is " + quizApp.buttonText);
		}
	}
};

// Decides which slide to show
quizApp.render = function() {
	// If user is at the very beginning...
	if (quizApp.currentQuestion == 0)
	{
		console.log("fall into renderStart");
		// ...show start slide
		renderStart();
		quizApp.renderButton(quizApp.buttonText);
	}
	// If user is at the very end...
	else if (quizApp.currentQuestion == quizApp.totalStages)
	{
		console.log ("falls into renderResult");
		// ...show result slide
		renderResult();
		quizApp.buttonText = "Start over";
		quizApp.updateButton(quizApp.buttonText);
		quizApp.renderButton();
	}
	// Show questions slide by default
	else
	{
		console.log("fall into renderQuestions");
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

	// Show result slide
	function renderResult() {
	 	quizApp.getScore();
	 	document.getElementById("start").className = "hidden";
	 	document.getElementById("result").className = "";
	 	document.getElementById("questions").className = "invisible";
	 }

	// Show question slide
	// Reset user's choice
	// Update current question and total question on the HTML
	function renderQuestions() {
		quizApp.loadQuestion();
		if (quizApp.currentQuestion >= 2) {
			quizApp.resetAnswer();
		}
		document.getElementById("start").className = "hidden";
		document.getElementById("result").className = "hidden";
		document.getElementById("questions").className = "";
		document.getElementById("current_question").innerHTML = quizApp.currentQuestion;
		document.getElementById("total_question").innerHTML = quizApp.questions.length;
	}
};

// Check wether or not user's answer is correct
// Tell user if it's correct or incorrect
// Show the explanation
quizApp.processInput = function() {
	console.log("processInput fired");
	console.log("userChoice is " + quizApp.userChoice);
	console.log("answer is " + quizApp.questions[quizApp.currentQuestion - 1].answer);
	if (quizApp.userChoice == quizApp.questions[quizApp.currentQuestion - 1].answer)
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
	console.log("updating button");
	document.getElementById("button_text").innerHTML = text;
};

// Set appropriate button style according to the text
quizApp.renderButton = function() {
	console.log ("rendering button");
	if (quizApp.buttonText == "Start" || quizApp.buttonText == "Start over")
	{
		document.getElementById("button_container").style.width = "100%";
		document.getElementById("button_container").className = ""; /* First time, button was invisible */
	}
	else if (quizApp.buttonText == "Submit" || quizApp.buttonText == "Next")
	{
		document.getElementById("button_container").style.width = "80%";
	}
	else
	{
		console.log("Invalid text for button.");
	}
};

// Display explanation by modifying its style
// Update the score
quizApp.renderExplanation = function() {
	console.log("rendering explanation");
	document.getElementById("explanation").style.top = "0";
	document.getElementById("feedback").className = "visible";
	document.getElementById("explanation_content").className = "visible";
	document.getElementById("current_score").innerHTML = quizApp.totalCorrect;
};

// Put explanation out of sight
quizApp.hideExplanation = function() {
	console.log("hiding explanation");
	document.getElementById("explanation").style.top = "100%";
	document.getElementById("feedback").className = "invisible";
	document.getElementById("explanation_content").className = "invisible";
}

// Reset the appearance of selected answer's icon
quizApp.resetAnswer = function() {
	console.log("resetting answers");
	var answers = document.getElementById('choices').children;
		for (var i = 0; i < answers.length; i++) {
			answers[i].className = "";
		}
};

// Load question from object to the page
quizApp.loadQuestion = function() {
	console.log("loading questions");
	var q = quizApp.questions[quizApp.currentQuestion - 1];
	document.getElementById("topic_content").innerHTML = q.topic;
	document.getElementById("question_content").innerHTML = q.question;
	document.getElementById("explanation_content").innerHTML = q.explanation;
	var c = document.getElementById('choices').children;
	for (var i = 0; i < c.length; i++) {
		c[i].innerHTML = q.choices[i];
	}
}

// Display total score at the end
// Gives out recommendation based on the score
quizApp.getScore = function() {
	document.getElementById("total_score").innerHTML = quizApp.totalCorrect;
	var ratio = quizApp.totalCorrect / quizApp.questions.length;
	var recommendation;
	if (ratio == 1)
		recommendation = "Perfect! You're definitely ready to move to the next unit.";
	else if (ratio >= 0.8)
		recommendation = "Good job. Feel free to move to the next unit.";
	else if (ratio >= 0.6)
		recommendation = "Not too bad. Try again to see if you can score higher this time.";
	else if (ratio >= 0.4)
		recommendation = "Don't worry, maybe reviewing the material one more time will help solidify things.";
	else if (ratio >= 0.2)
		recommendation = "Consider reviewing the material at least one more time.";
	else
		recommendation = "Ouch! It seems like you went over the material too fast. Do it slower this time.";
	document.getElementById("recommendation").innerHTML = recommendation;
}


$(document).ready(function() {
	quizApp.bindUI();
	quizApp.render();
});