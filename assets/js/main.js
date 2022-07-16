var timeLeft = 75;
var i = 0

var questionArr = [
    {
        "question": "Commonly used data types do NOT include:",
        "A1": "1. strings",
        "A2": "2. booleans",
        "A3": "3. alerts",
        "A4": "4. numbers",
        "answer": "3. alerts"
    },
    {
        "question": "The condition in an if/else statement is enclosed with ________.",
        "A1": "1. quotes",
        "A2": "2. curly brackets",
        "A3": "3. parenthesis",
        "A4": "4. square brackets",
        "answer": "3. parenthesis"
    },
    {
        "question": "Arrays in Javascript can be used to store ________.",
        "A1": "1. numbers and strings",
        "A2": "2. other arrays",
        "A3": "3. booleans",
        "A4": "4. all of the above",
        "answer": "4. all of the above"
    },
    {
        "question": "String values must be enclosed with ________ when being assigned to variables.",
        "A1": "1. commas",
        "A2": "2. curly brackets",
        "A3": "3. quotes",
        "A4": "4. parenthesis",
        "answer": "3. quotes"
    },
    {
        "question": "A very useful tool used during development and debugging for printing content to the debugger is ________:",
        "A1": "1. Javascript",
        "A2": "2. terminal/bash",
        "A3": "3. for loops",
        "A4": "4. console.log",
        "answer": "4. console.log"
    }
];

var handleScoreSubmit = function(event) {
    event.preventDefault();

    var initials = document.querySelector("input[name='initials']").value;
    var score = timeLeft;
    if (!localStorage.getItem("scores")) {
        var scores = [];
        localStorage.setItem("scores", JSON.stringify(scores));
    }
    var scoresArr = JSON.parse(localStorage.getItem("scores"));
    scoresArr.push(`${initials} - ${score}`);
    localStorage.setItem("scores", JSON.stringify(scoresArr));
    alert("Your score has been saved!");
    location.replace('./high-score.html')     
};

var endQuiz = function(previousAnswer) {
    document.querySelector("#timer").innerHTML = "Timer: " + timeLeft;
    document.getElementById("quiz-mode").style.display = "none";
    document.getElementById("end-quiz").style.display = "block";
    document.getElementById("final-score").innerHTML = `Your final score is ${timeLeft}.`;
    document.querySelector("#initials-submit-btn").addEventListener("click", handleScoreSubmit);

    if (previousAnswer === true) {
        document.getElementById("eval-last").innerHTML = "Correct!";
    } else {
        document.getElementById("eval-last").innerHTML = "Wrong!";
    }
};

var renderQuestion = function(previousAnswer) {
    if (i < questionArr.length) {
        document.getElementById("quiz-mode").style.display = "block";
        document.getElementById("question").innerHTML = questionArr[i].question;
        document.getElementById("btn1").innerHTML = questionArr[i].A1;
        document.getElementById("btn1").addEventListener("click", handleAnswerSubmit);
        document.getElementById("btn2").innerHTML = questionArr[i].A2;
        document.getElementById("btn2").addEventListener("click", handleAnswerSubmit);
        document.getElementById("btn3").innerHTML = questionArr[i].A3;
        document.getElementById("btn3").addEventListener("click", handleAnswerSubmit);
        document.getElementById("btn4").innerHTML = questionArr[i].A4;
        document.getElementById("btn4").addEventListener("click", handleAnswerSubmit);

        if (previousAnswer === true) {
            document.getElementById("eval").innerHTML = "Correct!";
        } else if (previousAnswer === false) {
            document.getElementById("eval").innerHTML = "Wrong!";
        } else {
            document.getElementById("eval").innerHTML = "";
        }
    } else {
        endQuiz(previousAnswer);
    }
};

var handleAnswerSubmit = function(event) {
    if (event.target.innerHTML === questionArr[i].answer) {
        i++;
        renderQuestion(true);
    } else {
        timeLeft = timeLeft -10;
        i++;
        renderQuestion(false);
    }   
};

var startQuiz = function() {
    document.getElementById("home-page").style.display = "none";
    document.querySelector("#timer").innerHTML = "Timer: " + timeLeft;
    renderQuestion();
    var countdown = setInterval(function() {
        if (timeLeft === 0 || i > questionArr.length - 1) {
            clearInterval(countdown);
        } else {
            timeLeft--;
            document.querySelector("#timer").innerHTML = "Timer: " + timeLeft;
        };
    }, 1000);
};

document.querySelector("#start-btn").addEventListener("click", startQuiz);