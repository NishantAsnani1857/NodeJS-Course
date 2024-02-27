const mongoose=require('mongoose')

const url = process.env.MONGODB_URL;
mongoose
  .connect(url)
  .then((client) => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.log(`Oh no some error occured ${err}`);
  });