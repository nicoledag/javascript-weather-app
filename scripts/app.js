const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const forecastDetails = document.querySelector('.details-forecast');
const now = new Date();
console.log(now);
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


    let day = null;
    switch (new Date().getDay()) {
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
        day = "WED";
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
      <td>TUE</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>WED</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>THU</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>FRI</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>SAT</td>
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