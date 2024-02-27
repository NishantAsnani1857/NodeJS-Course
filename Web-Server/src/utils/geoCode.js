const request = require("postman-request");
const key=process.env.APIKEY2

function getCoordinates(location, callBack) {
  const api2 = `https://geocode.maps.co/search?q=${location}&api_key=${key}`;
  request({ url: api2, json: true }, (error, response) => {
    if (response === undefined) {
      console.log("Oh no some error occured");
    } else if (response.body.length === 0) {
      console.log("No co-ordinates found for given location");
    } else {
      callBack(error, {
        latitude: response.body[0].lat,
        longitude: response.body[0].lon,
      });
    }
  });
}

module.exports = getCoordinates;
