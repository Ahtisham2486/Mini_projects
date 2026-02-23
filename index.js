import express from "express";

import axios from "axios";


const app = express();
const port = 3000;

const API_key = `54add7fa274c475985390240262302`;
const URL = `http://api.weatherapi.com/v1`
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json())
app.get("/", (req, res) => {
    res.render("index.ejs",{ weather: null , error: null });
});
app.get("/forecast",(req,res)=>{
    
})
app.post("/currentCity", async (req, res) => {
    const city = req.body.city;
    if (!city) {
        return res.render("index.ejs", { weather: null, error: null });
    }
    try {

        const response = await axios.get(`${URL}/current.json`, {
            params: {
                key: API_key,
                q: city,
                aqi: "yes"
            }
        });

        const weatherdata = response.data;
        // res.json(weatherdata);
        res.render("index.ejs", { weather: weatherdata, error: null })


    } catch (err) {
        console.error(err.message);
        res.render("index.ejs", {
            weather: null, error: "city not found",
        })


    }
});

app.listen(port, () => {
    console.log(`app is running at http://localhost:${port} `);
})

