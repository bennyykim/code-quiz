//Variables
var startButton = document.querySelector('.start-button');
var timer = document.querySelector('.timer');
var gameEl = document.querySelector('.game');
var scoreEl = document.querySelector('.score');
var resultsEl = document.querySelector('.results');
var displayEl = document.querySelector('.display');
var nameInput;
var score;
var seconds;
var j = 0;

//Array of questions
var problem = [
    {
        question: ('Commonly used data types DO NOT  include:'),
        choices: ['1. strings', '2. booleans', '3. alerts', '4. numbers'],
        answer: ('3. alerts')
    },
    {
        question: ('The condition in an if / else statement is enclosed within ___.'),
        choices: ['1. quotes', '2. curly brackets', '3. parentheses', '4. square brackets'],
        answer: ('3. parentheses')
    },
    {
        question: ('Arrays in JavaScript can be used to store ___.'),
        choices: ['1. numbers and strings', '2. other arrays', '3. booleans', '4. all of the above'],
        answer: ('4. all of the above')
    },
    {
        question: ('String values must be enclosed within ___ when being assigned to variables.'),
        choices: ['1. commas', '2. curly brackets', '3. quotes', '4. parentheses'],
        answer: ('3. quotes')
    },
    {
        question: ('A very useful tool used during development and debugging for printing content to the debugger is:'),
        choices: ['1. JavaScript', '2. terminal/bash', '3. for loops', '4. console.log'],
        answer: ('2. terminal/bash')
    },
];

//Starting the quiz
function startGame() {
    j = 0;
    startButton.style.display = 'none';
    displayEl.innerHTML = '';
    display();
    seconds = 40;
    startTime();
        timer.style.display = 'block';
}

//Display the quiz
function display() {
    gameEl.innerHTML = "";
    scoreEl.innerHTML = "";
    if (j >= problem.length) {
        return;

    } else {
        var title = document.createElement('p');
        title.textContent = problem[j].question;
        gameEl.append(title);

        for (var i = 0; i < 4; i++) {
            var list = document.createElement('p');
            var button = document.createElement('button');
            button.textContent = problem[j].choices[i];
            list.append(button);
            gameEl.append(list);

        }
    }
}

//Start the timer
function startTime() {
var timerInterval = setInterval(function () {
    seconds--;
    timer.textContent = seconds;

    if (seconds <= 0 || j >= problem.length) {
        clearInterval(timerInterval);
        endGame();
    }
}, 1000);
};

//Check if the answer is correct
function checkAnswer(event) {
    console.log(event);
    if (event === problem[j].answer) {
        console.log('success');
    } else {
        console.log('fail');
        seconds -= 10;
    }
    j++;
    display();
};

//Clear the game and run the results function
function endGame() {
    console.log('donezo');
    gameEl.innerHTML = '';
    timer.style.display = 'none';
    results();
    displayScore();
};

var storage = [];
//Adding name to score
function saveName(event) {
    event.preventDefault();
    console.log(nameInput.value);
    var highscore = {
        name: nameInput.value,
        score: score
    }
    console.log(highscore);
    storage.unshift(highscore);
    localStorage.setItem('highscore', JSON.stringify(storage));
    resultsEl.innerHTML = "";
    displayScore();
    startButton.style.display = 'block';
}

//Showing the score
function displayScore() {
    console.log('hello there');
    displayEl.innerHTML = '';
    var displayScore = JSON.parse(localStorage.getItem('highscore'));
    for (var k = 0; k < displayScore.length; k++) {
        names = displayScore[k].name;
        score = displayScore[k].score;
        var scoreCard = document.createElement('p');
        scoreCard.textContent = names + score;
        displayEl.append(scoreCard);
    }
}

//Creating the html to save the score
function saveScore() {
    console.log('wassup');
    scoreEl.innerHTML = "";
    nameInput = document.createElement('input');
    nameInput.textContent = "Enter Name";
    var saveScore = document.createElement('button');
    saveScore.textContent = "Save";
    resultsEl.append(nameInput);
    resultsEl.append(saveScore);
    saveScore.addEventListener('click', saveName)
};

function clear() {
    storage = [];
    localStorage.setItem('highscore', JSON.stringify(storage));
    displayEl.innerHTML = '';
    displayScore;
};
//Creating the results
function results() {
    if (seconds < 0) {
        score = 0;
    } else {
    score = seconds;
    }
    console.log(score);
    var title = document.createElement('p');
    title.textContent = "your score is " + (score);
    scoreEl.append(title);
    var save = document.createElement('button');
    save.textContent = "Save score"
    var playAgain = document.createElement('button');
    playAgain.textContent = "play again"
    var clearScore = document.createElement('button');
    clearScore.textContent = 'clear scores'
    scoreEl.append(save);
    scoreEl.append(playAgain);
    scoreEl.append(clearScore);
    save.addEventListener('click', saveScore);
    playAgain.addEventListener('click', startGame);
    clearScore.addEventListener('click', clear);
}

//Start the game button
startButton.addEventListener('click', startGame)

//When clicking the answer on the quiz
gameEl.addEventListener('click', function (event) {
    var select = event.target;
    checkAnswer(select.textContent);
})

//Populate the local storage 
function fillStorage() {
    var a = JSON.parse(localStorage.getItem('highscore'));
    if (a != null) {
        storage = a;
    }
}

fillStorage();