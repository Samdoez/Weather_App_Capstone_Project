import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
dotenv.config();


const app = express();
const port = 3000;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async(req, res) => {
   res.render('index.ejs', { weather: null });
});

const API_KEY = process.env.API_KEY;
    
app.post("/get_weather", async (req, res) => {
  let city = req.body.city;
  console.log(city); // to see if it returns the city and its working
  console.log(API_KEY); // to see if it returns the API key and its working
    try {
      const response = await axios.get("https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + API_KEY + "&units=metric");
      const result = response.data;
        console.log(result);
        res.render("index.ejs", { weather: result});
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {error: "Failed to get a response, check Url.",});
    }
});
// https://api.openweathermap.org/data/2.5/weather?q=Lagos&appid=${API_KEY}&units=metric
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

