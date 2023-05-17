// xterminal scipts

// Access fullscreen function
function goFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }
};

//-----------------------------------------------------------------------------------------------------

// Date function
function showDate(){
    var date = new Date();
    var y = date.getFullYear(); // e.g 2022
    var m = date.getMonth() + 1; //0-11 + 1
    var d = date.getDate(); //1-31*/
  
    if (m < 10) {
      m = '0' + m;
    };
  
    if (d < 10) {
      d = '0' + d;
    };
  
    var fulldate = y + '-' + m + '-' + d;
    document.getElementById("myDateDisplay").innerText = fulldate;
    document.getElementById("myDateDisplay").texContent = fulldate;
  
    setTimeout(showDate, 10000);
    return fulldate;
};

//--------------------------------------------------------------------------------------------------------

// Time function
function showTime(){
var date = new Date();
var h = date.getHours(); //0-23
var m = date.getMinutes(); //0-59

if(h < 10){
    h = '0' + h;
};
if(m < 10){
    m = '0' + m;
};

var time = h + ':' + m;
document.getElementById("myClockDisplay").innerText = time;
document.getElementById("myClockDisplay").texContent = time;

setTimeout(showTime, 10000);
return time;
};

//-----------------------------------------------------------------------------------------------------------

// Sunrise and sunset function
function getSunlightData(param) { //Possible parameters: sunrise, sunset

const updateInterval = 10 * 60 * 1000; // 10 minutes
setTimeout(getSunlightData, updateInterval);

// Get todays date
const today = showDate();
//console.log(today);

// Declare the variables outside the fetch() callback
let outputData;
let sunrise;
let sunset;

return new Promise((resolve, reject) => {
    fetch('https://api.sunrise-sunset.org/json?lat=60.60755&lng=15.62198&formatted=0&today').then((response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
    }).then((data) => {
    
    // Assign the fetched data to the variable declared outside the fetch() callback
    outputData = data; 
    //console.log(outputData);

    // Get the sunrise data in UTC
    let sunriseTimeData = data.results.sunrise;
    //console.log(sunriseTimeData);

    // Get the sunset data in UTC
    let sunsetTimeData = data.results.sunset;
    //console.log(sunsetTimeData);

    // Set the time you want to convert
    let originalSunrise = new Date(sunriseTimeData);
    let originalSunset = new Date(sunsetTimeData);

    // Get the UTC offset for the local time zone in minutes
    const offset = -originalSunset.getTimezoneOffset();

    // Convert the offset to milliseconds and add it to the original time to get the local time
    const localSunrise = new Date(originalSunrise.getTime() + (offset * 60 * 1000));
    const localSunset = new Date(originalSunset.getTime() + (offset * 60 * 1000));

    // Output the Local time and offset to the console
    //console.log(`UTC offset: ${offset} minutes`);
    //console.log(`Local sunrise time: ${localSunrise.toISOString()}`);
    //console.log(`Local sunset time: ${localSunset.toISOString()}`);
    
    // Local time
    const localSunriseTime = localSunrise.toISOString();
    const localSunsetTime = localSunset.toISOString();
    
    // Display local times
    document.getElementById("sunriseDisplay").innerText = localSunriseTime.slice(11, 16);
    document.getElementById("sunsetDisplay").innerText = localSunsetTime.slice(11, 16);
    
    if (param === 'sunrise') {

        sunrise = outputData.results.sunrise;
        console.log(new Date(sunrise));
        resolve(sunrise);

    } else if (param === 'sunset') {

        sunset = outputData.results.sunset;
        console.log(new Date(sunset));
        resolve(sunset);
    }

    }).catch((error) => {
    console.error(error);
    reject(error);
    });
});
};

//----------------------------------------------------------------------------------------------------

// Import Eventemitter
const EventEmitter = require('events');

// Make new instance of the emitter
const emitter = new EventEmitter();

