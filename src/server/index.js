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

config()

app.use(express.static('dist'))

console.log(__dirname)

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

const API_KEY = process.env.API_KEY
function getUrl(inputText, inputType) {
    return `https://api.meaningcloud.com/sentiment-2.1?${inputType}=${inputText}&lang=en&key=${API_KEY}`
}

app.post('/getfeels', async (req, res) => {
    try {
        const url = getUrl(req.body.feels, req.body.type)
        console.log(`Accessing ${url}...`)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
        const data = await response.json()
        res.send(data)
    }
    catch(error) {
        console.log("error", error)
    }
})



