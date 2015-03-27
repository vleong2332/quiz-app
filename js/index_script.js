/* Requirements:
	1. Object to store questions. (this.questions)
		a. Topic
		b. Question
		c. Choices
			  i. choice 1
			 ii. choice 2
			iii. choice 3
			 iv. choice 4
		d. Answer
		e. Explanation
		f. Image
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
		c. clicking an answer
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


// METHODS
quizApp.bindUI = function() {
	// Handle click events on the multiple choice
	var ul = document.getElementById("choices")
	var li = ul.getElementsByTagName("li");
	for (var i = 0; i < li.length; i++) {
		li[i].addEventListener("click", selectAnswer, false);
		li[i].addEventListener("click", setUserChoice, false);
	}

	function selectAnswer(e) {
		// Clear class name from every answer
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

	function setUserChoice(e) {
		// Store which answer that user clicks
		userChoice = e.target.id;
	}
};

quizApp.render = function() {
	// If user is at the very beginning...
	if (quizApp.currentQuestion == 0)
	{
		// ...show start slide
		showStart();
	}
	// If user is at the very end...
	//else if (currentQuestion == totalStages.length + 1)
	//{
		// ...show result slide
		//showResult();
	//}
	// Show questions slide by default
	//else
	//{
		//showQuestions();
	//}

	function showStart() {
		document.getElementById("start").className = "";
		document.getElementById("result").className = "hidden";
		document.getElementById("questions").className = "invisible";
	}

	// function showResult() {
	// 	document.getElementById("start").className = "hidden";
	// 	document.getElementById("result").className = "";
	// 	document.getElementById("questions").className = "invisible";
	// }

	// function showQuestions() {
	// 	document.getElementById("start").className = "hidden";
	// 	document.getElementById("result").className = "hidden";
	// 	document.getElementById("questions").className = "";
	// }
};

$(document).ready(function() {
	//quizApp.bindUI();
});