// Check if the sun is up or not
async function daylight() {

    try {

        let now = new Date().getTime();
        console.log(new Date());

        let rise = await getSunlightData('sunrise');
        let sunrise = new Date(rise).getTime();
        //console.log(new Date(rise));
        
        let set = await getSunlightData('sunset');
        let sunset = new Date(set).getTime();
        //console.log(new Date(set));
        
        //console.log(new Date(displaySunset) - new Date(displaySunrise));

        if (now > sunrise && now < sunset) {
            console.log("daylight")
            document.getElementById("sun").innerText = "Daylight!";
            return true;
        } else {
            console.log("sun is down")
            document.getElementById("sun").innerText = "Sun is down!"
            return false;
        }

    } catch (error) {
    console.error(error);
    }
    
};

// Listen for daylightEvent trigger
emitter.on('daylightEvent', async () => {
    await daylight();
});

// Check if there is daylight by running daylightEvent and trigger daylight() every minute
setInterval(() => {
    emitter.emit('daylightEvent');
  }, 10000); // 60000 milliseconds = 1 minute

//----------------------------------------------------------------------------------------------------

// Function to display week no.
function showWeek() {
    
    var firstDayWeek = 0;
    var daysSinceFirstDayOfYear = 0;
    var daysSinceFirstDayOfLastYear = 0;
    var week = 0;

    // Get todays date
    var today = new Date();

    // Set first day of the year to first of january
    var firstDayOfTheYear = new Date(today.getFullYear(), 0, 1); // today.getFullYear(), 0, 1

    // Set the first day of last year
    var firstDayOfLastYear = new Date(today.getFullYear() - 1, 0, 1); // today.getFullYear() - 1, 0, 1

    // Number of days since first day of the year
    daysSinceFirstDayOfYear = ((today - firstDayOfTheYear) / (24 * 60 * 60 * 1000));

    // Number of days since the first day of last year
    daysSinceFirstDayOfLastYear = ((today - firstDayOfLastYear) / (24 * 60 * 60 * 1000));

    // Get the weekday for the first day of the year in numbers 0-6, starting with sun
    var firstDayWeekDay = firstDayOfTheYear.getDay();
    
    // Get the weekday for the first day of last year in numbers 0-6, starting with sun
    var firstDayWeekDay = firstDayOfLastYear.getDay();

    // If first day of the new year is monday, tuesday or wednesday it's the first week of the year
    if (firstDayWeekDay > 0 && firstDayWeekDay < 4) {
        // 
        week = (daysSinceFirstDayOfYear + 1) / 7 + 1;
        //console.log('week(1): ' + week);
    } else {
        // If first day of the year is thursday, friday or saturday it's the last week of last year
        if (firstDayWeekDay > 0 && daysSinceFirstDayOfYear <= (7 - firstDayWeekDay)) {
            //
            week = (daysSinceFirstDayOfLastYear / 7);
            //console.log('week(2): ' + week);
        // If first day of the year is a sunday it's the last week of last year and as 
        // long as days since first day is less than one day
        } else if (firstDayWeekDay === 0 && daysSinceFirstDayOfYear < 1) {
            // 
            week = Math.ceil(daysSinceFirstDayOfLastYear / 7);
            //console.log('week(3): ' + week);
        //
        } else {
            //
            week = Math.ceil((daysSinceFirstDayOfYear - (7 - firstDayWeekDay)) / 7);
            //console.log('week(4): ' + week);
        }
    }

    /*
    console.log('first day: ' + firstDayOfTheYear);
    console.log('today: ' + today);
    console.log('first day weekday: ' + firstDayWeekDay);
    console.log('days since first day: ' + daysSinceFirstDayOfYear);
    */

    // Display week
    document.getElementById("weekDisplay").innerText = week;
    
    return week;
};
//console.log('week: ' + showWeek());

//------------------------------------------------------------------------------------------------------

