//fetch returns a promise to either resolve or reject.
//.then method once it is resolved to fire a function.
//.catch method to fire a callback function when there is an error.

const key = 'KH5olwOZGiSoxWAArt5yX5ykADVwJGlM';

const getWeather = async (id) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/'
    const query = `${id}?apikey=${key}&language=en-us&details=true`

    const response = await fetch(base + query);
    const data = await response.json();

    // console.log(data[0]);
    return data[0];

};

// getWeather(349727)

const getForecast = async (id) => {
    const base = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/'
    const query = `${id}?apikey=${key}&language=en-us&details=true`

    const response = await fetch(base + query);
    const data = await response.json();

    // console.log("forecast data", data.DailyForecasts);
    return data.DailyForecasts;

};

getForecast('349727');

const getCity = async (city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search'
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    // console.log(data[0]);
    return data[0];
}

