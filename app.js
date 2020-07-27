const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
})


app.post("/", function(req,res){
  const query = req.body.cityname
  const apikey = "ad672dfc79a1ded0a8cdc05d55cad5d4"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" +  query +"&appid="+ apikey +"&units=" + unit;
  https.get(url, function(response){
         console.log(response.statusCode);
         response.on("data",function(data){
               const weatherData = JSON.parse(data)
               const temp = weatherData.main.temp
               const weatherDescription = weatherData.weather[0].description
               const icon = weatherData.weather[0].icon
               const image = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

               res.write("<p> The Weather is currently " + weatherDescription + ".<p>");
               res.write("<h1> The Weather of " + query + " is " + temp + " degree Celsius." + "</h1>");
               res.write("<img src=" + image + ">")
               res.send()
        })
  })

})


app.listen(3000, function(){
  console.log("Server is running on port 3000.");
})