// Function for getting weatherdata from SMHI api
function  weatherData() {

    // Get weather data from the SMHI api
    var xhr = fetch('https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/15.62198/lat/60.60755/data.json');

    // Make array of the data
    xhr.then(response => response.json()).then(data => {
        //console.log(data);
        
        // Get weather symbol
        for (let i=0; i<19; i++) {
            
            let parameterName = data.timeSeries[0].parameters[i].name;
            
            if (parameterName === 'Wsymb2') {
                let weatherSymbol = data.timeSeries[0].parameters[i].values[0];
                //console.log('parameter: ' + parameterName + ', ' + weatherSymbol);
                
                // Get the right weather symbol value 1-27
                var wsymbol = () => {
                    switch (weatherSymbol) {
                        case 1:
                            var iconHtml = '<i class="fi fi-tr-brightness"></i>';
                            return iconHtml;
                            break;
                        case 2:
                            var iconHtml = '<i class="fi fi-rr-cloud-sun"></i>';
                            return iconHtml;
                            break;
                        case 3:
                            var iconHtml = '<i class="fi fi-rr-clouds-sun"></i>';
                            return iconHtml;
                            break;
                        case 4:
                            var iconHtml = '<i class="fi fi-rr-clouds-sun"></i>';
                            return iconHtml;
                            break;
                        case 5:
                            var iconHtml = '<i class="fi fi-rr-clouds-sun"></i>';
                            return iconHtml;
                            break;
                        case 6:
                            var iconHtml = '<i class="fi fi-tr-smoke"></i>';
                            return iconHtml;
                            break;
                        case 7:
                            var iconHtml = '<i class="fi fi-tr-fog"></i>';
                            return iconHtml;
                            break;
                        case 8:
                            var iconHtml = '<i class="fi fi-tr-cloud-sun-rain"></i>';
                            return iconHtml;
                            break;
                        case 9:
                            var iconHtml = '<i class="fi fi-tr-cloud-sun-rain"></i>';
                            return iconHtml;
                            break;
                        case 10:
                            var iconHtml = '<i class="fi fi-tr-cloud-sun-rain"></i>';
                            return iconHtml;
                            break;
                        case 11:
                            var iconHtml = '<i class="fi fi-tr-thunderstorm"></i>';
                            return iconHtml;
                            break;
                        case 12:
                            var iconHtml = '<i class="fi fi-tr-cloud-sleet"></i>';
                            return iconHtml;
                            break;
                        case 13:
                            var iconHtml = '<i class="fi fi-tr-cloud-sleet"></i>';
                            return iconHtml;
                            break;
                        case 14:
                            var iconHtml = '<i class="fi fi-tr-cloud-sleet"></i>';
                            return iconHtml;
                            break;
                        case 15:
                            var iconHtml = '<i class="fi fi-tr-cloud-snow"></i>';
                            return iconHtml;
                            break;
                        case 16:
                            var iconHtml = '<i class="fi fi-tr-cloud-snow"></i>';
                            return iconHtml;
                            break;
                        case 17:
                            var iconHtml = '<i class="fi fi-tr-cloud-snow"></i>';
                            return iconHtml;
                            break;
                        case 18:
                            var iconHtml = '<i class="fi fi-tr-cloud-rain"></i>';
                            return iconHtml;
                            break;
                        case 19:
                            var iconHtml = '<i class="fi fi-tr-cloud-showers"></i>';
                            return iconHtml;
                            break;
                        case 20:
                            var iconHtml = '<i class="fi fi-tr-cloud-showers-heavy"></i>';
                            return iconHtml;
                            break;
                        case 21:
                            var iconHtml = '<i class="fi fi-tr-thunderstorm"></i>';
                            return iconHtml;
                            break;
                        case 22:
                            var iconHtml = '<i class="fi fi-tr-cloud-sleet"></i>';
                            return iconHtml;
                            break;
                        case 23:
                            var iconHtml = '<i class="fi fi-tr-cloud-sleet"></i>';
                            return iconHtml;
                            break;
                        case 24:
                            var iconHtml = '<i class="fi fi-tr-cloud-sleet"></i>';
                            return iconHtml;
                            break;
                        case 25:
                            var iconHtml = '<i class="fi fi-tr-cloud-snow"></i>';
                            return iconHtml;
                            break;
                        case 26:
                            var iconHtml = '<i class="fi fi-tr-cloud-snow"></i>';
                            return iconHtml;
                            break;
                        case 27:
                            var iconHtml = '<i class="fi fi-tr-cloud-snow"></i>';
                            return iconHtml;
                            break;
                    }
                }
                //console.log(wsymbol());
                
                // Get the parent div element
                const parentElement = document.querySelector('#weatherAndTemp');

                // Get the old child element
                const oldElement = parentElement.firstElementChild;

                // Set new element
                const newElement = document.createElement('div');

                // Set content of the new element
                newElement.innerHTML = wsymbol();

                // Add the new div element as a child of the <div class"weatherIcon"> element
                parentElement.replaceChild(newElement, oldElement);

            } else if (parameterName === 't') {

                // Get the air temperature
                let airTemperature = Math.round(data.timeSeries[0].parameters[i].values[0]);
                //console.log('parameter: ' + parameterName + ', ' + airTemperature);
                // Display element
                document.getElementById("temperature").textContent = airTemperature;

            } else if (parameterName === 'wd') {

                // Get the wind direction
                let windDirection = Math.round(data.timeSeries[0].parameters[i].values[0]);
                //console.log('parameter: ' + parameterName + ', ' + windDirection);

            } else if (parameterName === 'ws') {

                // Get the wind speed
                let windSpeed = Math.round(data.timeSeries[0].parameters[i].values[0]);
                //console.log('parameter: ' + parameterName + ', ' + windSpeed);
                // Display element
                document.getElementById("windSpeed").textContent = windSpeed;

            } else if (parameterName === 'gust') {

                // Get the wind speed
                let windGustSpeed = Math.round(data.timeSeries[0].parameters[i].values[0]);
                //console.log('parameter: ' + parameterName + ', ' + windGustSpeed);
                // Display element
                document.getElementById("windGust").textContent = ' (' + windGustSpeed + ') ';

            } else if (parameterName === 'r') {

                // Get the relative humidity
                let relativeHumidity = Math.round(data.timeSeries[0].parameters[i].values[0]);
                //console.log('parameter: ' + parameterName + ', ' + relativeHumidity);
                // Display element
                document.getElementById("humidity").textContent = relativeHumidity;

            } else if (parameterName === 'pcat') {

                // Get the precipitation category
                let precipitation = Math.round(data.timeSeries[0].parameters[i].values[0]);
                //console.log('parameter: ' + parameterName + ', ' + precipitation);

            } else if (parameterName === 'pmean') {

                // Get the precipitation category
                let meanPrecipitation = Math.round(data.timeSeries[0].parameters[i].values[0]);
                //console.log('parameter: ' + parameterName + ', ' + meanPrecipitation);
                // Display element
                document.getElementById("precipitation").textContent = meanPrecipitation;
            }
        }
    }).catch(error => console.log(error));

    const updateInterval = 10 * 60 * 1000; //10 * 60 * 1000; // 10 minutes
    setTimeout(weatherData, updateInterval);
};


