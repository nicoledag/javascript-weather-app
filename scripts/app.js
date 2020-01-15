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


const updateUI = (data) => {
    // const cityDetails = data.cityDetails;
    // const weather = data.weather;
    // const forecast = data.forecast;
 
    //destructure properties
    const { cityDetails, weather, forecast } = data;
    console.log(weather);
    console.log(forecast);
    // debugger;

    let zero = forecast[0].Date;
    console.log(zero)

    const one = forecast[1];
    const two = forecast[2];
    const three = forecast[3];
    const four = forecast[4];



    var day = null;
    switch (currentDay) {
      case 0:
        day = "SUN";
        break;
      case 1:
        day = "MON";
        break;
      case 2:
          day = "TUES";
        break;
      case 3:
        day = "WEDS";
        break;
      case 4:
        day = "THUR";
        break;
      case 5:
        day = "FRI";
        break;
      case 6:
        day = "SAT";
    }
    
    var followingDay = null;
    var dayTwo = null;
    var dayThree = null;
    var dayFour = null;
      switch(day){
        case 'MON':
          followingDay = "TUES";
          break;
        case 'TUES':
          followingDay = "WEDS"
          dayTwo = "THURS";
          dayThree = "FRI";
          dayFour = "SAT";
          break;
        case 'WEDS':
          followingDay = "THUR";
          break;
        case 'THUR':
          followingDay = "FRI";
          break;
        case 'FRI':
        followingDay = "SAT";
        break;
        case 'SAT':
          followingDay = "SUN";
          break;
        case 'SUN':
          followingDay = "MON";
          break;
      }

    // update details template
    details.innerHTML = `
        <div class="cityinfo">
        <h1>${cityDetails.EnglishName}</h1>
        <h5>As of ${formatTime}</h5>
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
    table.innerHTML = `
    <table>
    <tr>
      <th>Day</th>
      <th>Description</th>
      <th>High/Low</th>
      <th>Precip</th>
      <th>Wind</th>
      <th>Humidity</th>
    </tr>
    <tr>
      <td>${day}</td>
      <td>${weather.WeatherText}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>${followingDay}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>${dayTwo}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>${dayThree}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>${dayFour}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </table>

    `;

        //update the night/day and icon image
        const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
        icon.setAttribute('src', iconSrc);

        if(weather.IsDayTime === true ){
            time.src = './img/cloud.jpg'
        }else{
            time.src = './img/night-stars.jpg'
        }

        //remove the d-none class if present
        if(card.classList.contains('d-none')){
            card.classList.remove('d-none');
        };

        if(table.classList.contains('d-none')){
            table.classList.remove('d-none');
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
});