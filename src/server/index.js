import express from 'express'
import mockAPIResponse from './mockAPI.js'
import fetch from 'node-fetch'
import { config } from 'dotenv'
import { urlencoded, json } from "body-parser"
import cors from "cors"

const app = express()
// Here we are configuring express to use body-parser as middle-ware.
app.use(urlencoded({ extended: false }));
app.use(json());

// Cors for cross origin allowance
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

config()

app.use(express.static('dist'))

console.log(__dirname)

let projectData = {temp: '', weatherConds: ''}

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

const WEATHER_BIT_API_KEY = process.env.WEATHER_BIT_API_KEY
const GEONAMES_USERID = process.env.GEONAMES_USERID
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY

// coords api
function getGeonamesUrl(postalcode, country) {
    return `http://api.geonames.org/postalCodeSearchJSON?postalcode=${postalcode}&country=${country}&username=${GEONAMES_USERID}`
}

// send postalcode & country to geonames, send coords in response
app.post('/getCoords', async (req, res) => {
    try {
        const url = getGeonamesUrl(req.body.postalcode, req.body.country)
        console.log(`Accessing ${url}...`)
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
        //const textdata = await response.text()
        //console.log(`geonames text: ${textdata}`)
        const data = await response.json()
        res.send(data)
    }
    catch(error) {
        console.log("error", error)
    }
})

// weather api
function getWeatherBitUrl(current, lat, lon) {
    return `http://api.weatherbit.io/v2.0/${current ? 'current?' : 'forecast/daily?'}lang=en&lat=${lat}&lon=${lon}&key=${WEATHER_BIT_API_KEY}`
}

// send coords to weatherbit, send weather in response
app.post('/getWeather', async (req, res) => {
    try {
        const url = getWeatherBitUrl(
            req.body.current, 
            req.body.lat, 
            req.body.lon)
        console.log(`Accessing ${url}...`)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        res.send(data)
        const numDaysOut            = req.body.numDaysOut
        projectData['temp']         = data.data[numDaysOut].temp
        projectData['weatherConds'] = data.data[numDaysOut].weather.description
    }
    catch(error) {
        console.log("error", error)
    }
})

// image api
function getPixabayUrl(place, keyword) {
    return `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${place}+${keyword}+travel&image_type=photo`
}

// send location to pixabay, send image in response
app.post('/getImage', async (req, res) => {
    try {
        const url = getPixabayUrl(req.body.place, req.body.keyword)
        console.log(`Accessing ${url}...`)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        res.send(data)
    }
    catch(error) {
        console.log("error", error)
    }
    
})


