const searchBtn = document.querySelector("#Search");
const search = document.querySelector("input");
const messageBox1 = document.getElementById('message-1')
const messageBox2 = document.getElementById('message-2')
const myWeatherBtn = document.querySelector("#MyWeather");


searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const location = search.value;
  fetch(`http://localhost:3000/weather?city=${location}`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      if (data.error) {
        messageBox1.textContent = data.error
      } else {
        console.log(data);
        messageBox1.textContent = `${data.city} , ${data.region} , ${data.country} `
        messageBox2.textContent = `Current temprature is ${data.current_temp} degrees and forecasted is  ${data.forecast_temp} degrees`
      }
    })
});

myWeatherBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude
      const long = position.coords.longitude
      fetch(`http://localhost:3000/myWeather?lat=${lat}&long=${long}`)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          if (data.error) {
            messageBox1.textContent = data.error
          } else {
            console.log(data);
            messageBox1.textContent = `${data.city} , ${data.region} , ${data.country} `
            messageBox2.textContent = `Current temprature is ${data.current_temp} degrees and forecasted is  ${data.forecast_temp} degrees`
          }
        })

    });

  }
})
