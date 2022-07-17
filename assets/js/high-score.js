var scoresArr = JSON.parse(localStorage.getItem("scores"));

if (!scoresArr) {
    document.getElementById("no-scores").style.display = "block";
    document.getElementById("scores-list").style.display = "none";
} else {
    for (i = 0; i < scoresArr.length; i++) {
        scoreEntry = document.createElement("li");
        scoreEntry.innerHTML = scoresArr[i];
        scoreEntry.style = "backgroud-color:grey";
        document.getElementById("scores-list").appendChild(scoreEntry);
    }
}

var handleBackSubmit = function() {
    location.replace('./index.html');
};

handleClearSubmit = function() {
    localStorage.clear("scores");
    alert("The scoreboard has been cleared.");
    document.getElementById("no-scores").style.display = "block";
    document.getElementById("scores-list").style.display = "none";
}

document.getElementById("back").addEventListener("click", handleBackSubmit);
document.getElementById("clear").addEventListener("click", handleClearSubmit);
