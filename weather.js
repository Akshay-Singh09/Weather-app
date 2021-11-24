let key='61f645f604ea94e6f14b3118931541b1';
let lat;
let lon;

function curTime(x=3600) {
  let d= new Date();
  document.getElementById('time').innerHTML = d;
}

if (navigator.geolocation){
  navigator.geolocation.getCurrentPosition(position => {
    lat = position.coords.latitude.toPrecision(4);
    lon = position.coords.longitude.toPrecision(4);
    const oneCall_weather=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${key}`;
    const air_api=`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${key}`;
    window.addEventListener('load', () => {
    fetch(oneCall_weather)
      .then(response => response.json())
      .then(data => {
          document.getElementById('time').innerHTML = setInterval(curTime,1000);
          const {temp,feels_like,wind_speed,humidity,weather,pressure,dew_point} = data.current;
          document.getElementById('temperature').innerHTML ="Temperature : " + temp + "\xB0 C";
          document.getElementById('wind').innerHTML ="Wind Speed : " + wind_speed + "km/h";
          document.getElementById('humidity').innerHTML = "Humidity : " + humidity + "%";
          document.getElementById('dew').innerHTML = "Dew Point : " + dew_point + "\xB0 C";
          document.getElementById('pressure').innerHTML ="Pressure : " + pressure + "mb";
          document.getElementById('real_feel').innerHTML ="Real Feel : " + feels_like + "\xB0 C";
          document.getElementById('description').innerHTML = weather[0].description;
          let image =weather[0].icon + ".png";
          let background = weather[0].icon + ".jpg";
          let x =`url(${background}) no-repeat`;
          document.getElementById('weather_icon').innerHTML = `<img src="${image}">`;
          document.getElementById('main_container').style.background = x;
          document.getElementById('main_container').style.backgroundSize = "100% 100%";
      });
    });

    fetch(air_api)
      .then(response => response.json())
      .then(data => {
        let colour= {1 : "#008D47", 2 : "#FEF102", 3 : "#F7941D", 4 : "#EC1C22", 5 : "#890207"};
        let quality= {1 : "Good", 2 : "Fair", 3 : "Moderate", 4 : "Poor", 5 : "Very Poor"};
        const {main} = data.list[0];
        const {pm2_5,pm10} = data.list[0].components;
        document.getElementById('desc').innerHTML = quality[main.aqi];
        document.getElementById('desc').style.color = colour[main.aqi];
        document.getElementById('pm2_5').innerHTML ="PM 2.5 : " + pm2_5;
        document.getElementById('pm10').innerHTML ="PM 10 : " + pm10;
      });

  });

}

document.getElementById('query_search').onclick = () => {
  let loc = document.getElementById('query').value;
  console.log(loc);
  let cur_api = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${key}`;
  fetch(cur_api)
    .then(response => response.json())
    .then(data => {
        const {temp, feels_like,temp_max,temp_min,humidity, pressure} = data.main;
        const {name, wind, visibility, weather} = data;
        document.getElementById('time').style.display = "none";
        document.getElementById('air_quality').style.display = "none";
        document.getElementById('dew').style.display = "none";
        document.getElementById('temperature').innerHTML ="Temperature : " + temp + "\xB0 C";
        document.getElementById('wind').innerHTML ="Wind Speed : " + wind.speed + "km/h";
        document.getElementById('humidity').innerHTML ="Humidity : " + humidity + "%";
        document.getElementById('pressure').innerHTML ="Pressure : " + pressure + "mb";
        document.getElementById('real_feel').innerHTML ="Real Feel : " + feels_like + "\xB0 C";
        document.getElementById('description').innerHTML = weather[0].description;
        let image =weather[0].icon + ".png";
        let background = weather[0].icon + ".jpg";
        let x =`url(${background}) no-repeat`;
        document.getElementById('weather_icon').innerHTML = `<img src="${image}">`;
        document.getElementById('main_container').style.background = x;
        document.getElementById('main_container').style.backgroundSize = "100% 100%";

    })
}