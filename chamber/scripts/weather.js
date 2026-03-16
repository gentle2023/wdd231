const apiKey = '3cc618cadc2bb04e2e31ce9bc3a4f421'; 
const lat = '8.91667'; 
const lon = '8.38333';

// metric = Celsius
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const membersUrl = 'data/members.json';


// --- WEATHER FUNCTIONALITY ---
async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();
        
        // Current Weather (first item in list)
        const current = data.list[0];
const weatherContainer = document.getElementById('weather-info');

// Convert sunrise & sunset timestamps
const sunrise = new Date(data.city.sunrise * 1000)
  .toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

const sunset = new Date(data.city.sunset * 1000)
  .toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

weatherContainer.innerHTML = `
<div class="weather-layout">

<img src="https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png" alt="weather icon">

<div class="weather-details">
<p class="temp">${Math.round(current.main.temp)}°C</p>
<p>${current.weather[0].description}</p>
<p>High: ${Math.round(current.main.temp_max)}°C</p>
<p>Low: ${Math.round(current.main.temp_min)}°C</p>
<p>Humidity: ${current.main.humidity}%</p>
<p>Sunrise: ${sunrise}</p>
<p>Sunset: ${sunset}</p>
</div>
</div>
`;

        // 3-Day Forecast (Extracting mid-day temps for next 3 days)
        const forecastContainer = document.getElementById('forecast-info');

        // Clear previous forecast
        forecastContainer.innerHTML = "";

        const forecastDays = data.list
            .filter(item => item.dt_txt.includes("12:00:00"))
            .slice(0, 3);
        
        forecastDays.forEach(day => {
            const date = new Date(day.dt * 1000)
                .toLocaleDateString('en-US', { weekday: 'long' });

            forecastContainer.innerHTML += `
                <p>${date}: <strong>${Math.round(day.main.temp)}°C</strong></p>
            `;
        });

    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}


// --- SPOTLIGHT FUNCTIONALITY ---
async function fetchSpotlights() {
    try {
        const response = await fetch(membersUrl);
        const members = await response.json();

        // Filter: Gold (3) and Silver (2) only
        const eligibleMembers = members.filter(m => m.membershipLevel >= 2);

        // Shuffle and pick 3
        const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
        const spotlights = shuffled.slice(0, 3);

        const container = document.getElementById('spotlight-container');
        container.innerHTML = "";

        spotlights.forEach(m => {
            const level = m.membershipLevel === 3 ? "Gold" : "Silver";

            container.innerHTML += `
                <div class="spotlight-card">
                    <h4>${m.name}</h4>
                    <p class="tagline">${level} Partner</p>
                    <hr>

                    <div class="card-body">
                        <img src="${m.image}" alt="${m.name} Logo">

                        <div class="contact-info">
                            <p>info@${m.name.toLowerCase().replace(/\s/g, '')}.com</p>
                            <p>${m.phone}</p>
                            <p>
                                <a href="${m.website}" target="_blank">
                                    ${m.website.replace('https://', '')}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error loading spotlights:", error);
    }
}


// --- INITIALIZE ---
document.addEventListener('DOMContentLoaded', () => {
    fetchWeather();
    fetchSpotlights();
});

// JavaScript for Hamburger
const hamburger = document.querySelector("#hamburger");
const nav = document.querySelector(".navigation");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("open");
  hamburger.textContent = nav.classList.contains("open") ? "✖" : "☰";
});