const { response } = require("express");
const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser= require("body-parser");
const https = require("https");
currentId = 1;
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", __dirname+"/views");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) =>{
    const helper = [];
    const url = "https://www.superheroapi.com/api.php/1809210752604216/1";
    https.get(url, (response)=>{
        response.on("data", (data) =>{
            helper.push(data);
        });
        response.on("end",()=> {
            const dataAux = Buffer.concat(helper);
            const data = JSON.parse(dataAux);
            var superID = data.id;
            var img = data.image.url;
            var fullname = data.biography["full-name"];
            var alias = data.biography.aliases;
            var name = data.name;
            var intel=data.powerstats.intelligence;
            var strength=data.powerstats.strength;
            var speed=data.powerstats.speed;
            var durability=data.powerstats.durability;
            var power=data.powerstats.power;
            var combat=data.powerstats.combat;
            var gender=data.appearance.gender;
            var eyecolor=data.appearance["eye-color"];
            var race=data.appearance.race;
            var haircolor= data.appearance["hair-color"];
            var birthplace=data.biography["place-of-birth"];
            var weight = data.appearance.weight[1];
            var height = data.appearance.height[1];
            var affiliation=data.connections["group-affiliation"];
            res.render("index.html", {
                superID:superID,
                name:name,
                intel:intel,
                fullname:fullname,
                strength:strength,
                speed:speed,
                durability:durability,
                power:power,
                combat:combat,
                gender:gender,
                race:race,
                eyecolor:eyecolor,
                haircolor:haircolor,
                birthplace:birthplace,
                eyecolor:eyecolor,
                alias:alias,
                img:img,
                weight:weight,
                height:height,
                affiliation:affiliation,
            });
        })
    });
});
app.post('/', (req, res) =>{
    const helper = [];
    var search = req.body.find.toLowerCase();
    const url = "https://www.superheroapi.com/api.php/1809210752604216/search/"+search;
    https.get(url, (response)=>{
        response.on("data", (data) =>{
            helper.push(data);
        });
        response.on("end",()=> {
            try{
            
            const dataAux = Buffer.concat(helper);
            const data = JSON.parse(dataAux);
            var superID = data.results[0].id;
            currentId=superID;
            var name = data.results[0].name;
            var fullname = data.results[0].biography["full-name"];
            var alias = data.results[0].biography.aliases;
            var intel=data.results[0].powerstats.intelligence;
            var strength=data.results[0].powerstats.strength;
            var speed=data.results[0].powerstats.speed;
            var durability=data.results[0].powerstats.durability;
            var power=data.results[0].powerstats.power;
            var combat=data.results[0].powerstats.combat;
            var gender=data.results[0].appearance.gender;
            var race=data.results[0].appearance.race;
            var eyecolor=data.results[0].appearance["eye-color"];
            var haircolor= data.results[0].appearance["hair-color"];
            var birthplace=data.results[0].biography["place-of-birth"];
            var weight = data.results[0].appearance.weight[1];
            var height = data.results[0].appearance.height[1];
            var img = data.results[0].image.url;
            console.log(currentId);
            var affiliation=data.results[0].connections["group-affiliation"];
            res.render("index.html", {
                superID:superID,
                name:name,
                fullname:fullname,
                intel:intel,
                strength:strength,
                speed:speed,
                durability:durability,
                power:power,
                combat:combat,
                gender:gender,
                race:race,
                eyecolor:eyecolor,
                haircolor:haircolor,
                birthplace:birthplace,
                alias:alias,
                img:img,
                weight:weight,
                height:height,
                affiliation:affiliation,
            });
        }catch (error) {
                res.render("404.html",{
                    name:search
                })
            }
        }) 
    });
});
app.post('/next', (req, res) =>{
    const helper = [];
    if (currentId == 732){
        currentId=1;
    } else {
        currentId++;
    }
    const url = "https://www.superheroapi.com/api.php/1809210752604216/"+currentId;
    https.get(url, (response)=>{
        response.on("data", (data) =>{
            helper.push(data);
        });
        response.on("end",()=> {
            const dataAux = Buffer.concat(helper);
            const data = JSON.parse(dataAux);
            var superID = data.id;
            var name = data.name;
            var fullname = data.biography["full-name"];
            var alias = data.biography.aliases;
            var intel=data.powerstats.intelligence;
            var strength=data.powerstats.strength;
            var speed=data.powerstats.speed;
            var durability=data.powerstats.durability;
            var power=data.powerstats.power;
            var combat=data.powerstats.combat;
            var gender=data.appearance.gender;
            var race=data.appearance.race;
            var eyecolor=data.appearance["eye-color"];
            var haircolor= data.appearance["hair-color"];
            var birthplace=data.biography["place-of-birth"];
            var weight = data.appearance.weight[1];
            var height = data.appearance.height[1];
            var affiliation=data.connections["group-affiliation"];
            var img = data.image.url;
            res.render("index.html", {
                superID:superID,
                name:name,
                fullname:fullname,
                intel:intel,
                strength:strength,
                speed:speed,
                durability:durability,
                power:power,
                combat:combat,
                gender:gender,
                race:race,
                eyecolor:eyecolor,
                haircolor:haircolor,
                birthplace:birthplace,
                alias:alias,
                img:img,
                weight:weight,
                height:height,
                affiliation:affiliation,
            });
        })
    });
});
app.post('/prev', (req, res) =>{
    const helper = [];
    if (currentId == 1){
        currentId=732;
    } else {
        currentId--;
    }
    const url = "https://www.superheroapi.com/api.php/1809210752604216/"+currentId;
    https.get(url, (response)=>{
        response.on("data", (data) =>{
            helper.push(data);
        });
        response.on("end",()=> {
            const dataAux = Buffer.concat(helper);
            const data = JSON.parse(dataAux);
            var superID = data.id;
            var img = data.image.url;
            var name = data.name;
            var fullname = data.biography["full-name"];
            var alias = data.biography.aliases;
            var intel=data.powerstats.intelligence;
            var strength=data.powerstats.strength;
            var speed=data.powerstats.speed;
            var durability=data.powerstats.durability;
            var power=data.powerstats.power;
            var combat=data.powerstats.combat;
            var gender=data.appearance.gender;
            var race=data.appearance.race;
            var eyecolor=data.appearance["eye-color"];
            var haircolor= data.appearance["hair-color"];
            var birthplace=data.biography["place-of-birth"];
            var weight = data.appearance.weight[1];
            var height = data.appearance.height[1];
            var affiliation=data.connections["group-affiliation"];
            res.render("index.html", {
                superID:superID,
                name:name,
                fullname:fullname,
                intel:intel,
                strength:strength,
                speed:speed,
                durability:durability,
                power:power,
                combat:combat,
                gender:gender,
                race:race,
                eyecolor:eyecolor,
                haircolor:haircolor,
                birthplace:birthplace,
                alias:alias,
                img:img,
                weight:weight,
                height:height,
                affiliation:affiliation,
            });
        })
    });
});

app.listen(4000,()=>{
    console.log("Listening to port 3000");
})