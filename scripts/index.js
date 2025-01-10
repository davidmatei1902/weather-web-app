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
  const loaderContainer = document.querySelector(".loader-container");

  const cityImage = document.querySelector(".city-image");
  const cityImageContainer = document.querySelector(".city-image-container");
  const nextDaysContentContainer = document.querySelector(".next-days-content");
  const nextDaysContainer = document.querySelector(".next-days-container");

  let isLoadedOnce_loadingBar = false;
  let isLoadedOnce_nextDaysForecast = false;

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
  /// USE OF https://www.pexels.com/api/documentation /
  /////////////////////////////////////////////////////

  const backgroundImageApiKey =
    "GUkWZWF1frwQzMnK88pzh39RW54bGNx24fqUeSnpZ3y5QJRY6bz8hHIX";
  // const cityNameForApi = "Bucharest";
  const backgroundImageApiUrl = "https://api.pexels.com/v1/search";

  async function checkBackgroundImage(cityNameForApi) {
    const pagesToGo = 1;
    const perPage = 15;

    const response = await fetch(
      `${backgroundImageApiUrl}?query=${cityNameForApi}&page=${pagesToGo}&per_page=${perPage}`,
      {
        headers: {
          Authorization: backgroundImageApiKey,
        },
      }
    );

    const data = await response.json();
    //console.log(data);

    let cityPhoto = data.photos[0].src.landscape; // first photo from get

    cityImage.src = cityPhoto;
  }
  /////////////////////////////////////////////////////

  /////////////////////////////////////////////////////
  /// USE OF https://home.openweathermap.org/ /////////
  /////////////////////////////////////////////////////

  const apiKey = "0431886bf0f964c4d2e53d9a82eeb77d";
  //const cityName = "Bucharest";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

  async function checkWeather(cityName) {
    const response = await fetch(
      apiUrl + `&q=${cityName}` + `&APPID=${apiKey}`
    );

    var data = await response.json();

    //console.log(data);

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
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "../assets/images/snow.png";
    }

    console.log(data);

    let lon = data.coord.lon;
    let lat = data.coord.lat;
    console.log(lon);
    console.log(lat);

    findFiveDayWeather(lat, lon);
  }
  /////////////////////////////////////////////////////

  /////////////////////////////////////////////////////
  /// USE OF 5dayCall                                //
  /////////////////////////////////////////////////////

  const fiveDayWeather = "https://api.openweathermap.org/data/2.5/forecast";

  async function findFiveDayWeather(lat, lon) {
    const apiKey = "0431886bf0f964c4d2e53d9a82eeb77d";

    const url = `${fiveDayWeather}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    let maxNumber = 5;
    for (let i = 0; i < maxNumber; i++) {
      let anotherDayTemp = Math.round(data.list[i].main.temp); // actual temp on that day
      let typeOfWeather = data.list[i].weather[0].main; // cloudy, snowy, etc

      let newDiv = document.createElement("div");
      //newDiv.textContent = `div${i} - Temp: ${anotherDayTemp}°C, Weather: ${typeOfWeather}`;
      newDiv.classList.add(`item-${i}`);

      let newImage = document.createElement("img");
      newImage.classList.add(`next-days-image`);

      if (typeOfWeather == "Clouds") {
        newImage.src = "../assets/images/clouds.png";
      } else if (typeOfWeather == "Clear") {
        newImage.src = "../assets/images/clear.png";
      } else if (typeOfWeather == "Rain") {
        newImage.src = "../assets/images/rain.png";
      } else if (typeOfWeather == "Drizzle") {
        newImage.src = "../assets/images/drizzle.png";
      } else if (typeOfWeather == "Mist") {
        newImage.src = "../assets/images/mist.png";
      } else if (typeOfWeather == "Snow") {
        newImage.src = "../assets/images/snow.png";
      }

      let newH1 = document.createElement("h1");
      newH1.classList.add("temp");
      newH1.textContent = `${anotherDayTemp}` + "°C";

      newDiv.appendChild(newImage);
      newDiv.appendChild(newH1);

      nextDaysContentContainer.append(newDiv);
    }
  }

  /////////////////////////////////////////////////////

  async function openWeatherTab() {
    document.querySelector(".weather-container").style.display = "block";
    cityImage.style.display = "block";
    cityImageContainer.style.display = "block";
    nextDaysContainer.style.display = "block";
  }

  async function closeWeatherTab() {
    document.querySelector(".weather-container").style.display = "none";
    cityImage.style.display = "none";
    cityImageContainer.style.display = "none";
    nextDaysContainer.style.display = "none";

    inputBox.value = ""; // reset input
  }

  async function loadingWeatherTab(ms) {
    loaderContainer.style.display = "block";
    await new Promise((resolve) => setTimeout(resolve, ms));
    await new Promise((resolve) => setTimeout(resolve, ms));
    loaderContainer.style.display = "none";
  }

  async function addLoadingTime(ms) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function removeNextDaysPrognosis() {
    for (let i = 0; i < 5; i++) {
      let removableDiv = document.querySelector(`.item-${i}`);
      removableDiv.remove();
    }
  }

  searchButton.addEventListener("click", () => {
    if (isLoadedOnce_nextDaysForecast) {
      alert("You must clear the current forecast before searching again.");
      return;
    }

    if (!isLoadedOnce_loadingBar) {
      isLoadedOnce_loadingBar = true;
      loadingWeatherTab(50);
      addLoadingTime(50);
    }
    openWeatherTab();
    checkWeather(inputBox.value);
    checkBackgroundImage(inputBox.value);

    isLoadedOnce_nextDaysForecast = true;
  });

  closeButton.addEventListener("click", () => {
    closeWeatherTab();
    removeNextDaysPrognosis();

    isLoadedOnce_loadingBar = false;
    isLoadedOnce_nextDaysForecast = false;
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
