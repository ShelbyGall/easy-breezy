const apiKey = "d3af1e291a1a85b8ae498f77c27c2d94"

let unitSelected = "" 
let abbrevUnit = "K"

const buttonEl = document.getElementById("search-button")
const unitsList = document.getElementById("units-list")
const unitSelEl = document.getElementById("unit-selector")
const currTemp = document.getElementById("current-temp")
const locationInput = document.getElementById("search-input")
const weatherImg = document.getElementById("weather-img")
const locationName = document.getElementById("location-name")
const weatherResultList = document.getElementById("weather-tiles-result-list")
const bodyEl = document.getElementById("body-el")
const infoImg = document.getElementById("info-img")
const windSpeed = document.getElementById("wind-speed")
const humidity = document.getElementById("Humidity")

document.getElementById("kelvin").addEventListener("click", function() {
    unitSelected = ""
    abbrevUnit = "K"
}) 

document.getElementById("imperial").addEventListener("click", function() {
    unitSelected = "imperial"
    abbrevUnit = "F"
})

document.getElementById("metric").addEventListener("click", function() {
    unitSelected = "metric"
    abbrevUnit = "C"
})


buttonEl.addEventListener("click", async function() {
    document.getElementById("weather-tiles-container").style.display = "block"
    weatherResultList.innerHTML = ""
    try {
        await getCoord(locationInput.value);
    } catch (error) {
        console.error("An error occurred:", error);
    }
});


async function getWeather(coordinates) {

    let lat = coordinates.lat
    let lon = coordinates.lon
    let name = coordinates.name
    let state = coordinates.state
    let country = coordinates.country
    try {
        const response = await fetch(
        `
        https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unitSelected}
        `)
        const weather = await response.json()

        console.log(weather)

        const temp = Math.ceil(weather.main.temp)
        currTemp.textContent = `${temp}°${abbrevUnit}\n`
        if (state === undefined) {
            locationName.textContent = `${name}, ${country}`
        } else {
            locationName.textContent = `${name}, ${state}`
        }
        if (weather) {
            weatherImg.src = `assets/${weather.weather[0].icon}.png`

            weatherImg.title = `Weather Type: ${weather.weather[0].description} \nMax Temp: ${weather.main.temp_max}°${abbrevUnit} \nMin Temp: ${weather.main.temp_min}°${abbrevUnit}`
            if (weather.weather[0].icon[2] == "n") {
                document.documentElement.style.background = "linear-gradient(to bottom right, #3E517A, #B08EA2)"
                document.documentElement.style.backgroundAttachment = "fixed"
                
            } else {
                document.documentElement.style.background = "linear-gradient(to bottom right, #A8E0FF, #FFE9A8)"
                document.documentElement.style.backgroundAttachment = "fixed"
                
            }

            document.getElementById("bottom-page").style.display = "flex"
            humidity.textContent = `${weather.main.humidity} %`

            if(abbrevUnit === "F") {
                windSpeed.textContent = `${Math.ceil(weather.wind.speed)} mph`
            } else {
                windSpeed.textContent = `${Math.ceil(weather.wind.speed)} kph`
            }
        }
        //alert("hover over weather icon for more information!")

    } catch(error) {
        console.error("An error occurred:", error);
    }
}



async function getCoord(location) {

    const response = await fetch(
`
https://api.openweathermap.org/geo/1.0/direct?q=${location},&limit=10&appid=${apiKey}
`)

    const results = await response.json()

    console.log(results)
    
    for(let currResult of results) {

        let para = document.createElement("p")
        if (currResult.state === undefined) {
            para.textContent = `${currResult.name}, ${currResult.country} - Lat: ${currResult.lat} Lon: ${currResult.lon}`
        } else {
            para.textContent = `${currResult.name}, ${currResult.state} - Lat: ${currResult.lat} Lon: ${currResult.lon}`
        }
            para.data = {
            name: currResult.name,
            state: currResult.state,
            country: currResult.country,
            lat: currResult.lat,
            lon: currResult.lon
        }

        weatherResultList.appendChild(para)

        para.addEventListener("click", function() {
            getWeather(para.data)
            document.getElementById("weather-tiles-container").style.display = "none"
        })
    }
}




