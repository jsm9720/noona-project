// 유저가 값을 입력
// + 버튼 클릭 -> 할일 추가
// delete 클릭 -> 삭제
// check 클릭 -> 할일 끝 + 밑줄
// 진행 중 끝남 탭 -> 언더바 이동
// 각 탭에 맞는 결과 표출
//

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];

addButton.addEventListener("click", addTask);

function addTask() {
    let taskContent = taskInput.value;
    taskList.push(taskContent);
    console.log(taskList);
    render();
}

function render() {
    let resultHTML = '';
    for (let i=0; i<taskList.length; i++){
        resultHTML += `<div class="task">
                    <div>
                        ${taskList[i]}
                    </div>
                    <div>
                        <button>Check</button>
                        <button>Delete</button>
                    </div>
                </div>`
    }
    document.getElementById("task-board").innerHTML = resultHTML
}