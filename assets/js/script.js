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

var renderFirstQuestion = function() {
    document.querySelector("h1").innerHTML = questionArr[i].question;
    
    var btn1 = document.createElement("button"); 
    btn1.innerHTML = questionArr[i].A1;
    btn1.className="choices";
    btn1.id="btn1";            
    document.body.appendChild(btn1);
    
    var btn2 = document.createElement("button"); 
    btn2.innerHTML = questionArr[i].A2;  
    btn2.className="choices"; 
    btn2.id="btn2";              
    document.body.appendChild(btn2);
    
    var btn3 = document.createElement("button"); 
    btn3.innerHTML = questionArr[i].A3;  
    btn3.className="choices"; 
    btn3.id="btn3";              
    document.body.appendChild(btn3);
    
    var btn4 = document.createElement("button"); 
    btn4.innerHTML = questionArr[i].A4; 
    btn4.className="choices";
    btn4.id="btn4";                
    document.body.appendChild(btn4);

    var evaluation = document.createElement("p");
    document.body.appendChild(evaluation);
    evaluation.id="eval";
};

var renderNextQuestion = function(previousAnswer) {
    if (i < questionArr.length) {
        document.querySelector("h1").innerHTML = questionArr[i].question;
        document.querySelector("#btn1").innerHTML = questionArr[i].A1;
        document.querySelector("#btn2").innerHTML = questionArr[i].A2;
        document.querySelector("#btn3").innerHTML = questionArr[i].A3;
        document.querySelector("#btn4").innerHTML = questionArr[i].A4;

        if (previousAnswer === true) {
            document.querySelector("#eval").innerHTML = "Correct!";
        } else {
            document.querySelector("#eval").innerHTML = "Wrong!";
        }
    } else {
        endQuiz(previousAnswer);
    }
};
var evaluateAnswer = function(event) {
    if (event.target.textContent === questionArr[i].answer) {
        i++;
        renderNextQuestion(true);
    } else {
        timeLeft = timeLeft - 10;
        i++;
        renderNextQuestion(false);
    }   
};

var quizMode = function() {
    document.querySelector("p").remove();
    document.querySelector("#start-btn").remove(); 
    renderFirstQuestion();
    document.querySelector("#btn1").addEventListener("click", evaluateAnswer);
    document.querySelector("#btn2").addEventListener("click", evaluateAnswer);
    document.querySelector("#btn3").addEventListener("click", evaluateAnswer);
    document.querySelector("#btn4").addEventListener("click", evaluateAnswer);
var countdown = setInterval(function() {
        if (timeLeft > 0 && i < questionArr.length) {
            document.querySelector("#timer").innerHTML = "Timer: " + timeLeft;
            timeLeft--;
        } else {
            clearInterval(countdown);
            endQuiz();
        }
    }, 1000);
};

document.querySelector("#start-btn").addEventListener("click", quizMode);