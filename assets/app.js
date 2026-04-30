const weatherText = document.getElementById('weather-text');
const weatherEmoji = document.getElementById('weather-emoji');

function getWeatherPhrase(code) {
  if (code === 0) return 'sunny skies';
  if (code === 1 || code === 2 || code === 3) return 'partly sunny weather';
  if (code === 45 || code === 48) return 'foggy conditions';
  if (code >= 51 && code <= 55) return 'light drizzle';
  if (code >= 61 && code <= 67) return 'rainy weather';
  if (code >= 71 && code <= 77) return 'snowy flakes';
  if (code >= 80 && code <= 82) return 'showers';
  if (code >= 95 && code <= 99) return 'thunderstorms';
  return 'a cool moment in Brooklyn';
}

function getWeatherEmoji(code) {
  if (code === 0) return '☀️';
  if (code === 1 || code === 2 || code === 3) return '⛅';
  if (code === 45 || code === 48) return '🌫️';
  if (code >= 51 && code <= 55) return '💧';
  if (code >= 61 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '❄️';
  if (code >= 80 && code <= 82) return '🌦️';
  if (code >= 95 && code <= 99) return '⛈️';
  return '🌆';
}

function formatTemperature(celsius) {
  const fahrenheit = Math.round((celsius * 9) / 5 + 32);
  return `${fahrenheit}°F`;
}

async function loadBrooklynWeather() {
  try {
    const latitude = 40.67744;
    const longitude = -73.967674;
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();
    const current = weatherData.current_weather;

    if (!current) {
      weatherText.textContent = 'Current weather could not be loaded.';
      return;
    }

    const phrase = getWeatherPhrase(current.weathercode);
    const emoji = getWeatherEmoji(current.weathercode);
    const temp = formatTemperature(current.temperature);
    weatherEmoji.textContent = emoji;
    weatherText.innerHTML = `<span class="weather-phrase">${phrase} &</span><span class="weather-temp">${temp}</span>`;
  } catch (error) {
    weatherText.textContent = 'Having trouble fetching the weather right now.';
  }
}

function spawnWeatherDrops(widget, emoji) {
  const dropCount = 14;
  for (let i = 0; i < dropCount; i += 1) {
    const drop = document.createElement('span');
    drop.className = 'weather-drop';
    drop.textContent = emoji;
    const size = 16 + Math.round(Math.random() * 16);
    const offset = Math.random() * 100;
    const delay = Math.random() * 0.4;
    drop.style.left = `${offset}%`;
    drop.style.fontSize = `${size}px`;
    drop.style.animationDelay = `${delay}s`;
    widget.appendChild(drop);
    window.setTimeout(() => {
      if (drop.parentElement) drop.parentElement.removeChild(drop);
    }, 3200);
  }
}

const weatherWidget = document.querySelector('.weather-widget');
weatherWidget.addEventListener('mouseenter', () => {
  const emoji = weatherEmoji.textContent.trim() || '☀️';
  spawnWeatherDrops(weatherWidget, emoji);
});

loadBrooklynWeather();
