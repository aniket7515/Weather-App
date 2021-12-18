const express = require('express');
const https= require("https");
const bodyParser = require('body-parser');



const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');

    
});

app.post("/",(req,res)=>{
    
    const query=req.body.CityName;
    const apiKey="aeba293914997ada5eb15afd582f3f1a"
    const unit="metric"

    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url, (response)=>{
        console.log(response.statusCode);

        response.on('data', (data)=>{
            const weatherData= JSON.parse(data); // to parse data in form of JSON format
            // const object={
            //     name:"Aniket Dhokane",
            //     favouriteFood:"Panner Chilli"
            // }
            // console.log(JSON.stringify(object));  // Turns a javascript object into a string

            const temp=weatherData.main.temp
            const description= weatherData.weather[0].description
            const icon=weatherData.weather[0].icon

            const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            console.log(description);
            // console.log(temp);

            res.write("<h1> The Temperature in "+query+" is :"+temp+"Degree Celcius </h1>");
            res.write("<h1>The weather is currently "+description +"</h1>");
            res.write("<img src="+imageURL+">")

            res.send();


            // We an only use on res.send 



            console.log(weatherData);

    })



    // res.send("Server is up")
})
})





app.listen(3000,function(){
    console.log("Server is running on port 3000");
})