const getCoordinates = require("./utils/geoCode");
const getWeather = require("./utils/forecast");
const location = process.argv[2];

getCoordinates(location, (error, {latitude,longitude}) => {
  if (error) { 
    return console.log("error");
  }
  getWeather(latitude, longitude, (error,{data}) => {
    if (error) {
      return console.log("error");
    } else {
      console.log(
        `The location is ${data.location.name} , ${data.location.region} , ${data.location.country}`
      );
      //Challange
      console.log(
        `It is currently ${data.current.temp_c} degrees and precipitation is ${data.forecast.forecastday[0].day.totalprecip_mm} mm`
      );

      //Challange
      console.log(
        `It is currently ${data.current.temp_c} degrees and feels like ${data.forecast.forecastday[0].day.avgtemp_c} degrees`
      );
    }
  });
});
