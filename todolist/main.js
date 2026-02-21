// 유저가 값을 입력
// + 버튼 클릭 -> 할일 추가
// delete 클릭 -> 삭제
// check 클릭 -> 할일 끝 + 밑줄
// 1. check 클릭 -> true <-> false
// 2. true이면 끝난걸로 간주하고 밑줄
// 3. false이면 안끝난걸로 간주하고 그대로
// 진행 중 끝남 탭 -> 언더바 이동
// 각 탭에 맞는 결과 표출

// 슬라이드 넘기기 o
// 입력 -> 초기화 O
// 진행중에서 삭제하기 바로 적용 안됨 o
// 입력하지 않으면 추가 x(disable or 알람) o
// Enter 적용 O
// 디자인
// 다시 만들기

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskList = [];
let mode = 'all';
let filterList = [];

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        addTask(event);
    }
});

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function (event) {filter(event)});
}

function addTask() {
    if (taskInput.value === ""){
        return alert("입력하시오");
    }
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false,
    }
    taskList.push(task);
    console.log(taskList);
    taskInput.value = "";
    filter();
}

function render() {
    console.log("render",mode);
    let list = [];
    if (mode === "all"){
        list = taskList;
    } else {
        list = filterList;
    }
    let resultHTML = '';
    for (let i=0; i<list.length; i++){
        if (list[i].isComplete == true){
            resultHTML += `<div class="task grey">
                    <div class="task-done">
                        ${list[i]["taskContent"]}
                    </div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')" class="task-button"><i class="fa-solid fa-arrows-rotate blue"></i></button>
                        <button onclick="deleteTask('${list[i].id}')" class="task-button"><i class="fa-solid fa-trash red"></i></button>
                    </div>
                </div>`
        } else {
            resultHTML += `<div class="task">
                    <div>
                        ${list[i]["taskContent"]}
                    </div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')" class="task-button"><i class="fa-solid fa-check check"></i></button>
                        <button onclick="deleteTask('${list[i].id}')" class="task-button"><i class="fa-solid fa-trash red"></i></button>
                    </div>
                </div>`
        }
        
    }
    document.getElementById("task-board").innerHTML = resultHTML
}

function toggleComplete(id) {
    for (let i=0; i<taskList.length; i++){
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
}

function deleteTask(id) {
    for (let i=0; i<taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i,1);
            break;
        }
    }
    filter();
}

function filter(event){
    if(event){
        underLine.style.left = event.currentTarget.offsetLeft + "px";
        underLine.style.width = event.currentTarget.offsetWidth + "px";
        underLine.style.top = event.currentTarget.offsetTop + event.currentTarget.offsetHeight-4 + "px";
        mode = event.target.id;
    }
    console.log("filter",mode);
    filterList = [];
    if (mode == "all"){
        render()
    } else if (mode == "ongoing"){
        for (let i=0; i<taskList.length; i++){
            if (taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
        render();
    } else {
        for (let i=0; i<taskList.length; i++){
            if (taskList[i].isComplete === true) {
                filterList.push(taskList[i])
            }
        }
        render();
    }
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}