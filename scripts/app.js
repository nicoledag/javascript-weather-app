const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const forecastDetails = document.querySelector('.details-forecast');
const now = new Date();
console.log(now);
const currentDay = now.getDay();
const formatTime = now.toLocaleString();
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const table = document.querySelector('table')
const tableHeader = document.querySelector('.table-header')
const currentTime = document.querySelector('.current-time')

const updateUI = (data) => {
    // const cityDetails = data.cityDetails;
    // const weather = data.weather;
    // const forecast = data.forecast;
 
    //destructure properties
    const { cityDetails, weather, forecast } = data;
    console.log(weather);
    console.log(forecast);



    // Check if precipitation, description and high/low temp for current day or night.

    let sunrise = forecast[0].Sun.EpochRise 
    let sunset = forecast[0].Sun.EpochSet 
    let dayZero = weather.EpochTime
    
    let precipitation = null
      if(dayZero > sunrise && dayZero < sunset){
        precipitation = forecast[0].Day.PrecipitationProbability
      }else{
        precipitation = forecast[0].Night.PrecipitationProbability
      }

    let description = null
      if(dayZero > sunrise && dayZero < sunset){
        description = forecast[0].Day.IconPhrase
      }else{
        description = forecast[0].Night.IconPhrase
      }

    let high = null
    let low = null
      if(dayZero > sunrise && dayZero < sunset){
        high = forecast[0].Temperature.Maximum.Value
        low = forecast[0].Temperature.Minimum.Value
      }else{
        high = "--"
        low = forecast[0].Temperature.Minimum.Value
      }
  

    // Check what day it is on the forecast.
    let zero = new Date(forecast[0].Date).getDay();
    switch (zero) {
      case 0:
        zero = "SUN";
        break;
      case 1:
        zero = "MON";
        break;
      case 2:
        zero = "TUES";
        break;
      case 3:
        zero = "WEDS";
        break;
      case 4:
        zero = "THUR";
        break;
      case 5:
        zero = "FRI";
        break;
      case 6:
        zero = "SAT";
    }

    let one = new Date(forecast[1].Date).getDay();
    switch (one) {
      case 0:
        one = "SUN";
        break;
      case 1:
        one = "MON";
        break;
      case 2:
        one = "TUES";
        break;
      case 3:
        one = "WEDS";
        break;
      case 4:
        one = "THUR";
        break;
      case 5:
        one = "FRI";
        break;
      case 6:
        one = "SAT";
    }

    let two = new Date(forecast[2].Date).getDay();
    switch (two) {
      case 0:
        two = "SUN";
        break;
      case 1:
        two = "MON";
        break;
      case 2:
        two = "TUES";
        break;
      case 3:
        two = "WEDS";
        break;
      case 4:
        two = "THUR";
        break;
      case 5:
        two = "FRI";
        break;
      case 6:
        two = "SAT";
    }
    

    let three = new Date(forecast[3].Date).getDay();
    switch (three) {
      case 0:
        three = "SUN";
        break;
      case 1:
        three = "MON";
        break;
      case 2:
        three = "TUES";
        break;
      case 3:
        three = "WEDS";
        break;
      case 4:
        three = "THUR";
        break;
      case 5:
        three = "FRI";
        break;
      case 6:
        three = "SAT";
    }
   
    let four = new Date(forecast[4].Date).getDay();
    switch (four) {
      case 0:
        four = "SUN";
        break;
      case 1:
        four = "MON";
        break;
      case 2:
        four = "TUES";
        break;
      case 3:
        four = "WEDS";
        break;
      case 4:
        four = "THUR";
        break;
      case 5:
        four = "FRI";
        break;
      case 6:
        four = "SAT";
    }

    currentTime.innerHTML = `
    <h5>As of ${formatTime}</h5>
    `;

    // update details template
    details.innerHTML = `
        <div class="cityinfo">
        <h1>${cityDetails.EnglishName}</h1>
        </div>
        <div class="temp">
            <span>${weather.Temperature.Imperial.Value}</span>
            <span>&deg;F</span>
            <h3>${weather.WeatherText}</h3>
            <h4>Feels like ${weather.RealFeelTemperature.Imperial.Value}&deg;F</h4>
            <h4>UV Index ${weather.UVIndex} of 10</h4>
        </div>
        `;

    // update table template
    
    tableHeader.innerHTML = `
      <h2>5 Day Forecast</h2>
    `;
    
    table.innerHTML = `
    <table>
    <tr>
      <th>Day</th>
      <th>Description</th>
      <th>High/Low &deg;F</th>
      <th>Precip</th>
      <th>Wind</th>
      <th>Humidity</th>
    </tr>
    <tr>
      <td class="more-info"><b>${zero}</b> <img src="img/icons/${weather.WeatherIcon}.svg" alt="" class="table-img"></td>
      <td>${description}</td>
      <td class="table-center">${high} / ${low}</td>
      <td class="table-center">${precipitation}%</td>
      <td class="table-center">${weather.Wind.Direction.English} ${weather.Wind.Speed.Imperial.Value} mph</td>
      <td class="table-center"> ${weather.RelativeHumidity}</td>
    </tr>
    <tr>
      <td><b>${one}</b> <img src="img/icons/${forecast[1].Day.Icon}.svg" alt=""></td>
      <td>${forecast[1].Day.IconPhrase} </td>
      <td class="table-center">${forecast[1].Temperature.Maximum.Value} / ${forecast[1].Temperature.Minimum.Value}</td>
      <td class="table-center">${forecast[1].Day.PrecipitationProbability}% </td>
      <td class="table-center">${forecast[1].Day.Wind.Direction.English} ${forecast[1].Day.Wind.Speed.Value} mph</td>
      <td class="table-center">na</td>
    </tr>
    <tr>
      <td><b>${two}</b> <img src="img/icons/${forecast[2].Day.Icon}.svg" </td>
      <td>${forecast[2].Day.IconPhrase} </td>
      <td class="table-center">${forecast[2].Temperature.Maximum.Value} / ${forecast[2].Temperature.Minimum.Value}</td>
      <td class="table-center">${forecast[2].Day.PrecipitationProbability}% </td>
      <td class="table-center">${forecast[2].Day.Wind.Direction.English} ${forecast[2].Day.Wind.Speed.Value} mph</td>
      <td class="table-center">na</td>
    </tr>
    <tr>
      <td><b>${three}</b> <img src="img/icons/${forecast[3].Day.Icon}.svg" </td>
      <td>${forecast[3].Day.IconPhrase} </td>
      <td class="table-center">${forecast[3].Temperature.Maximum.Value}/ ${forecast[3].Temperature.Minimum.Value}</td>
      <td class="table-center">${forecast[3].Day.PrecipitationProbability}% </td>
      <td class="table-center">${forecast[3].Day.Wind.Direction.English} ${forecast[3].Day.Wind.Speed.Value} mph</td>
      <td class="table-center">na</td>
    </tr>
    <tr>
      <td><b>${four}</b> <img src="img/icons/${forecast[4].Day.Icon}.svg" </td>
      <td>${forecast[4].Day.IconPhrase}</td>
      <td class="table-center">${forecast[4].Temperature.Maximum.Value} / ${forecast[4].Temperature.Minimum.Value} </td>
      <td class="table-center">${forecast[4].Day.PrecipitationProbability}% </td>
      <td class="table-center">${forecast[4].Day.Wind.Direction.English} ${forecast[4].Day.Wind.Speed.Value} mph</td>
      <td class="table-center">na</td>
    </tr>
  </table>

    `;

        //update the night/day and icon image
        const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
        icon.setAttribute('src', iconSrc);

        let timeSrc = weather.IsDayTime ? time.src = './img/cloud.jpg' : time.src = './img/night-stars.jpg';
        

        //remove the d-none class if present

        if(card.classList.contains('d-none')){
            card.classList.remove('d-none');
        };

        if(table.classList.contains('d-none')){
            table.classList.remove('d-none');
        };

        if(tableHeader.classList.contains('d-none')){
          tableHeader.classList.remove('d-none');
        };

          if(currentTime.classList.contains('d-none')){
            currentTime.classList.remove('d-none');
        };



};

const updateCity  = async (city) => {
    // console.log(city);

    const cityDetails = await getCity(city);
    // console.log(cityDetails);
    const weather = await getWeather(cityDetails.Key);
    // console.log(weather);

    const forecast = await getForecast(cityDetails.Key);

    return {
       cityDetails: cityDetails,
       weather: weather, 
       forecast: forecast
    };
};


cityForm.addEventListener('submit', e => {
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    //set local storage
    localStorage.setItem('city', city);
});


if(localStorage.getItem('city')){
  updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}
