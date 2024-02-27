const form = document.querySelector("form");
const search = document.querySelector("input");
const messageBox1=document.getElementById('message-1')
const messageBox2=document.getElementById('message-2')

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  fetch(`http://localhost:3000/weather?city=${location}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
      if (data.error) {
        messageBox1.textContent=data.error
      } else {
        console.log(data);
        messageBox1.textContent=`${data.city} , ${data.region} , ${data.country} `
        messageBox2.textContent=`Current temprature is ${data.current_temp} degrees and forecasted is  ${data.forecast_temp} degrees`
      }
    })
});
