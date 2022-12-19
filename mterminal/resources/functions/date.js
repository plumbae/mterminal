function showDate(){
  var date = new Date();
  var y = date.getFullYear(); // e.g 2022
  var m = date.getMonth(); //1-12
  var d = date.getDay(); //1-31*/

  if(m < 10){
    m = '0' + m;
  }
  if(d < 10){
    d = '0' + d;
  }

  var fulldate = y + '-' + m + '-' + d;
  document.getElementById("myDateDisplay").innerText = fulldate;
  document.getElementById("myDateDisplay").texContent = fulldate;

  setTimeout(showTime, 10000);
}
showDate();
