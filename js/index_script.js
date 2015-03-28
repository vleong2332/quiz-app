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
		"question": "Almost all tags need to be closed. For example, &#60div&#62 must be closed with &#60/div&#62. However, there are few exclusions to the rule. Which one of these tags does not need closing (self-closing)?",
		"choices": ["&#60/p&#62",
					"&#60div&#62",
					"&#60img&#62",
					"&#60button&#62"],
		"answer": 2,
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
quizApp.totalStages = quizApp.questions.length + 1;
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
		var x = e.target.parentNode.children;
		for (var i = 0; i < x.length; i++) {
			x[i].className = "";
		}
		// Change the class name of the answer that user clicks
		e.target.className = "selected";
	}

	// Store which answer that user clicks
	function setUserChoice(e) {
		console.log("setUserChoice fired")
		quizApp.userChoice = e.target.id;
		console.log(quizApp.userChoice);
	}

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
	function renderQuestions() {
		quizApp.loadQuestion();
		if (quizApp.currentQuestion >= 2) {
			quizApp.resetAnswer();
		}
		document.getElementById("start").className = "hidden";
		document.getElementById("result").className = "hidden";
		document.getElementById("questions").className = "";
	}
};

// Check wether or not user's answer is correct
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

// Display appropriate button style according to the text
quizApp.renderButton = function() {
	console.log ("rendering button");
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
	console.log("rendering explanation");
	document.getElementById("explanation").style.top = "0";
	document.getElementById("feedback").className = "";
	document.getElementById("explanation_content").className = "";
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

quizApp.getScore = function() {
	// Compute the final score
	document.getElementById("total_score").innerHTML = quizApp.totalCorrect;
	// NEXT: Print recommendation based on score
}


$(document).ready(function() {
	quizApp.bindUI();
	quizApp.render();
});