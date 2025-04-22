// Array to store weather data
let weatherData = [];

// Add City Weather
function addCityWeather() {
    const cityName = document.getElementById("city-name").value;
    const temperature = parseFloat(document.getElementById("temperature").value);
    const condition = document.getElementById("condition").value;

    if (!cityName || isNaN(temperature)) {
        alert("Please enter valid city weather details!");
        return;
    }

    weatherData.push({ cityName, temperature, condition });
    updateWeatherList();
}

// Find Hottest City
function findHottestCity() {
    return weatherData.reduce((hottest, city) => 
        city.temperature > hottest.temperature ? city : hottest, { temperature: -Infinity });
}

// Filter by Condition
function filterByCondition(condition) {
    return weatherData.filter(city => city.condition === condition);
}

// Update Weather List
function updateWeatherList() {
    const cityList = document.getElementById("city-list");
    const hottestCityDisplay = document.getElementById("hottest-city");

    cityList.innerHTML = "";

    weatherData.map(({ cityName, temperature, condition }) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>City: ${cityName}, Temp: ${temperature}°C, Condition: ${condition}</span>
        `;
        cityList.appendChild(listItem);
    });

    const hottestCity = findHottestCity();
    if (hottestCity.temperature !== -Infinity) {
        const { cityName, temperature } = hottestCity;
        hottestCityDisplay.textContent = `Hottest City: ${cityName} (${temperature}°C)`;
    } else {
        hottestCityDisplay.textContent = "";
    }
}

// Event Listener for Adding City Weather
document.getElementById("add-city-btn").addEventListener("click", addCityWeather);
