let container = document.getElementById('container');
let btnLoad1 = document.getElementById('newbtn1');
let btnLoad2 = document.getElementById('newbtn2');
let btnLoad3 = document.getElementById('newbtn3');
let btnLoad4 = document.getElementById('newbtn4');
let btnLoad5 = document.getElementById('newbtn5');
let btnLoad6 = document.getElementById('newbtn6');
var w = 440; // width of iframe
var h = 350; // height of iframe

function home() {
  console.log('Home');
  container.innerHTML = '<iframe src="./pages/home.html" title="First page" width='+w+' height='+h+'>';
}
home();

btnLoad1.addEventListener('click', function( btnFunc ) {
  console.log('Home');
  container.innerHTML = '<iframe src="./pages/home.html" title="First page" width='+w+' height='+h+'>';
})

btnLoad2.addEventListener('click', function( altBtnFunc ) {
  console.log('Calendar');
  container.innerHTML = '<iframe src="./pages/calendar.html" title="Second page" width='+w+' height='+h+'>';
})

btnLoad3.addEventListener('click', function( altBtnFunc ) {
  console.log('Todo');
  container.innerHTML = '<iframe src="./pages/todo.html" title="Second page" width='+w+' height='+h+'>';
})

btnLoad4.addEventListener('click', function( altBtnFunc ) {
  console.log('Settings');
  container.innerHTML = '<iframe src="./pages/settings.html" title="Second page" width='+w+' height='+h+'>';
})

btnLoad5.addEventListener('click', function( altBtnFunc ) {
  console.log('Food');
  container.innerHTML = '<iframe src="./pages/food.html" title="Second page" width='+w+' height='+h+'>';
})

btnLoad6.addEventListener('click', function( altBtnFunc ) {
  console.log('Lukas');
  container.innerHTML = '<iframe src="./pages/lukas.html" title="Second page" width='+w+' height='+h+'>';
})