// Geting the DOM elements
const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('city');
const weatherDisplay = document.getElementById('weather');
const errorDisplay = document.getElementById('error');

// Listen for form submission
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form from refreshing page
  const city = cityInput.value.trim(); // Removes the whitespace

  // Validating input
  if (city === '') {
    displayError("Please enter a city name.");
    return;
  }

  fetchWeather(city);
});

// Async function to fetch weather data
async function fetchWeather(city) {
  // Clearing previous results
  weatherDisplay.textContent = '';
  errorDisplay.textContent = '';

  const apiKey = 'YOUR_API_KEY'; // <-- Replace this with your OpenWeather API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    // Handling invalid response
    if (!response.ok) {
      throw new Error("City not found or API error.");
    }

    const data = await response.json();

    // Extracting relevant info
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const cityName = data.name;

    // Displaying weather data
    weatherDisplay.innerHTML = `
      <strong>Weather in ${cityName}:</strong><br>
      Temperature: ${temp}°C<br>
      Description: ${description}
    `;
  } catch (error) {
    displayError("Failed to fetch weather. " + error.message);
  }
}

// Function to display errors
function displayError(message) {
  errorDisplay.textContent = message;
}
