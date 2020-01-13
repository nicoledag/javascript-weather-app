//fetch returns a promise to either resolve or reject.
//.then method once it is resolved to fire a function.
//.catch method to fire a callback function when there is an error.

const key = '0h9RQLsg06jDPMnH9HFBY9eAHZACyIZA';

const getWeather = async (id) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/'
    const query = `${id}?apikey=${key}&language=en-us`

    const response = await fetch(base + query);
    const data = await response.json();

    // console.log(data[0]);
    return data[0];

};

// getWeather('349727')


const getCity = async (city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search'
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    // console.log(data[0]);
    return data[0];
}

// getCity('new york').then(data => {
//     // console.log(data);
//     return getWeather(data.Key);
// }).then(data => {
//     console.log(data);
// }).catch(err => console.log(err));
