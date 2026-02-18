// 랜덤 숫자 만들기
// 숫자 입력
// 랜덤과 숫자 비교
// 남은 횟수
// gameover
// 정답
// 1~100
// 리셋
// input차아 포커스 -> 입력 초기화
// 중복 입력

let random = 0;
let inputArea = document.getElementById("input-area");
let playButton = document.getElementById("play-button");
let resultArea = document.getElementById("result-area");
let chanceArea = document.getElementById("chance-area");
let correctArea = document.getElementById("correct-area");
let resetButton = document.getElementById("reset-button");
let historyArea = document.getElementById("history-area");
let chance = 3;
let gameOver = false;
let win = false;
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
inputArea.addEventListener("focus", function(){
    inputArea.value = "";
})

function pickRandomNum(){
    random = Math.floor(Math.random() * 100) + 1;
    chanceArea.textContent = `남은 찬스:${chance}`;
    correctArea.textContent = `정답:${random}`;
}

function play() {
    let target = Number(inputArea.value);

    if (target < 1 || target > 100) {
        resultArea.textContent = " 1 ~ 100 중에 선택해주세요"
        return;
    }

    if (history.includes(target)) {
        resultArea.textContent = "중복입니다...";
        return;
    }

    chance--;
    chanceArea.textContent = `남은 찬스:${chance}`;
    history.push(target);
    historyArea.textContent = `님이 입력한 것들... ${history}`;

    if (target < random){
        resultArea.textContent = "up";
    } else if (target > random) {
        resultArea.textContent = "down";
    } else {
        win = true;
    }

    if (chance < 1) {
        gameOver = true;
    }

    if (win) {
        resultArea.textContent = "정답 입니다요~~";
        playButton.disabled = true;
    } else if (gameOver) {
        resultArea.textContent = "GG...";
        playButton.disabled = true;
    }
    
}

function reset() {
    pickRandomNum();
    playButton.disabled = false;
    chance = 3;
    gameOver = false;
    win = false;
    history = [];
    inputArea.value = "";
    resultArea.textContent = "결과 값이 여기 나옵니다.";
    chanceArea.textContent = `남은 찬스:${chance}`;
    historyArea.textContent = "";
}

pickRandomNum();