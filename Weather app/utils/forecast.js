const request = require("postman-request");
const apiKey1 = "7c65b08eca2f486abdd45926242002";

function getWeather(lat, long,callback) {
  const api1 = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey1}&q=${lat},${long}&days=1&aqi=no&alerts=no`;

  request({ url: api1, json: true }, (error, {body}) => {
    // console.log(response.body);
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
