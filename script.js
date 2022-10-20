/*
    Anthony Tobias
    HW4
    CPSC 332
    This is my js file for the flashcard assignment
*/

// declare constants
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const backButton = document.getElementById('back-btn');
const restartButton = document.getElementById('restart-btn');
const flashcardElement = document.getElementById('flashcard');

// declare variables
let questionList, currentQuestionIndex;
let hour = 00;
let minute = 00;
let second = 00;
let count = 00;
    


// add event listeners and their functions on click
startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})

backButton.addEventListener('click', () => {
    currentQuestionIndex--;
    setPreviousQuestion();
});

restartButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    setNextQuestion();
    restartButton.classList.add('hide');
    resetWatch();
});


function startGame(){
    console.log('Started');
    startButton.classList.add('hide');
    checkRandom();
    checkTimedSession();
    removeOptions();
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    removeFlashCard();
    setNextQuestion();
}

// Function that checks form to see if they user selected random
function checkRandom(){
    let shuffleCards = document.querySelector("#shuffle");
    if (shuffleCards.checked){
        questionList = questions.sort(() => Math.random() - .5);
        console.log("Randomized");
    }
    else{
        questionList = questions;
        console.log("Not randomized");
    }
}

function checkTimedSession(){
    let timed = document.querySelector("#timed");
    if(timed.checked){
        createStopWatch();
        stopWatch();
        console.log("timed session")
    }

}

function setNextQuestion(){
    resetState()
    showQuestion(questionList[currentQuestionIndex])
}

function setPreviousQuestion(){
    resetState()
    showQuestion(questionList[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    });
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    backButton.classList.add('hide')
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
    removeFlashCard()
}

