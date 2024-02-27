const request = require("postman-request");
const apiKey2 = "65b8e1be7e354855668324oxgce1312";

function getCoordinates(location, callBack) {
  const api2 = `https://geocode.maps.co/search?q=${location}&api_key=${apiKey2}`;
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
