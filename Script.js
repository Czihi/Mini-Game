var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = 240;
var y = 160;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var minx=0;
var maxx=455;
var miny=0;
var maxy=295;
var cDF=0;
var aSF=0;
var tabx=[100, 200];
var taby=[100, 200];
var tabtime=[20, 20];
var tabcolor=['green', 'green'];
var tabdraw=[true, true];
var addSquareFrequency
var countDownFrequency
var speed
var score=5;
var firstDouble=false;
var secondDouble=false;
var button = document.getElementsByTagName('button')[0];
var table = document.getElementById("table");
var table2 = document.getElementById("table2");
var start;
function loadLocalStorage(){
    table2.rows[1].cells[1].textContent=localStorage.getItem('PierwszeMiejsce');
    table2.rows[2].cells[1].textContent=localStorage.getItem('DrugieMiejsce');
    table2.rows[3].cells[1].textContent=localStorage.getItem('TrzecieMiejsce');
    table2.rows[1].cells[0].textContent=localStorage.getItem('PierwszeMiejsceNick');
    table2.rows[2].cells[0].textContent=localStorage.getItem('DrugieMiejsceNick');
    table2.rows[3].cells[0].textContent=localStorage.getItem('TrzecieMiejsceNick');
}
loadLocalStorage();
function points(){
    table.rows[1].cells[1].textContent=score
}
function seconds(){
    table.rows[1].cells[0].textContent=180+start-(Math.floor(performance.now()/1000))
}
function topscore(){
    if(score>parseInt(table2.rows[1].cells[1].textContent)){
        localStorage.setItem('PierwszeMiejsce', score);
        localStorage.setItem('PierwszeMiejsceNick', nick);
        localStorage.setItem('DrugieMiejsce', table2.rows[1].cells[1].textContent);
        localStorage.setItem('DrugieMiejsceNick', table2.rows[1].cells[0].textContent);
        localStorage.setItem('TrzecieMiejsce', table2.rows[2].cells[1].textContent);
        localStorage.setItem('TrzecieMiejsceNick', table2.rows[2].cells[0].textContent);
    }
    else if(score>parseInt(table2.rows[2].cells[1].textContent)){
        localStorage.setItem('DrugieMiejsce', score);
        localStorage.setItem('DrugieMiejsceNick', nick);
        localStorage.setItem('TrzecieMiejsce', table2.rows[2].cells[1].textContent);
        localStorage.setItem('TrzecieMiejsceNick', table2.rows[2].cells[0].textContent);
    }
    else if(score>parseInt(table2.rows[3].cells[1].textContent)){
        localStorage.setItem('TrzecieMiejsce', score);
        localStorage.setItem('TrzecieMiejsceNick', nick);
    }

}
button.onclick=function (){
    var lnick = window.prompt("Podaj nick");
    var lspeed = window.prompt("Podaj początkową prędkość kulki");
    var laddSquareFrequency = window.prompt("Podaj częstotliwość dodawania kwadratu");
    var lcountDownFrequency = window.prompt("Podaj częstotliwość dekrementacji licznika");
    nick=lnick;
    speed=parseInt(lspeed);
    addSquareFrequency=laddSquareFrequency;
    countDownFrequency=lcountDownFrequency;
    start=(Math.floor(performance.now()/1000));
    globalID = requestAnimationFrame(draw);
}

function checkCollision(){
    for (var w=0; w<tabx.length; w++){
        if(x>tabx[w]-10 && x<tabx[w]+30 && y>taby[w]-10 && y<taby[w]+30 &&tabdraw[w]==true){
            score+=tabtime[w];
            points();
            tabdraw[w]=false;
        }
    }
}
function countDown(){
    for(var q=0; q<tabtime.length; q++){
    tabtime[q]--;
    if(tabtime[q]<-20){
        tabdraw[q]=false;
    }
}
}
function changeColor(){
    for (var q=0; q<tabx.length; q++){
    if(tabtime[q]<0){
        tabcolor[q]='red';
}
}
}
function addSquare(){
    randx=Math.floor(Math.random() * (maxx - minx + 1)) + minx;
    randy=Math.floor(Math.random() * (maxy - miny + 1)) + miny;
    tabx.push(randx);
    taby.push(randy)
    tabtime.push(20);
    tabcolor.push('green');
    tabdraw.push(true);
}
function drawSquares(){
for(var k=0; k<tabx.length; k++){
    if(tabdraw[k]){
ctx.beginPath();
ctx.rect(tabx[k], taby[k], 20, 20);
ctx.fillStyle = tabcolor[k];
ctx.fill();
ctx.closePath();
ctx.font = "15px Arial";
ctx.fillStyle ="black";
ctx.fillText(tabtime[k], tabx[k], taby[k]+15);
}
}
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawSquares();
    checkCollision();
    changeColor();
    seconds();
    if(Math.floor(performance.now()/1000)-start>60 && firstDouble==false){
            countDownFrequency=Math.floor(countDownFrequency/2);
            addSquareFrequency=Math.floor(addSquareFrequency/2);
            speed=speed*2;
            firstDouble=true;
    }
    if(Math.floor(performance.now()/1000)-start>120 &&  secondDouble==false){
        countDownFrequency=Math.floor(countDownFrequency/2);
        addSquareFrequency=Math.floor(addSquareFrequency/2);
        speed=speed*2;
        secondDouble=true;
    }
    if(Math.floor(performance.now()/1000)-start>180){
        topscore();
        alert("Koniec gry!");
        document.location.reload();
        window.cancelAnimationFrame(globalID);
    }
    if(aSF>=addSquareFrequency){
        addSquare();
        aSF=0;
    }else{
        aSF++;
    }
    if(cDF>=countDownFrequency){
        countDown();
        cDF=0;
    }else{
        cDF++;
    }
    if(x + speed > canvas.width-ballRadius) {
       x=10;
    }

    if(x + speed < ballRadius){
        x=470;
    }

    if(y + speed > canvas.height-ballRadius){
       y=10;
    }    

    if (y + speed < ballRadius) {
        y=310;
    }
    if(rightPressed && x < canvas.width && downPressed && y < canvas.height) {
        x += speed;
        y+=speed;
    }
    else if(leftPressed && x > 0 && downPressed && y < canvas.height) {
        x -= speed;
        y+=speed
    }
    else if(upPressed && y > 0 && leftPressed && x >0){
        y-= speed;
        x-=speed;
    }
    else if(upPressed && y < canvas.height && rightPressed && x < canvas.width){
        y-=speed;
        x+=speed;
    }else
    if(rightPressed && x < canvas.width) {
        x += speed;
    }
    else if(leftPressed && x > 0) {
        x -= speed;
    }
    else if(upPressed && y > 0){
        y-= speed;
    }
    else if(downPressed && y < canvas.height){
        y+=speed;
    }
    globalID = requestAnimationFrame(draw);
}



function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }

    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {

    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }

    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
