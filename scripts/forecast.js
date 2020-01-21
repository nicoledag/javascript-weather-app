class Forecast {
    constructor(){
        this.key = 'JotnkNIEEblsw2luKMFt0dhFwQhnAvAT',
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/',
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search',
        this.fiveDayForecastURI = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/'
    }

    async updateCity(city){
        const cityDetails = await this.getCity(city);
        const weather = await this.getWeather(cityDetails.Key);
        // Key is city #number provided by accuweather to get specific city.
        const forecast = await this.getForecast(cityDetails.Key);
        return {
           cityDetails: cityDetails,
           weather: weather, 
           forecast: forecast
        };
    };

    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        return data[0];
    }

    async getWeather(id){
        const query = `${id}?apikey=${this.key}&language=en-us&details=true`
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0];
    }

    async getForecast(id){
        const query = `${id}?apikey=${this.key}&language=en-us&details=true`
        const response = await fetch(this.fiveDayForecastURI + query);
        const data = await response.json();
        return data.DailyForecasts;
    }
}


// fetch returns a promise to either resolve or reject.
// .then method once it is resolved to fire a function.
// .catch method to fire a callback function when there is an error.

// const key = 'JotnkNIEEblsw2luKMFt0dhFwQhnAvAT';

// const getWeather = async (id) => {
//     const base = 'http://dataservice.accuweather.com/currentconditions/v1/'
//     const query = `${id}?apikey=${key}&language=en-us&details=true`

//     const response = await fetch(base + query);
//     const data = await response.json();

//     // console.log(data[0]);
//     return data[0];

// };

// // getWeather(349727)

// const getForecast = async (id) => {
//     const base = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/'
//     const query = `${id}?apikey=${key}&language=en-us&details=true`

//     const response = await fetch(base + query);
//     const data = await response.json();

//     // console.log("forecast data", data.DailyForecasts);
//     return data.DailyForecasts;

// };

// getForecast('349727');

// const getCity = async (city) => {
//     const base = 'http://dataservice.accuweather.com/locations/v1/cities/search'
//     const query = `?apikey=${key}&q=${city}`;

//     const response = await fetch(base + query);
//     const data = await response.json();

//     // console.log(data[0]);
//     return data[0];
// }