//-------------------------------------------------------------------------------------------------

// Timer function
function timer() {

    // Determine if 
    if (timerReset) {
        h = 0;
        m = 0;
        s = 0;
        hour = '0' + h;
        minute = '0' + m;
        second = '0' + s;
        // Put together the time format hh:mm:ss
        var time = hour + ':' + minute + ':' + second;
        document.getElementById("timer").innerText = time;

        // Set the time to walk
        var date = new Date();
        var H = date.getHours(); //0-23
        var M = date.getMinutes(); //0-59

        // Set the time for next walk
        if (H >= 6 && H <= 19) {
            H = H + 3;
        } else if (H === 20) {
            H = H + 2;
        } else if (H >= 21 && H <= 22) {
            H = H - 13;
        } else if (H === 23) {
            H = H - 14;
        } else {
            H = 10; 
        };

        // Set leading zero's
        if (H < 10){
            H = '0' + H;
        };
        if (M < 10){
            M = '0' + M;
        };

        var time = H + ':' + M;
        document.getElementById("timeToWalk").innerText = time;

        timerReset = false;
    } else {

        // Check if time has passed 4 hours limit, then set color to red
        if (h >= 4) {
            // Get the element
            var timerElement = document.getElementById("timerBox");

            // Change the background color
            timerElement.style.backgroundColor = "#FE4365"

            document.getElementById("timeToWalk").innerText = "NU!";
        } else {
            // Get the element
            var timerElement = document.getElementById("timerBox");

            // Change the background color
            timerElement.style.backgroundColor = "#70CC72"
        };

        // Iterate the seconds up
        if (s <= 0 || s < 59) {
            s = s + 1;
        } else {
            s = 0;
            m = m + 1;
        };

        // Set leading 0 for hours
        if(h < 10){
            hour = '0' + h;
        } else {
            hour = h;
        };

        // Set leading 0 for minutes
        if(m < 10){
            minute = '0' + m;
        } else if (m > 59) {
            m = 0
            minute = '0' + 1;
            h = h + 1;
        } else {
            minute = m;
        };
        
        // Set leading 0 for seconds
        if(s < 10){
            second = '0' + s;
        } else {
            second = s;
        };

        

        // Put together the time format hh:mm:ss
        var time = hour + ':' + minute + ':' + second;
        document.getElementById("timer").innerText = time;
    };

    // Asyncronos loop every 1 second
    setTimeout(timer, 1000);
};

