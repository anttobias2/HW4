const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})
function startGame(){
    console.log('Started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
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
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    }
    else{
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
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

const questions = [
    {
        question: 'Who was the 2021 Formula 1 World Champion?',
        answers: [
            {text: 'Max Verstappen', correct: true},
            {text: 'Lewis Hamilton', correct: false},
            {text: 'Sergio Perez', correct: false},
            {text: 'Sebastian Vettel', correct: false}
        ]
    },
    {
        question: 'Who holds the NBA single season record for Assists?',
        answers: [
            {text: 'John Stockton', correct: true},
            {text: 'Russell Westbrook', correct: false},
            {text: 'Chris Paul', correct: false},
            {text: 'Oscar Robertson', correct: false}
        ]
    },
    {
        question: 'Who holds the MLB single season record for homeruns?',
        answers: [
            {text: 'Barry Bonds', correct: true},
            {text: 'Babe Ruth', correct: false},
            {text: 'Hank Aaron', correct: false},
            {text: 'Ken Griffey Jr.', correct: false}
    ]
    },
    {
        question: 'What is the diameter of a basketball hoop?',
        answers: [
            {text: '18 inches', correct: true},
            {text: '16 inches', correct: false},
            {text: '24 inches', correct: false},
            {text: '20 inches', correct: false}
        ]
    },
    {
        question: 'How many dimples does the average golf ball have?',
        answers: [
            {text: '336', correct: true},
            {text: '296', correct: false},
            {text: '378', correct: false},
            {text: '402', correct: false}
        ]
    },
    {
        question: 'What sporting event is held every year on memorial day?',
        answers: [
            {text: 'Indianapolis 500', correct: true},
            {text: 'MLB Opening Day', correct: false},
            {text: 'NBA Allstar Game', correct: false},
            {text: 'The SuperBowl', correct: false}
        ]
    },
    {
        question: 'How long is an Olympic-sized swimming pool?',
        answers: [
            {text: '50 meters', correct: true},
            {text: '45 meters', correct: false},
            {text: '48 meters', correct: false},
            {text: '52 meters', correct: false}
        ]
    },
    {
        question: 'How many defensive players are in the field during a baseball game?',
        answers: [
            {text: '9', correct: true},
            {text: '8', correct: false},
            {text: '10', correct: false},
            {text: '11', correct: false}
        ]
    },
    {
        question: 'What is the object hit in Badminton called?',
        answers: [
            {text: 'Shuttlecock', correct: true},
            {text: 'Badminton Ball', correct: false}
        ]
    },
    {
        question: 'How much does an NFL football weigh?',
        answers: [
            {text: '1 pound', correct: true},
            {text: '1.2 pounds', correct: false},
            {text: '0.8 pounds', correct: false},
            {text: '1.5 pounds', correct: false}
        ]
    },
    {
        question: 'How far is the NBA 3-point line?',
        answers: [
            {text: '23 feet 9 inches', correct: true},
            {text: '23 feet', correct: false},
            {text: '24 feet 6 inches', correct: false},
            {text: '25 feet', correct: false}
        ]
    },
    {
        question: 'Who is the all time NBA points leader?',
        answers: [
            {text: 'Kareem Abdul-Jabbar', correct: true},
            {text: 'LeBron James', correct: false},
            {text: 'Michael Jordan', correct: false},
            {text: 'Tim Duncan', correct: false}
        ]
    },
    {
        question: 'Which team bats first in baseball?',
        answers: [
            {text: 'Away Team', correct: true},
            {text: 'Home Team', correct: false}
        ]
    },
    {
        question: 'What sport is considered the \"King of sports\"?',
        answers: [
            {text: 'Soccer', correct: true},
            {text: 'Baseball', correct: false},
            {text: 'Basketball', correct: false},
            {text: 'Football', correct: false}
        ]
    },
    {
        question: 'Which of the following is no longer a Formula 1 team?',
        answers: [
            {text: 'Renault', correct: true},
            {text: 'Red Bull', correct: false},
            {text: 'Mercedes', correct: false},
            {text: 'Alpine', correct: false}
        ]
    }
]