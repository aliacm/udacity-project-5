import fetch from "node-fetch"

async function handleSubmit(event) {
    console.log("::: Form Submitted :::")
    event.preventDefault()
    const inputCity       = document.getElementById('inputCity').value
    const inputPostalCode = document.getElementById('inputPostalCode').value
    const inputCountry    = document.getElementById('inputCountry').value
    const inputDate       = document.getElementById('inputDate').value
    // ----------- GEONAMES -------------
    // Post the text and type to /getCoords, and get back lat and lon.
    const response1 = await fetch('/getCoords', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({postalcode: inputPostalCode, country: inputCountry})
    })
    const dataCoords = await response1.json()
    const region     = dataCoords.postalCodes[0].adminName1
    const lat        = dataCoords.postalCodes[0].lat
    const lon        = dataCoords.postalCodes[0].lng
    // Determine whether we need current or future weather data
    const numDaysOut = Main.getNumDaysOut(inputDate)
    let current = false
    if (numDaysOut == 0) {current = true}
    console.log(`numDaysOut: ${numDaysOut}, current: ${current}, lat: ${lat}, lon: ${lon}, numDaysOut: ${numDaysOut}`)
    // ----------- WEATHERBIT -------------
    // Post numDaysOut, current, lat, and lon to /getWeather, and get back weather.
    const response2 = await fetch('/getWeather', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({current: current, lat: lat, lon: lon, numDaysOut: numDaysOut})
    })
    const dataWeather    = await response2.json()
    const tempCelsius    = dataWeather.data[numDaysOut].temp
    const description    = dataWeather.data[numDaysOut].weather.description
    const tempFahrenheit = Math.round(tempCelsius*(9/5)+32)
    document.getElementById("weather").innerHTML = `In ${numDaysOut} day(s), the temperature will be ${tempFahrenheit}\xB0F with ${description.toLowerCase()}`
    // ----------- PIXABAY -------------
    const response3 = await fetch('/getImage', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({place: inputCity, keyword:'city'})
    })
    let image = await response3.json()
    // If no image of city, fetch image of region
    if (image.total == 0) {
        console.log(`Image of ${inputCity} not found, searching for image of ${region}`)
        const response4 = await fetch('/getImage', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({place: region, keyword:''})
        })
        image = await response4.json()
    }
    // If still no image, give up
    if (image.total == 0) {
        console.log(`No images of ${inputCountry} or ${region} were found.`)
        return
    }
    const imageUrl = image.hits[0].largeImageURL
    document.getElementById("image").src = imageUrl
}
export { handleSubmit }