//------------------------------------------------------------------------------------------------------

/*
// Function for getting news data from News api
function  breakingNewsData() {

    // Get weather data from the SMHI api
    var xhr = fetch('https://newsapi.org/v2/top-headlines/sources?country=se&language=sv&category=general&apiKey=bc2535e2da8b4178b696ec8e8c2e0bc3/data');

    // Make array of the data
    xhr.then(response => response.json()).then(data => {
        console.log(data);
        
        // Get weather symbol
        for (let i=0; i<19; i++) {
            
            let parameterName = data.timeSeries[0].parameters[i].name;
            
            if (parameterName === 'Wsymb2') {
                let weatherSymbol = data.timeSeries[0].parameters[i].values[0];
                //console.log('parameter: ' + parameterName + ', ' + weatherSymbol);
                
                // Get the right weather symbol value 1-27
                var wsymbol = () => {
                    switch (weatherSymbol) {
                        case 1:
                            var iconHtml = '<i class="fi fi-tr-brightness"></i>';
                            return iconHtml;
                            break;
                        case 2:
                            var iconHtml = '<i class="fi fi-tr-cloud-sun"></i>';
                            return iconHtml;
                            break;
                        case 3:
                            var iconHtml = '<i class="fi fi-tr-clouds-sun"></i>';
                            return iconHtml;
                            break;
                        case 4:
                            var iconHtml = '<i class="fi fi-tr-clouds-sun"></i>';
                            return iconHtml;
                            break;
                        case 5:
                            var iconHtml = '<i class="fi fi-tr-clouds-sun"></i>';
                            return iconHtml;
                            break;
                        case 6:
                            var iconHtml = '<i class="fi fi-tr-smoke"></i>';
                            return iconHtml;
                            break;
                        case 7:
                            var iconHtml = '<i class="fi fi-tr-fog"></i>';
                            return iconHtml;
                            break;
                        case 8:
                            var iconHtml = '<i class="fi fi-tr-cloud-sun-rain"></i>';
                            return iconHtml;
                            break;
                        case 9:
                            var iconHtml = '<i class="fi fi-tr-cloud-sun-rain"></i>';
                            return iconHtml;
                            break;
                        case 10:
                            var iconHtml = '<i class="fi fi-tr-cloud-sun-rain"></i>';
                            return iconHtml;
                            break;
                        case 11:
                            var iconHtml = '<i class="fi fi-tr-thunderstorm"></i>';
                            return iconHtml;
                            break;
                        case 12:
                            var iconHtml = '<i class="fi fi-tr-cloud-sleet"></i>';
                            return iconHtml;
                            break;
                        case 13:
                            var iconHtml = '<i class="fi fi-tr-cloud-sleet"></i>';
                            return iconHtml;
                            break;
                        case 14:
                            var iconHtml = '<i class="fi fi-tr-cloud-sleet"></i>';
                            return iconHtml;
                            break;
                        case 15:
                            var iconHtml = '<i class="fi fi-tr-cloud-snow"></i>';
                            return iconHtml;
                            break;
                        case 16:
                            var iconHtml = '<i class="fi fi-tr-cloud-snow"></i>';
                            return iconHtml;
                            break;
                        case 17:
                            var iconHtml = '<i class="fi fi-tr-cloud-snow"></i>';
                            return iconHtml;
                            break;
                        case 18:
                            var iconHtml = '<i class="fi fi-tr-cloud-rain"></i>';
                            return iconHtml;
                            break;
                        case 19:
                            var iconHtml = '<i class="fi fi-tr-cloud-showers"></i>';
                            return iconHtml;
                            break;
                        case 20:
                            var iconHtml = '<i class="fi fi-tr-cloud-showers-heavy"></i>';
                            return iconHtml;
                            break;
                        case 21:
                            var iconHtml = '<i class="fi fi-tr-thunderstorm"></i>';
                            return iconHtml;
                            break;
                        case 22:
                            var iconHtml = '<i class="fi fi-tr-cloud-sleet"></i>';
                            return iconHtml;
                            break;
                        case 23:
                            var iconHtml = '<i class="fi fi-tr-cloud-sleet"></i>';
                            return iconHtml;
                            break;
                        case 24:
                            var iconHtml = '<i class="fi fi-tr-cloud-sleet"></i>';
                            return iconHtml;
                            break;
                        case 25:
                            var iconHtml = '<i class="fi fi-tr-cloud-snow"></i>';
                            return iconHtml;
                            break;
                        case 26:
                            var iconHtml = '<i class="fi fi-tr-cloud-snow"></i>';
                            return iconHtml;
                            break;
                        case 27:
                            var iconHtml = '<i class="fi fi-tr-cloud-snow"></i>';
                            return iconHtml;
                            break;
                    }
                }
                //console.log(wsymbol());
                
                // Get the parent div element
                const parentElement = document.querySelector('#weatherAndTemp');

                // Get the old child element
                const oldElement = parentElement.firstElementChild;

                // Set new element
                const newElement = document.createElement('div');

                // Set content of the new element
                newElement.innerHTML = wsymbol();

                // Add the new div element as a child of the <div class"weatherIcon"> element
                parentElement.replaceChild(newElement, oldElement);

            } else if (parameterName === 't') {

                // Get the air temperature
                let airTemperature = Math.round(data.timeSeries[0].parameters[i].values[0]);
                //console.log('parameter: ' + parameterName + ', ' + airTemperature);
                // Display element
                document.getElementById("temperature").textContent = airTemperature;

            } else if (parameterName === 'wd') {

                // Get the wind direction
                let windDirection = Math.round(data.timeSeries[0].parameters[i].values[0]);
                //console.log('parameter: ' + parameterName + ', ' + windDirection);

            } else if (parameterName === 'ws') {

                // Get the wind speed
                let windSpeed = Math.round(data.timeSeries[0].parameters[i].values[0]);
                //console.log('parameter: ' + parameterName + ', ' + windSpeed);
                // Display element
                document.getElementById("windSpeed").textContent = windSpeed;

            } else if (parameterName === 'gust') {

                // Get the wind speed
                let windGustSpeed = Math.round(data.timeSeries[0].parameters[i].values[0]);
                //console.log('parameter: ' + parameterName + ', ' + windGustSpeed);
                // Display element
                document.getElementById("windGust").textContent = ' (' + windGustSpeed + ') ';

            } else if (parameterName === 'r') {

                // Get the relative humidity
                let relativeHumidity = Math.round(data.timeSeries[0].parameters[i].values[0]);
                //console.log('parameter: ' + parameterName + ', ' + relativeHumidity);
                // Display element
                document.getElementById("humidity").textContent = relativeHumidity;

            } else if (parameterName === 'pcat') {

                // Get the precipitation category
                let precipitation = Math.round(data.timeSeries[0].parameters[i].values[0]);
                //console.log('parameter: ' + parameterName + ', ' + precipitation);

            } else if (parameterName === 'pmean') {

                // Get the precipitation category
                let meanPrecipitation = Math.round(data.timeSeries[0].parameters[i].values[0]);
                //console.log('parameter: ' + parameterName + ', ' + meanPrecipitation);
                // Display element
                document.getElementById("precipitation").textContent = meanPrecipitation;
            }
        }
    }).catch(error => console.log(error));

    const updateInterval = 10000; //10 * 60 * 1000; // 10 minutes
    setTimeout(breakingNewsData, updateInterval);
};*/


//-------------------------------------------------------------------------------------------------

