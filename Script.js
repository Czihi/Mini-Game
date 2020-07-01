var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
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
var addSquareFrequency=0;
var countDownFrequency=0;
var speed=0;
var score=5;
var firstDouble=false;
var secondDouble=false;
var button = document.getElementsByTagName('button')[0];
var restart = document.getElementById("restart");
var table = document.getElementById("table");
var table2 = document.getElementById("table2");
var start;
var time=30;
var done=false;
function loadLocalStorage(){
    table2.rows[1].cells[2].textContent=localStorage.getItem('PierwszeMiejsce');
    table2.rows[2].cells[2].textContent=localStorage.getItem('DrugieMiejsce');
    table2.rows[3].cells[2].textContent=localStorage.getItem('TrzecieMiejsce');
    table2.rows[1].cells[1].textContent=localStorage.getItem('PierwszeMiejsceNick');
    table2.rows[2].cells[1].textContent=localStorage.getItem('DrugieMiejsceNick');
    table2.rows[3].cells[1].textContent=localStorage.getItem('TrzecieMiejsceNick');
}
loadLocalStorage();
function points(){
    table.rows[1].cells[1].textContent=score
}
function seconds(){
    table.rows[1].cells[0].textContent=time+start-(Math.floor(performance.now()/1000))
}
function topscore(){
    if(score>parseInt(table2.rows[1].cells[2].textContent)){
        localStorage.setItem('PierwszeMiejsce', score);
        localStorage.setItem('PierwszeMiejsceNick', nick);
        localStorage.setItem('DrugieMiejsce', table2.rows[1].cells[2].textContent);
        localStorage.setItem('DrugieMiejsceNick', table2.rows[1].cells[1].textContent);
        localStorage.setItem('TrzecieMiejsce', table2.rows[2].cells[2].textContent);
        localStorage.setItem('TrzecieMiejsceNick', table2.rows[2].cells[1].textContent);
    }
    else if(score>parseInt(table2.rows[2].cells[2].textContent)){
        localStorage.setItem('DrugieMiejsce', score);
        localStorage.setItem('DrugieMiejsceNick', nick);
        localStorage.setItem('TrzecieMiejsce', table2.rows[2].cells[2].textContent);
        localStorage.setItem('TrzecieMiejsceNick', table2.rows[2].cells[1].textContent);
    }
    else if(score>parseInt(table2.rows[3].cells[2].textContent)){
        localStorage.setItem('TrzecieMiejsce', score);
        localStorage.setItem('TrzecieMiejsceNick', nick);
    }

}

button.onclick=function (){
    var lnick = window.prompt("Podaj nick");
    var lspeed = 5
    var laddSquareFrequency = 30
    var lcountDownFrequency = 15
    nick=lnick;
    speed=parseInt(lspeed);
    addSquareFrequency=laddSquareFrequency;
    countDownFrequency=lcountDownFrequency;
    start=(Math.floor(performance.now()/1000));
    button.style.display="none"
    restart.style.display="block"
    document.getElementById("phase").innerText="Faza pierwsza"
    $("#phase").fadeIn(4000);
    $("#phase").fadeOut(6600);
    globalID = requestAnimationFrame(draw);
}
restart.onclick=function (){
    document.location.reload();
    window.cancelAnimationFrame(globalID);
}

function checkCollision(){
    for (var w=0; w<tabx.length; w++){
        if(x>tabx[w]-25 && x<tabx[w]+25 && y>taby[w]-25 && y<taby[w]+25 &&tabdraw[w]==true){
            score+=tabtime[w];
            points();
            tabx.splice(w, 1)
            taby.splice(w, 1)
            tabdraw.splice(w, 1);
            tabtime.splice(w, 1);
            tabcolor.splice(w, 1);
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
        tabcolor[q]='black';
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
        ctx.arc(tabx[k], taby[k], 10, 0, Math.PI*2);
        ctx.fillStyle = tabcolor[k];
        ctx.fill();
ctx.closePath();
ctx.font = "12px Arial";
ctx.fillStyle ="white";
ctx.textAlign="center";
ctx.fillText(tabtime[k], tabx[k], taby[k]+4);
}
}
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI*2);
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
    if(x >= 480  && rightPressed ){
        x=0;
    }

    if(x <= 0 && leftPressed) {
       x=480;
    }


    if(y<=0 && upPressed){
       y=320;
    }    

    if (y>=320 && downPressed) {
        y=0;
    }
    if(rightPressed && downPressed) {
        x += speed;
        y+=speed;
    }
    else if(leftPressed && downPressed) {
        x -= speed;
        y+=speed
    }
    else if(upPressed && leftPressed){
        y-= speed;
        x-=speed;
    }
    else if(upPressed && rightPressed){
        y-=speed;
        x+=speed;
    }else
    if(rightPressed) {
        x += speed;
    }
    else if(leftPressed) {
        x -= speed;
    }
    else if(upPressed){
        y-= speed;
    }
    else if(downPressed){
        y+=speed;
    }
    if((performance.now()/1000)-start>time/3 && firstDouble==false){
        countDownFrequency=Math.floor(countDownFrequency/2);
        addSquareFrequency=Math.floor(addSquareFrequency/2);
        speed=speed*2;
        firstDouble=true;
        $("#phase").fadeIn(4000);
        $("#phase").fadeOut(6100);
        document.getElementById("phase").innerText="Faza druga: Prędkość piłki, częstotliwość pojawiania się punktów, zmniejszanie liczby punktów x2"
    }
    if((performance.now()/1000)-start>time/3*2 &&  secondDouble==false){
        countDownFrequency=Math.floor(countDownFrequency/2);
        addSquareFrequency=Math.floor(addSquareFrequency/2);
        speed=speed*2;
        secondDouble=true;
        $("#phase").fadeIn(4000);
        $("#phase").fadeOut(6100);
        document.getElementById("phase").innerText="Faza trzecia: Prędkość piłki, częstotliwość pojawiania się punktów, zmniejszanie liczby punktów x4"
    }
    if((performance.now()/1000)-start>time){
        topscore();
        $("#phase").fadeIn(4000);
        document.getElementById("phase").innerText="Koniec gry!"
        done=true;
    }
    if(!done) {
        globalID = requestAnimationFrame(draw);
    }else{
        cancelAnimationFrame(draw);

    }
}



function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
        e.view.event.preventDefault();
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
        e.view.event.preventDefault();
    }

    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
        e.view.event.preventDefault();
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
        e.view.event.preventDefault();
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
        e.view.event.preventDefault();
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
        e.view.event.preventDefault();
    }

    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
        e.view.event.preventDefault();
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
        e.view.event.preventDefault();
    }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

