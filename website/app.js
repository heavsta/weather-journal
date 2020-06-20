/* LOADING TIME IMAGES */

function loadImage(id, targetId) {
    var el = document.getElementById(id);
    var targetEl = targetId ? document.getElementById(targetId) : el;
    var imageToLoad;

    if (el.dataset.image) {
        imageToLoad = el.dataset.image;
    } else if (typeof el.currentSrc === 'undefined') {
        imageToLoad = el.src;
    } else {
        imageToLoad = el.currentSrc;
    }

    if (imageToLoad) {
        var img = new Image();
        img.src = imageToLoad;
        img.onload = function() {
            targetEl.classList.add('is-loaded')
        };
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadImage('wallpaper');
});




/* UDACITY PROJECT */

// Personal API Key for OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&units=imperial&appid=8d409df75ab1a756b861b595af9fae58';

// create new date instance
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);
/* Function called by event listener */
function performAction(e) {
    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    getWeatherData(baseURL, zipCode, apiKey)
    .then(function(data) {
        console.log(data);
        postData('/addData', {
            date: newDate,
            temp: data.main.temp,
            content: content
        })
    })
    .then( ()=> updateUI());

}

/* Function to GET Web API Data*/
const getWeatherData = async(baseURL, zipCode, apiKey) => {
    const res = await fetch(baseURL + zipCode + apiKey)
    try {
        const data = await res.json();
        console.log(data);
        return data;
    }catch(error){
console.log("error in GET Web API Data", error);
    }
}

/* Function to POST data - send data to server */
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error on postData", error);
    }
}

/* UPDATE UI */

const updateUI = async () => {
    const request = await fetch('/allData')
    try {
        const allData = await request.json()
        console.log(allData);
        document.getElementById('date').innerHTML = 'Today is : ' + allData.date;
        document.getElementById('temp').innerHTML = 'Temperature : ' + allData.temp + '°F';
        document.getElementById('content').innerHTML = 'Mood : ' + allData.content;
    }catch(error) {
        console.log("error in UI rendering", error);
    }
}