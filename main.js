let random = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
playButton.addEventListener("click",play);

function pickRandomNum(){
    random = Math.floor(Math.random() * 100) + 1;
    console.log(random);
}

function play(){
    let userValue = userInput.value;
    if (userValue < random) {
        resultArea.textContent = "up"
    } else if (userValue > random) {
        resultArea.textContent = "down"
    } else {
        resultArea.textContent = "정답"
    }
}

pickRandomNum();