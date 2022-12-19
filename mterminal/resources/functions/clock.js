function showTime(){
  var date = new Date();
  var h = date.getHours(); //0-23
  var m = date.getMinutes(); //0-59

  if(h < 10){
    h = '0' + h;
  }
  if(m < 10){
    m = '0' + m;
  }

  var time = h + ':' + m;
  document.getElementById("myClockDisplay").innerText = time;
  document.getElementById("myClockDisplay").texContent = time;

  setTimeout(showTime, 10000);
}
showTime();
