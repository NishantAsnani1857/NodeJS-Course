const express = require("express");
const app = express();
const path = require("path");
const publicDirectoryPath = path.join(__dirname, "../public");
const viewDirectoryPath = path.join(__dirname, "../templates/views");
const partialsDirectoryPath = path.join(__dirname, "../templates/partials");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const getWeather = require("./utils/forecast");

app.use(express.static(publicDirectoryPath));

app.set("view engine", "hbs");
app.set("views", viewDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

app.get("", (req, res) => {
  const obj = {
    title: "Weather",
    name: "Nishant",
  };
  res.render("index", { obj });
});

app.get("/about", (req, res) => {
  const obj = {
    title: "About me",
    name: "Nishant",
  };
  res.render("about", { obj });
});

app.get("/help", (req, res) => {
  const obj = {
    title: "Help",
    name: "Nishant",
    message: "We are getting your help soon",
  };
  res.render("help", { obj });
});

// Challange
app.get("/weather", (req, res) => {
  if (!req.query.city) {
    res.json({ error: "Please enter your address" });
  } else {
    geoCode(req.query.city, (error, { latitude, longitude }) => {
      if (error) {
        return console.log(error);
      } else {
        getWeather(latitude, longitude, (error, { data }) => {
          if (error) {
            return console.log(error);
          } else {
            res.json({
              city: data.location.name,
              region: data.location.region,
              country: data.location.country,
              current_temp: data.current.temp_c,
              forecast_temp: data.forecast.forecastday[0].day.avgtemp_c,
            });
          }
        });
      }
    });
  }
});

app.get('/myWeather',(req,res)=>{
  if(!req.query.lat || !req.query.long){
    res.json({ error: "Please enter your address" });
  }
  else{
    getWeather(req.query.lat, req.query.long, (error, { data }) => {
      if (error) {
        return console.log(error);
      } else {
        res.json({
          city: data.location.name,
          region: data.location.region,
          country: data.location.country,
          current_temp: data.current.temp_c,
          forecast_temp: data.forecast.forecastday[0].day.avgtemp_c,
        });
      }
    })
  }
})

app.get("/help/*", (req, res) => {
  const obj = {
    title: 404,
    name: "Nishant",
    errorMessage: "Help not found",
  };
  res.render("404", { obj });
});

app.get("*", (req, res) => {
  const obj = {
    title: 404,
    name: "Nishant",
    errorMessage: "Page not found",
  };
  res.render("404", { obj });
});

app.listen(3000, () => {
  console.log(`Listening to port 3000`);
});
