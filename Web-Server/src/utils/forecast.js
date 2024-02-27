const request = require("postman-request");
const key=process.env.APIKEY1

function getWeather(lat,long,callback) {
  const api1 = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${lat},${long}&days=1&aqi=no&alerts=no`;

  request({ url: api1, json: true }, (error, {body}) => {
    if (error) {
      console.log("Unable to fetch weather services for you");
    } else if (body.error) {
      console.log("Unable to fetch location");
    } else {
      callback(error,{
        data:body
      })
    }
  });
}

module.exports = getWeather;
