const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

function search_city(){
    const APIKey = '78b3e3925d68d3b5f8df31bf67f841dd';
    const city = document.querySelector('.search-box input').value;

    if(city === '')
        return

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
        
        if(json.cod === '404'){
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none'
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');
        
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description')
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        
        switch(json.weather[0].main){
            case 'Clear':
                image.src = 'imagens/clear.png';
                break;

            case 'Rain':
                image.src = 'imagens/rain.png';
                break;

            case 'Snow':
                image.src = 'imagens/snow.png';
                break;

            case 'Clouds':
                image.src = 'imagens/cloud.png';
                break;
            
            case 'Haze':
                image.src = 'imagens/haze.png';
                break;

            default:
                image.src = '';
        }

        console.log(json.weather[0].description)
        switch(json.weather[0].description){
            case 'overcast clouds':
                descriptionTraduzida = 'Nuvens Nubladas'
                break;

            case 'broken clouds':
                descriptionTraduzida = 'Parcialmente Nublado'
                break;

            case 'scattered clouds':
                descriptionTraduzida = 'Nublado'
                break;

            case 'few clouds':
                descriptionTraduzida = 'Poucas Nuvens'
                break;
            
            case 'clear sky':
                descriptionTraduzida = 'Céu Limpo'
                break;

            default:
                descriptionTraduzida = ''
        }

        

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = descriptionTraduzida;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';

    })
}

container.addEventListener('keypress', whatKey);

function whatKey(e){
    if(e.code === 'Enter'){
        search_city(); 
    }
}

search.addEventListener('click', () =>{
    search_city();
})
