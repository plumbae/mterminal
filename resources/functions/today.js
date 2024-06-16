function showToday(){
    let now = new Date().toLocaleDateString('sv-SE', { weekday:"long", day:"numeric", month:"long"});
    document.getElementById("myTodayDisplay").innerText = now;
    document.getElementById("myTodayDisplay").textContent = now;
    setTimeout(showToday, 10000);
}
showToday();