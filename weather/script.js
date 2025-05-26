document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'f8e12c150b26509efc1cad79f33fc47e';
    const fetchWeatherButton = document.getElementById('fetchWeather');
    const locationSelect = document.getElementById('locationSelect');
    const customLocationInput = document.getElementById('customLocation');
    const weatherInfoDiv = document.getElementById('weatherInfo');
    const weatherImageDiv = document.getElementById('weatherImage');
    const weatherDetailsDiv = document.getElementById('weatherDetails');
    const locationElem = document.getElementById('location');
    const temperatureElem = document.getElementById('temperature');
    const conditionsElem = document.getElementById('conditions');
    const humidityElem = document.getElementById('humidity');

    locationSelect.addEventListener('change', () => {
        if (locationSelect.value === 'Other') {
            customLocationInput.style.display = 'inline';
        } else {
            customLocationInput.style.display = 'none';
        }
    });

    fetchWeatherButton.addEventListener('click', () => {
        let location = locationSelect.value;
        if (location === 'Other') {
            location = customLocationInput.value;
        }

        if (location) {
            fetchWeather(location);
        } else {
            alert('Please select or enter a location');
        }
    });

    const fetchWeather = (location) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    displayError('Location not found');
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                displayError('Error fetching weather data');
            });
    };

    const displayWeather = (data) => {
        weatherInfoDiv.style.display = 'block';
        locationElem.textContent = `Location: ${data.name}, ${data.sys.country}`;
        temperatureElem.textContent = `Temperature: ${data.main.temp} °C`;
        conditionsElem.textContent = `Conditions: ${data.weather[0].description}`;
        humidityElem.textContent = `Humidity: ${data.main.humidity}%`;

        const weatherImageUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        weatherImageDiv.innerHTML = `<img src="${weatherImageUrl}" alt="Weather Icon" style="width: 100%; max-width: 300px;">`;

        changeBackgroundColor(data.weather[0].main);
    };

    const displayError = (message) => {
        weatherInfoDiv.style.display = 'block';
        weatherDetailsDiv.innerHTML = `<p>${message}</p>`;
    };

    const changeBackgroundColor = (weatherCondition) => {
        let color;
        switch (weatherCondition.toLowerCase()) {
            case 'clear':
                color = '#FFEB3B';
                break;
            case 'clouds':
                color = 'grey';
                break;
            case 'rain':
                color = 'skyblue';
                break;
            case 'snow':
                color = 'lightblue';
                break;
            case 'thunderstorm':
                color = 'darkgrey';
                break;
            case 'drizzle':
                color = 'lightgrey';
                break;
            case 'mist':
            case 'smoke':
            case 'haze':
            case 'dust':
            case 'fog':
            case 'sand':
            case 'ash':
            case 'squall':
            case 'tornado':
                color = 'lightgrey';
                break;
            default:
                color = 'white';
                break;
        }
        document.body.style.backgroundColor = color;
    };
});
