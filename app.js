let weather = {
    apiKey: "0791a8e495520823059f1286a71d2dac",
    fetchWeather: async function (city) {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
        );
        const data = await response.json();

        if (!response.ok) {
            alert("No weather found");
            throw new Error("No weather found.");
        } else {
            this.displayWeather(data);
        }
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = `Weather in ${name}`;
        document.querySelector(
            ".icon"
        ).src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = `${temp}°C`;
        document.querySelector(
            ".humidity"
        ).innerText = `Humidity: ${humidity}%`;
        document.querySelector(".wind-speed").innerText = `Wind: ${speed} km/h`;
        document.querySelector(".weather").classList.remove("loading");

        document.body.style.backgroundImage =
            'url("https://source.unsplash.com/1600x1900/?' + name + '");';
    },

    search: function () {
        const city = document.querySelector(".search-bar").value;
        this.fetchWeather(city);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("Rio de Janeiro");
