/*
  Array.filter()
  Array.forEach()
  
  list에 있는 모든 item을 위한 함수를 실행시킨다.
*/

const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];
let toDosIndex = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  // cleanToDos는 특정 항목 삭제 후 새로 갱신된 toDos라고 보면 됨.
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
    // 내가 지우고자 하는 항목을 제외한 나머지 아이템들을 리턴.
    // 주의할 점 :  "toDo.id"는 number, "li.id"는 string으로 값을 반환.
  });
  /* 
    toDos(배열) 안의 아이템들에 대해 필터가 돌면서,
    필터내함수가 리턴하는 조건에 부합하는 값들로 다시 배열을 생성.
  */
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  /*
    local storage는 모든 data를 string으로 저장한다.
    JSON.stringify() : 자바스크립트 object를 string으로 바꿔준다.
    JSON(Javascript Object Notation) : 데이터를 전달할 때, 자바스크립트가 그걸 다룰 수 있도록 object로 바꿔주는 기능
  */
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = parseInt(Math.random() * 1000000000);
  delBtn.innerText = "X";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos(toDos); // 매개변수에 값이 안들어가도 정상적으로 동작.
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    // console.log(loadedToDos); // 로컬스토리지에서 불러온 값은 string이다.
    const parsedToDos = JSON.parse(loadedToDos);
    // JSON.parse() :
    // 로컬스토리지에 string을 저장되어 있는 data를 다시 object로 변환한다.
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
