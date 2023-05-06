const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentSCore = document.getElementById("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const recentScore = JSON.parse(localStorage.getItem("recentScore")) || 0;
//convert to JSON object

console.log(highScores);
console.log(recentScore);

const MAX_HIGH_SCORES = 5;





finalScore.innerText = mostRecentSCore;



username.addEventListener("keyup", () => {
    console.log(saveScoreBtn,saveScoreBtn.disabled);
    saveScoreBtn.disabled = !username.value; 
    
});

saveHighScore = e => {
    e.preventDefault();
    //The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.




    const score = {
        score: recentScore,
        name: username.value
    };
    console.log(score);
    highScores.push(score);
    //The push() method adds new items to the end of an array.


    highScores.sort((a,b) => b.score - a.score)
    //The sort() method sorts an array alphabetically
    highScores.splice(5);

localStorage.setItem("highScores", JSON.stringify(highScores));
//Convert a JavaScript object into a string
window.location.assign("/");

};

saveScoreBtn.addEventListener("click", saveHighScore);