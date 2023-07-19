const apiKey = "d3af1e291a1a85b8ae498f77c27c2d94"

let unitSelected = "" 

const buttonEl = document.getElementById("search-button")
const unitsList = document.getElementById("units-list")
const unitSelEl = document.getElementById("unit-selector")

document.getElementById("kelvin").addEventListener("click", function() {
    unitSelected = ""
}) 

document.getElementById("imperial").addEventListener("click", function() {
    unitSelected = "imperial"
})

document.getElementById("metric").addEventListener("click", function() {
    unitSelected = "metric"
})



async function getWeather(lat, lon, unit) {
    const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`
    )
    const weather = await response.json()
    console.log(weather)
    const temp = weather.main.temp
    console.log(temp)
}

buttonEl.addEventListener("click", function() {
    let lat = 34.686785
    let lon = -118.154163
    getWeather(lat, lon, unitSelected)
})
