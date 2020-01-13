const cityForm = document.querySelector('form');

const updateCity  = async (city) => {
    // console.log(city);

    const cityDetails = await getCity(city);
    // console.log(cityDetails);
    const weather = await getWeather(cityDetails.Key)
    // console.log(weather);

    return {
       cityDetails: cityDetails,
       weather: weather 
    };
};


cityForm.addEventListener('submit', e => {
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with new city
    updateCity(city)
    .then(data => console.log(data))
    .catch(err => console.log(err));
});