// 

// Set global variables for timer and reset functions
var h;
var m; // 0-59
var s; // 0-59
var hour;
var minute;
var second;
var timerReset = true; // Variable to keep track if timer is resetted or not (true or false)

const resetButton = document.getElementById("reset");

showDate();
showTime();
getSunlightData();
showWeek();
weatherData();
timer();
daylight();


// Resetbutton eventlistener
resetButton.addEventListener('click', () => {
    console.log("Timer reset");
    return timerReset = true;
})