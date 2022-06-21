const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const https=require("https");
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");
    
});
app.post("/",function(req,res){
    const city =String(req.body.city);
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=347829773c44589466ef8b60a5552507&units=metric";
    
    https.get(url,function(response){
        response.on("data",(data) => {
                weatherData = JSON.parse(data);
                var temp=weatherData.main.temp;
                var description=weatherData.weather[0].description;
                const icon=weatherData.weather[0].icon;
                const URL="http://openweathermap.org/img/wn/"+icon+"@2x.png";

                res.write("<h2>the weather in "+city+" is "+description+" and the temperture is "+temp+" degree</h2>");
                res.write(`<img src="${URL}" >`);
                res.send();
            });
    });
    
});
app.listen(3000,function(){
    console.log("the server is running on port 3000");
})