const mongoose=require('mongoose')

const url = process.env.MONGODB_URL;
mongoose
  .connect(url)
  .then((client) => {
  })
  .catch((err) => {
    console.log(`Oh no some error occured ${err}`);
  });