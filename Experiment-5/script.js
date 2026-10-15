const API_KEY = "YOUR_API_KEY";
const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const message = document.getElementById("message");
const result = document.getElementById("weatherResult");

form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (!city) {
        message.textContent = "Please enter a city name.";
        return;
    }
    if (API_KEY === "69f2292331d32d8232b3f7f34bbe5afa") {
        message.textContent = "Please add your OpenWeatherMap API key.";
        result.hidden = true;
        return;
    }
    message.textContent = "Loading weather data...";
    result.hidden = true;
    try {
        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(
                data.message || "Unable to fetch weather data."
            );
        }
        document.getElementById("cityName").textContent =
            `${data.name}, ${data.sys.country}`;

        document.getElementById("temperature").textContent =
            `${Math.round(data.main.temp)} °C`;

        document.getElementById("description").textContent =
            data.weather[0].description;

        document.getElementById("feelsLike").textContent =
            `${Math.round(data.main.feels_like)} °C`;

        document.getElementById("humidity").textContent =
            `${data.main.humidity}%`;

        document.getElementById("wind").textContent =
            `${data.wind.speed} m/s`;
        const icon = document.getElementById("weatherIcon");
        icon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        icon.alt = data.weather[0].description;

        message.textContent = "";
        result.hidden = false;
    } catch (error) {
        message.textContent =
            error.message === "city not found"
                ? "City not found. Please try another name."
                : `Error: ${error.message}`;
        result.hidden = true;
    }
});