function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (questionList.length > currentQuestionIndex + 1 & currentQuestionIndex != 0){
        nextButton.classList.remove('hide');
        backButton.classList.remove('hide')
    }
    else if (questionList.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    }
    else{
        restartButton.classList.remove('hide')
    }
    
    createFlashCard()
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct){
        element.classList.add('correct')
    }
    else{
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function removeFlashCard(){
    if (document.getElementById("flashcard") != null){
        document.getElementById("flashcard").remove();
    }
}

function createFlashCard(){
    if (document.getElementById("flashcard") == null){
        console.log("No flashcard");
        let newCard = document.createElement("div");
        newCard.id = "flashcard";
        newCard.innerText = questions[currentQuestionIndex].flashcard;
        document.getElementById("flash-container").appendChild(newCard);
    }

}

function removeOptions(){
    if (document.getElementById("options") != null){
        document.getElementById("options").remove();
    }
}

function createStopWatch(){
    if (document.getElementById("min") == null){
        console.log("No minute");
        let newMin = document.createElement("span");
        newMin.id = "min";
        newMin.innerText = "00 "

        let newText = document.createElement("span");
        newText.id = "text";
        newText.innerText = "Min "

        document.getElementById("time").appendChild(newMin);
        document.getElementById("time").appendChild(newText);
    }
    if (document.getElementById("sec") == null){
        console.log("No second");
        let newSec = document.createElement("span");
        newSec.id = "sec";
        newSec.innerText = "00"
        let newText = document.createElement("span");
        newText.id = "text";
        newText.innerText = "Sec"

        document.getElementById("time").appendChild(newSec);
        document.getElementById("time").appendChild(newText);
    }
}

function stopWatch() {
    count++;

    if (count == 100) {
        second++;
        count = 0;
    }

    if (second == 60) {
        minute++;
        second = 0;
    }

    let minString = minute;
    let secString = second;

    if (minute < 10) {
        minString = "0" + minString;
    }

    if (second < 10) {
        secString = "0" + secString;
    }

    document.getElementById('min').innerHTML = minString;
    document.getElementById('sec').innerHTML = secString;
    setTimeout(stopWatch, 10);
    if (second % 30 == 0 || second % 30 == 2){
        document.getElementById("time").style.setProperty("background-color", "red");
    }

    else{
        document.getElementById("time").style.setProperty("background-color", "white");
    }
}

function resetWatch(){
    hour = 0;
    minute = 0;
    second = 0;
    count = 0;
    document.getElementById('hr').innerHTML = "00";
    document.getElementById('min').innerHTML = "00";
    document.getElementById('sec').innerHTML = "00";
}

const questions = [
    {
        question: 'Who was the 2021 Formula 1 World Champion?',
        answers: [
            {text: 'Max Verstappen', correct: true},
            {text: 'Lewis Hamilton', correct: false},
            {text: 'Sergio Perez', correct: false},
            {text: 'Sebastian Vettel', correct: false}
        ],
        flashcard: "Max Verstappen won the champtionship in a very controversial way in 2021. his main rival was Lewis Hamilton"
    },
    {
        question: 'Who holds the NBA single season record for Assists?',
        answers: [
            {text: 'John Stockton', correct: true},
            {text: 'Russell Westbrook', correct: false},
            {text: 'Chris Paul', correct: false},
            {text: 'Oscar Robertson', correct: false}
        ],
        flashcard: "John Stockton holds the single-season assist record by nearly 5,000 assists. The next closes is LeBron James at 21345 assists."
    },
    {
        question: 'Who holds the MLB single season record for homeruns?',
        answers: [
            {text: 'Barry Bonds', correct: true},
            {text: 'Babe Ruth', correct: false},
            {text: 'Hank Aaron', correct: false},
            {text: 'Ken Griffey Jr.', correct: false}
        ],
        flashcard: "Barry Bonds holds the single-season homerun record, however he was using PED's at the time. Many people consider his record invalid."
    },
    {
        question: 'What is the diameter of a basketball hoop?',
        answers: [
            {text: '18 inches', correct: true},
            {text: '16 inches', correct: false},
            {text: '24 inches', correct: false},
            {text: '20 inches', correct: false}
        ],
        flashcard: "The diameter is 18 inches. This is just large enough to let 2 basketballs get stuck in the hoop.",

    },
    {
        question: 'How many dimples does the average golf ball have?',
        answers: [
            {text: '336', correct: true},
            {text: '296', correct: false},
            {text: '378', correct: false},
            {text: '402', correct: false}
        ],
        flashcard: "The average golf ball has 336, the best ball is Titleist Pro V1."
    },
    {
        question: 'What sporting event is held every year on memorial day?',
        answers: [
            {text: 'Indianapolis 500', correct: true},
            {text: 'MLB Opening Day', correct: false},
            {text: 'NBA Allstar Game', correct: false},
            {text: 'The SuperBowl', correct: false}
        ],
        flashcard: "The Indianapoilis 500 happens every year on Memorial Day."
    },
    {
        question: 'How long is an Olympic-sized swimming pool?',
        answers: [
            {text: '50 meters', correct: true},
            {text: '45 meters', correct: false},
            {text: '48 meters', correct: false},
            {text: '52 meters', correct: false}
        ],
        flashcard: "An Olympic swimming pool is 50 meters long. That is a very large pool!"
    },
    {
        question: 'How many defensive players are in the field during a baseball game?',
        answers: [
            {text: '9', correct: true},
            {text: '8', correct: false},
            {text: '10', correct: false},
            {text: '11', correct: false}
        ],
        flashcard: "There are 9 players on the baseball field at once. The positions go as follows:"
    },
    {
        question: 'What is the object hit in Badminton called?',
        answers: [
            {text: 'Shuttlecock', correct: true},
            {text: 'Badminton Ball', correct: false}
        ],
        flashcard: "It is called a shuttlecock. I always thought it was called a birdie"
    },
    {
        question: 'How much does an NFL football weigh?',
        answers: [
            {text: '1 pound', correct: true},
            {text: '1.2 pounds', correct: false},
            {text: '0.8 pounds', correct: false},
            {text: '1.5 pounds', correct: false}
        ],
        flashcard: "A football is 1 pound. Unless you are Tom Brady in the Superbowl."
    },
    {
        question: 'How far is the NBA 3-point line?',
        answers: [
            {text: '23 feet 9 inches', correct: true},
            {text: '23 feet', correct: false},
            {text: '24 feet 6 inches', correct: false},
            {text: '25 feet', correct: false}
        ],
        flashcard: "The 3 point line is 23 feet 9 inches."
    },
    {
        question: 'Who is the all time NBA points leader?',
        answers: [
            {text: 'Kareem Abdul-Jabbar', correct: true},
            {text: 'LeBron James', correct: false},
            {text: 'Michael Jordan', correct: false},
            {text: 'Tim Duncan', correct: false}
        ],
        flashcard: "Kareem Abdul-Jabbar is the all time leader in points."
    },
    {
        question: 'Which team bats first in baseball?',
        answers: [
            {text: 'Away Team', correct: true},
            {text: 'Home Team', correct: false}
        ],
        flashcard: "The away team bats first in baseball. This gives the home team the last chance to bat if they are losing the game."
    },
    {
        question: 'What sport is considered the \"King of sports\"?',
        answers: [
            {text: 'Soccer', correct: true},
            {text: 'Baseball', correct: false},
            {text: 'Basketball', correct: false},
            {text: 'Football', correct: false}
        ],
        flashcard: "Soccer is considered to be the King of sports. It has tens of millions more viewers than all other sports."
    },
    {
        question: 'Which of the following is no longer a Formula 1 team?',
        answers: [
            {text: 'Renault', correct: true},
            {text: 'Red Bull', correct: false},
            {text: 'Mercedes', correct: false},
            {text: 'Alpine', correct: false}
        ],
        flashcard: "Renault is no longer in Formula 1. Their last year they had Daniel Riccardo and another driver."
    }
]