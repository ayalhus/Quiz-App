const questionEl = document.getElementById("question");
const choicesEls = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];
fetch("https://opentdb.com/api.php?amount=3&category=20&difficulty=hard&type=multiple")
.then(res => {
    return res.json();
})
.then(loadedQuestions => {
    console.log(loadedQuestions.results);
   questions =  loadedQuestions.results.map(loadedQuestion => {
        const formattedQuestion = {
            questionName: loadedQuestion.question
        };
        const answerChoices = [... loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 4); 
        answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);
        answerChoices.forEach((choice, index) => {
            formattedQuestion["choice" + (index+1)] = choice;
        })
         console.log(formattedQuestion);
        return formattedQuestion;


    });










    //questions = loadedQuestions;
startGame();
})
.catch(err => {
    console.log(err);
});
const CORRECT_BONUS = 10;
//const questions.length = questions.length;


startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [... questions]; 
    //spreading 
    
    getNewQuestion();

};

getNewQuestion = () => { 
    if (availableQuestions.length === 0 || 
        questionCounter >= questions.length) {
           localStorage.setItem("recentScore", score);

           return  window.location.assign("/end.html");
        }
    
    questionCounter++;

    progressText.innerText =  `Question ${questionCounter}/${questions.length}`;
    progressBarFull.style.width = `${(questionCounter / questions.length) * 100}%`;
    
    const questionIndex = Math.floor(Math.random() *  availableQuestions.length);
   

    currentQuestion = availableQuestions[questionIndex];

    questionEl.innerText = currentQuestion.questionName;

    

    choicesEls.forEach(choiceEl => {
        const number = choiceEl.dataset["number"];
        choiceEl.innerText = currentQuestion["choice" + number];

    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};


choicesEls.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        console.log(typeof selectedAnswer, typeof currentQuestion.answer )


        let  classToApply = "incorrect";
        if (selectedAnswer == currentQuestion.answer) 
        {
            classToApply = "correct";
        }


        if(classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

                selectedChoice.parentElement.classList.add(classToApply);


        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion()
        }, 1000)



        
        
    });

});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}


