const clockContainer = document.querySelector(".js-clock"),
  colockTitle = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  colockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  getTime(); // 먼저, 시간을 얻는다. 만약 이 구문이 없다면, 새로고침시 00:00:00으로 떳다가 1초후에 변함
  setInterval(getTime, 1000);
}

init();
