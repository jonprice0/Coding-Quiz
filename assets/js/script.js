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

var endQuiz = function(previousAnswer) {
    if (timeLeft > localStorage.getItem("highscore")) {
        localStorage.setItem("highscore", timeLeft)
    };
    
    document.getElementById("end-quiz").style.display = "block";
    document.getElementById("final-score").innerHTML = `Your final score is ${timeLeft}.`;

    if (previousAnswer === true) {
        document.getElementById("eval-last").innerHTML = "Correct!";
    } else {
        document.getElementById("eval-last").innerHTML = "Wrong!";
    }

    const clearResponseLast = function() {
        document.getElementById("eval-last").innerHTML = "";
    }
    const responseTimeout = setTimeout(clearResponseLast, 1500);
    responseTimeout();
};

var countdown = function() {
    setInterval(function() {
        if (timeLeft > 0 && i < questionArr.length) {
            timeLeft--;
            document.querySelector("#timer").innerHTML = "Timer: " + timeLeft;
        } else {
            clearInterval(countdown);
        }
    }, 1000);
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

        const clearResponseLast = function() {
            document.getElementById("eval").innerHTML = "";
        }
        const responseTimeout = setTimeout(clearResponseLast, 1500);
        responseTimeout();

    } else {
        document.getElementById("quiz-mode").style.display = "none";
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
    document.querySelector("#timer").innerHTML = "Timer: 75";
    countdown();
    renderQuestion();
};
//         const clearResponse = function() {
//             document.querySelector("#eval").innerHTML = "";
//         }
//         const responseTimeout = setTimeout(clearResponse, 2000);
//         responseTimeout();
document.querySelector("#start-btn").addEventListener("click", startQuiz);