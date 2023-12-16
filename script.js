const questons = [
    {
        questons:"Which is largest animal in the world?",
        answers: [ 
         {text:"Shark", correct: false},
         {text:"Blue whale", correct: true},
         {text:"Elephant", correct: false},
         {text:"Giraffe", correct: false}
      ]
        
    },
    {
        questons:"Which is smallest countinent in the world?",
        answers: [ 
         {text:"Asia", correct: false},
         {text:"Australia", correct: true},
         {text:"Arctic", correct: false},
         {text:"Africa", correct: false}
        ]
    },
    {
        questons:"Which is largest desert in the world?",
        answers: [ 
         {text:"Kalahari", correct: false},
         {text:"Gobi", correct: false},
         {text:"Sahara", correct: false},
         {text:"Antractica", correct: true}
        ]
    },
    {
        questons:"Which is smallest country in the world?",
        answers: [ 
         {text:"Vatican City", correct: true},
         {text:"Bhutan", correct: false},
         {text:"Nepal", correct: false},
         {text:"Shri Lanka", correct: false}
        ]
    }
];

const questonsElement = document.getElementById("quection");
const answerButton = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questons[currentQuestionIndex];
    let questionNo  = currentQuestionIndex + 1;
    questonsElement.innerHTML = questionNo + ". " + currentQuestion.questons;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questonsElement.innerHTML = `You scored ${score} out of ${questons.length}`;
     nextButton.innerHTML = "Play Again";
     nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questons.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questons.length) {
        handleNextButton();
    }
    else {
        startQuiz(); 
    }
})

startQuiz();