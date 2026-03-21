const apiKey = "3cc618cadc2bb04e2e31ce9bc3a4f421"; 
const city = "Akwanga"; 

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

async function getWeather() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Temperature
    document.getElementById("current-temp").textContent = `${Math.round(data.main.temp)}°C`;

    // Description
    document.getElementById("description").textContent = data.weather[0].description;

    // High & Low
    document.getElementById("high").textContent = `${Math.round(data.main.temp_max)}°C`;
    document.getElementById("low").textContent = `${Math.round(data.main.temp_min)}°C`;

    // Humidity
    document.getElementById("humidity").textContent = `${data.main.humidity}%`;

    // Sunrise & Sunset (convert from UNIX timestamp)
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);

    document.getElementById("sunrise").textContent = sunrise.toLocaleTimeString();
    document.getElementById("sunset").textContent = sunset.toLocaleTimeString();

    // Weather Icon
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const iconElement = document.getElementById("weather-icon");
    iconElement.src = iconUrl;
    iconElement.alt = data.weather[0].description;

  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}


getWeather();


async function getCoordinates() {
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  const response = await fetch(geoUrl);
  const data = await response.json();
  return {
    lat: data[0].lat,
    lon: data[0].lon
  };
}


async function getForecast() {
  try {
    const { lat, lon } = await getCoordinates();

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const response = await fetch(forecastUrl);
    const data = await response.json();


    const dailyForecasts = data.list.filter(item =>
      item.dt_txt.includes("12:00:00")
    ).slice(0, 3); 

    
    let output = "";

    dailyForecasts.forEach(day => {
      const date = new Date(day.dt_txt);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

      const temp = Math.round(day.main.temp);
      const desc = day.weather[0].description;

      output += `
        <strong>${dayName}</strong>: ${temp}°C - ${desc} <br>
      `;
    });

    document.getElementById("forecast").innerHTML = output;

  } catch (error) {
    console.error("Error fetching forecast:", error);
    document.getElementById("forecast").textContent = "Unable to load forecast.";
  }
}


getForecast();



// JavaScript for Hamburger
const hamburger = document.querySelector("#hamburger");
const nav = document.querySelector(".navigation");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("open");
  hamburger.textContent = nav.classList.contains("open") ? "✖" : "☰";
});