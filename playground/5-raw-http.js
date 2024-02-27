const https = require('https')
const apiKey1 = "7c65b08eca2f486abdd45926242002";
const api1 = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey1}&q=Canada&days=1&aqi=no&alerts=no`;

const request = https.request(api1, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })

})

request.on('error', (error) => {
    console.log('An error', error)
})

request.end()