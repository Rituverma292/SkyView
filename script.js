const apiKey = "bdb1c92d8281e8d517289b92470da443";

// Search by city
function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (city === "") return;

    showLoading();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(() => {
            showError("Something went wrong ❌");
        });
}

// Location weather
function getLocationWeather() {
    if (!navigator.geolocation) {
        showError("Geolocation not supported ❌");
        return;
    }

    showLoading();

    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                displayWeather(data);
            });
    },
    () => {
        showError("Location access denied ❌");
    });
}

// Display weather
function displayWeather(data) {
    const loading = document.getElementById("loading");
    const weatherInfo = document.getElementById("weatherInfo");

    loading.classList.add("hidden");

    if (data.cod !== 200) {
        showError("City not found ❌");
        return;
    }

    document.getElementById("city").innerText = data.name;
    document.getElementById("temp").innerText = Math.round(data.main.temp) + "°C";
    document.getElementById("condition").innerText = data.weather[0].main;
    document.getElementById("humidity").innerText = data.main.humidity;
    document.getElementById("wind").innerText = data.wind.speed;

    document.getElementById("icon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const now = new Date();
    document.getElementById("date").innerText = now.toDateString();

    weatherInfo.classList.remove("hidden");
}

// Loading
function showLoading() {
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("weatherInfo").classList.add("hidden");
}

// Error
function showError(msg) {
    const loading = document.getElementById("loading");
    loading.classList.add("hidden");
    alert(msg);
}

// Emoji based on weather
let emoji = "☁️";

if (data.weather[0].main === "Clear") emoji = "☀️";
else if (data.weather[0].main === "Rain") emoji = "🌧️";
else if (data.weather[0].main === "Clouds") emoji = "☁️";
else if (data.weather[0].main === "Haze") emoji = "🌫️";

document.getElementById("condition").innerText = emoji + " " + data.weather[0].main;