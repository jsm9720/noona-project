// 유저가 값을 입력
// + 버튼 클릭 -> 할일 추가
// delete 클릭 -> 삭제
// check 클릭 -> 할일 끝 + 밑줄
// 1. check 클릭 -> true <-> false
// 2. true이면 끝난걸로 간주하고 밑줄
// 3. false이면 안끝난걸로 간주하고 그대로
// 진행 중 끝남 탭 -> 언더바 이동
// 각 탭에 맞는 결과 표출
//

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];

addButton.addEventListener("click", addTask);

function addTask() {
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false,
    }
    taskList.push(task);
    console.log(taskList);
    render();
}

function render() {
    let resultHTML = '';
    for (let i=0; i<taskList.length; i++){
        if (taskList[i].isComplete == true){
            resultHTML += `<div class="task">
                    <div class="task-done">
                        ${taskList[i]["taskContent"]}
                    </div>
                    <div class="task-button">
                        <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-arrows-rotate"></i></button>
                        <button onclick="deleteTask()"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>`
        } else {
            resultHTML += `<div class="task">
                    <div>
                        ${taskList[i]["taskContent"]}
                    </div>
                    <div class="task-button">
                        <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check"></i></button>
                        <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash"></i></button>
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
    render();
}

function deleteTask(id) {
    for (let i=0; i<taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i,1);
            break;
        }
    }
    render();
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}