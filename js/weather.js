const weather = document.querySelector(".js-weather");

const API_KEY = "dce443c4a7754e7d7a2117c2d497a0be";
const COORDS = "coords";

function getWeather(lat, lng) {
  /*
    fetch()를 통해서 데이터를 가져온다.
    따옴표가 아닌 백틱(`)을 사용할 것.
    App ID에 API Key를 넣어주면 API를 제공하는 쪽에서
    요청자의 API Key를 통해서 요청 상황을 알 수 있다.
    요청내용은 크롬 개발자 도구의 Network에서 확인 가능
  */
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    // { mode: "no-cors" }
  )
    .then(function(response) {
      return response.json();
      // resposne에는 네트워크 관련 정보만 담겨 있었다.
      // response로부터 원하는 정보(body 안에 있음)를 갖고오기 위해 json으로 변환
    })
    .then(function(json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${Math.floor(temperature)}℃ @ ${place}`;
    });
  /*
    "then() 함수를 사용하는 이유"
    API 요청으로 넘어오는 데이터는 시간이 좀 걸리는 경우가 있다.
    그러므로 데이터가 완전히 넘어온 후에(fetch가 완료되기 까지)
    다음 호출을 하기 위하여 then() 함수를 이용하는 것이다.

    만약, fetch가 완료되기 전에 다음 작업을 지시하면,
    다음 작업은 fetch가 완료되길 기다리지 않을 것이기 때문에
    fetch가 정상적으로 완료되지 않을 수 있다.

    즉, 서버로부터 데이터가 완전히 들어올 때까지 기다려할 때 사용한다.
*/
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude: latitude,
    longitude: longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access geo location");
}

function askForCoords() {
  /*
    navigator.geolocation.watchPosition(successCallback, errorCallback)
    
    successCallback: 좌표를 가져오는데 성공했을 때를 처리하는 함수
    errorCallback: 실패했을 때를 처리하는 함수
  */
  navigator.geolocation.watchPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
