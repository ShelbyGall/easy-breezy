const apiKey = "d3af1e291a1a85b8ae498f77c27c2d94"

let unitSelected = "" 
let abbrevUnit = ""

const buttonEl = document.getElementById("search-button")
const unitsList = document.getElementById("units-list")
const unitSelEl = document.getElementById("unit-selector")
const currTemp = document.getElementById("current-temp")

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



async function getWeather(lat, lon, unit) {
    const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`
    )
    const weather = await response.json()
    console.log(weather)
    const temp = Math.ceil(weather.main.temp)
    currTemp.textContent = `${temp}° ${abbrevUnit}`
}

buttonEl.addEventListener("click", function() {
    let lat = 34.686785
    let lon = -118.154163
    getWeather(lat, lon, unitSelected)
})
