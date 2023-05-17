let container = document.getElementById('container');
let btnLoad1 = document.getElementById('newbtn1');
let btnLoad2 = document.getElementById('newbtn2');
let btnLoad3 = document.getElementById('newbtn3');
let btnLoad4 = document.getElementById('newbtn4');
let btnLoad5 = document.getElementById('newbtn5');
let btnLoad6 = document.getElementById('newbtn6');
var w = 440; // width of object
var h = 700; // height of object

function home() {
  console.log('Home');
  container.innerHTML = '<object data="./pages/home.html" width='+w+' height='+h+'><p>Your browser does not support embedded web pages. You can visit the page here: <a href="./pages/home.html">Visit page</a></p></object>';
}
home();

btnLoad1.addEventListener('click', function( btnFunc ) {
  console.log('Home');
  container.innerHTML = '<object data="./pages/home.html" width='+w+' height='+h+'><p>Your browser does not support embedded web pages. You can visit the page here: <a href="./pages/home.html">Visit page</a></p></object>';
})

btnLoad2.addEventListener('click', function( altBtnFunc ) {
  console.log('Calendar');
  container.innerHTML = '<object data="./pages/calendar.html" width='+w+' height='+h+'><p>Your browser does not support embedded web pages. You can visit the page here: <a href="./pages/calendar.html">Visit page</a></p></object>';
})

btnLoad3.addEventListener('click', function( altBtnFunc ) {
  console.log('Todo');
  container.innerHTML = '<object data="./pages/todo.html" width='+w+' height='+h+'><p>Your browser does not support embedded web pages. You can visit the page here: <a href="./pages/todo.html">Visit page</a></p></object>';
})

btnLoad4.addEventListener('click', function( altBtnFunc ) {
  console.log('Settings');
  container.innerHTML = '<object data="./pages/settings.html" width='+w+' height='+h+'><p>Your browser does not support embedded web pages. You can visit the page here: <a href="./pages/settings.html">Visit page</a></p></object>';
})

btnLoad5.addEventListener('click', function( altBtnFunc ) {
  console.log('Food');
  container.innerHTML = '<object data="./pages/food.html" width='+w+' height='+h+'><p>Your browser does not support embedded web pages. You can visit the page here: <a href="./pages/food.html">Visit page</a></p></object>';
})

btnLoad6.addEventListener('click', function( altBtnFunc ) {
  console.log('Lukas');
  container.innerHTML = '<object data="./pages/lukas.html" width='+w+' height='+h+'><p>Your browser does not support embedded web pages. You can visit the page here: <a href="./pages/lukas.html">Visit page</a></p></object>';
})