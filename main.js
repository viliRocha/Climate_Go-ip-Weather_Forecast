const URL = "https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=70450de2ac958905e084a5685183cd6e";

/*
async function recuperar() {
    let receber = await fetch(URL)

    let data = await receber.json();
    
        return data;
}
*/

var imagem = document.getElementById("image");

var lugar = document.getElementById("place");

var local = document.getElementById("local");

var info = document.getElementById("noticias");


var vento = document.getElementById("wind");
var humidade = document.getElementById("humidity");

var tempMaxima = document.getElementById("temp_max");
var tempMinima = document.getElementById("temp_min");

var nuvens = document.getElementById("clouds");
var tempo = document.getElementById("weather");
var sensa = document.getElementById("feels_like");
var temperatura = document.getElementById("temp");

function recuperar() {
    let cidade = local.value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=70450de2ac958905e084a5685183cd6e`)
    .then(resposta => {
        return resposta.json();
    })
    .then(data => {
        if(data.cod == "404") {
            imagem.src = "/assets/img/sem-resultados.png"; 
            
            lugar.innerText = "place: couldn't find current place";

            vento.innerText = "wind speed: ";
            humidade.innerText = "humidity: ";

            tempMaxima.innerText = "maximun temperature: ";
            tempMinima.innerText = "minimun temperature: ";

            nuvens.innerText = "clouds: ";
            tempo.innerText = "weather: ";
            sensa.innerText = "feels like: ";
            temperatura.innerText = "temperature: ";

            temperatura.style.color = "blue";
            sensa.style.color = "blue";
            tempMinima.style.color = "blue";
            tempMaxima.style.color = "blue";
        }

        else if(data.weather[0].description == "clear sky") {
            imagem.src = "./assets/img/ensolarado.png"; 
        }

        else if(data.weather[0].description == "few clouds") {
            imagem.src = "./assets/img/pequena nuvem.png"; 
        }

        else if(data.weather[0].description == "broken clouds") {
            imagem.src = "./assets/img/nuvens.png"; 
        }

        else if(data.weather[0].description == "scattered clouds") {
            imagem.src = "./assets/img/nuvem.png"; 
        }

        else if(data.weather[0].description == "overcast clouds") {
            imagem.src = "./assets/img/muitas nuvens.png"; 
        }

        else if(data.weather[0].description == "moderate rain") {
            imagem.src = "./assets/img/chuva fraca.png"
        }

        else if(data.weather[0].description == "light rain") {
            imagem.src = "./assets/img/chuva.png"; 
        }

        else if(data.weather[0].description == "heavy intensity rain") {
            imagem.src = "./assets/img/trovoada.png"; 
        }

        else if(data.weather[0].description == "snow") {
            imagem.src = "./assets/img/neve.png"; 
        }

        else if(data.weather[0].description == "mist") {
            imagem.src = "./assets/img/mist.png"; 
        }


        if(data.main.temp >= 30) {
            temperatura.style.color = "red";
        }
        if(data.main.feels_like >= 30) {
            sensa.style.color = "red";
        }
        if(data.main.temp_min >= 30) {
            tempMinima.style.color = "red";
        }
        if(data.main.temp_max >= 30) {
            tempMaxima.style.color = "red";
        }


        if(data.main.temp <= 0) {
            temperatura.style.color = "#87CEEB";
        }
        if(data.main.feels_like <= 0) {
            sensa.style.color = "#87CEEB";
        }
        if(data.main.temp_min <= 0) {
            tempMinima.style.color = "#87CEEB";
        }
        if(data.main.temp_max <= 0) {
            tempMaxima.style.color = "#87CEEB";
        }
    

        vento.innerText = "wind speed: " + data.wind.speed + " km/h";
        humidade.innerText = "humidity: " + data.main.humidity + "%";

        tempMaxima.innerText = "maximun temperature: " + data.main.temp_max + " ºC";
        tempMinima.innerText = "minimun temperature: " + data.main.temp_min + " ºC";

        nuvens.innerText = "clouds: " + data.clouds.all + "%";
        tempo.innerText = "weather: " + data.weather[0].description;
        sensa.innerText = "feels like: " + data.main.feels_like + " ºC";
        temperatura.innerText = "temperature: " + data.main.temp + " ºC";

        lugar.innerText = "place: " + data.name;

        console.log(data.main.temp);
    })
}

function aoIniciar() {
    fetch("http://ip-api.com/json")
    .then(response => {
        return response.json();
    })
    .then(ip => {
        local.value = ip.city;
        recuperar();

        local.value = "";
    });
}

window.addEventListener("load", () => {
    aoIniciar();
});

//var resposta = recuperar();

document.addEventListener("keypress", e =>{
    if(e.which == 13){
        recuperar();
    }
});


info.addEventListener("mouseover", () =>{
    info.style.borderWidth = "3px"
    info.style.borderColor = "blue"
});

info.addEventListener("mouseout", () =>{
    info.style.borderWidth = "0px"
});

local.addEventListener("mouseover", () =>{
    local.style.borderWidth = "3px"
    local.style.borderColor = "blue"
});

local.addEventListener("mouseout", () =>{
    local.style.borderWidth = "0px"
});
