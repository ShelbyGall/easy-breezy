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



async function getWeather(coordinates) {

    let lat = coordinates.lat
    let lon = coordinates.lon
    let name = coordinates.name
    let state = coordinates.state
    try {
        const response = await fetch(
        `
        https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unitSelected}
        `)
        const weather = await response.json()

        console.log(weather)

        const temp = Math.ceil(weather.main.temp)
        currTemp.textContent = `${temp}°${abbrevUnit}\n`
        locationName.textContent = `${name}, ${state}`
        if (weather) {
            weatherImg.src = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`
        }
    } catch(error) {
        console.error("An error occurred:", error);
    }
}



async function getCoord(location) {

    const response = await fetch(
`
http://api.openweathermap.org/geo/1.0/direct?q=${location},&limit=10&appid=${apiKey}
`)

    const results = await response.json()
    
    console.log(results)
    
    for(let currResult of results) {

        let li = document.createElement("li")
        li.textContent = `${currResult.name}, ${currResult.state} - Lat: ${currResult.lat} Lon: ${currResult.lon}`
        li.data = {
            name: currResult.name,
            state: currResult.state,
            lat: currResult.lat,
            lon: currResult.lon
        }

        weatherResultList.appendChild(li)

        li.addEventListener("click", function() {
            getWeather(li.data)
        })
    }
}


buttonEl.addEventListener("click", async function() {
    weatherResultList.innerHTML = ""
    try {
        await getCoord(locationInput.value);
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

