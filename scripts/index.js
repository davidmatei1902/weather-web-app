// Register a listener for the DOMContentLoaded event. This is triggered when the HTML is loaded and the DOM is constructed.
// We are doing this because the script is loaded in the head of the document, so the DOM is not yet constructed when the script is executed.
document.addEventListener("DOMContentLoaded", (_event) => {
  alert("After DOM has loaded");
  // todo: Add code here that updates the HTML, registers event listeners, calls HTTP endpoints, etc.

  let availableKeywords = [
    "phrase 1",
    "city1",
    "what year is now?",
    "what month is special?",
    "city3",
    "city4",
    "city5",
  ];

  const resultBox = document.querySelector(".result-box");
  const inputBox = document.getElementById("input-box");

  const searchButton = document.querySelector(".search-button");
  const weatherIcon = document.querySelector(".weather-icon");
  const closeButton = document.querySelector(".close-button");

  inputBox.onkeyup = function () {
    let result = [];
    let input = inputBox.value;
    if (input.length) {
      result = availableKeywords.filter((keyword) => {
        return keyword.toLowerCase().includes(input.toLowerCase());
      });
      //console.log(result);
    }

    //display(result);
  };

  /////////////////////////////////////////////////////
  /// USE OF https://home.openweathermap.org/ /////////
  /////////////////////////////////////////////////////

  const apiKey = "09871ea9073f00fec9801644374f12ac";
  const cityName = "Bucharest";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

  async function checkWeather(cityName) {
    const response = await fetch(
      apiUrl + `&q=${cityName}` + `&APPID=${apiKey}`
    );

    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".min-temp").innerHTML =
      "Min: " + data.main.temp_min + "°C";
    document.querySelector(".max-temp").innerHTML =
      "Max: " + data.main.temp_max + "°C";
    document.querySelector(".humidity-val").innerHTML =
      data.main.humidity + "%";
    document.querySelector(".wind-speed-val").innerHTML =
      data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "../assets/images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "../assets/images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "../assets/images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "../assets/images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "../assets/images/mist.png";
    }

    console.log(data);
  }

  async function openWeatherTab() {
    document.querySelector(".weather-container").style.display = "block";
  }

  async function closeWeatherTab() {
    document.querySelector(".weather-container").style.display = "none";
    inputBox.value = "";
  }

  searchButton.addEventListener("click", () => {
    openWeatherTab();
    checkWeather(inputBox.value);
  });

  closeButton.addEventListener("click", () => {
    closeWeatherTab();
  });

  function display(result) {
    const content = result.map((list) => {
      return "<li>" + list + "</li>";
    });

    resultBox.innerHTML = "<ul>" + content.join("") + "</ul>";
  }

  resultBox.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      inputBox.value = event.target.innerHTML;
    }
  });
});
