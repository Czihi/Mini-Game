var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = 240;
var y = 160;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var minx = 0;
var maxx = 455;
var miny = 0;
var maxy = 295;
var cDF = 0;
var aSF = 0;
var tabx = [100, 200];
var taby = [100, 200];
var tabtime = [20, 20];
var tabcolor = ['green', 'green'];
var tabdraw = [true, true];
var addSquareFrequency = 0;
var countDownFrequency = 0;
var speed = 0;
var score = 5;
var firstDouble = false;
var secondDouble = false;
var button = document.getElementsByTagName('button')[0];
var restart = document.getElementById("restart");
var table = document.getElementById("table");
var table2 = document.getElementById("table2");
var start;
var time = 30;
var done = false;

function loadLocalStorage() {
    table2.rows[1].cells[2].textContent = localStorage.getItem('PierwszeMiejsce');
    table2.rows[2].cells[2].textContent = localStorage.getItem('DrugieMiejsce');
    table2.rows[3].cells[2].textContent = localStorage.getItem('TrzecieMiejsce');
    table2.rows[1].cells[1].textContent = localStorage.getItem('PierwszeMiejsceNick');
    table2.rows[2].cells[1].textContent = localStorage.getItem('DrugieMiejsceNick');
    table2.rows[3].cells[1].textContent = localStorage.getItem('TrzecieMiejsceNick');
}

loadLocalStorage();

function points() {
    table.rows[1].cells[1].textContent = score
}

function seconds() {
    table.rows[1].cells[0].textContent = time + start - (Math.floor(performance.now() / 1000))
}

function topscore() {
    if (score > parseInt(table2.rows[1].cells[2].textContent)) {
        localStorage.setItem('PierwszeMiejsce', score);
        localStorage.setItem('PierwszeMiejsceNick', nick);
        localStorage.setItem('DrugieMiejsce', table2.rows[1].cells[2].textContent);
        localStorage.setItem('DrugieMiejsceNick', table2.rows[1].cells[1].textContent);
        localStorage.setItem('TrzecieMiejsce', table2.rows[2].cells[2].textContent);
        localStorage.setItem('TrzecieMiejsceNick', table2.rows[2].cells[1].textContent);
    } else if (score > parseInt(table2.rows[2].cells[2].textContent)) {
        localStorage.setItem('DrugieMiejsce', score);
        localStorage.setItem('DrugieMiejsceNick', nick);
        localStorage.setItem('TrzecieMiejsce', table2.rows[2].cells[2].textContent);
        localStorage.setItem('TrzecieMiejsceNick', table2.rows[2].cells[1].textContent);
    } else if (score > parseInt(table2.rows[3].cells[2].textContent)) {
        localStorage.setItem('TrzecieMiejsce', score);
        localStorage.setItem('TrzecieMiejsceNick', nick);
    }

}

button.onclick = function () {
    var lnick = window.prompt("Podaj nick");
    window.addEventListener("scroll", scrollHandler, false)
    var lspeed = 5
    var laddSquareFrequency = 30
    var lcountDownFrequency = 15
    nick = lnick;
    speed = parseInt(lspeed);
    addSquareFrequency = laddSquareFrequency;
    countDownFrequency = lcountDownFrequency;
    start = (Math.floor(performance.now() / 1000));
    button.style.display = "none"
    restart.style.display = "block"
    document.getElementById("phase").innerText = "Faza pierwsza"
    $("#phase").fadeIn(4000);
    $("#phase").fadeOut(6000);
    globalID = requestAnimationFrame(draw);
}
restart.onclick = function () {
    document.location.reload();
    window.cancelAnimationFrame(globalID);
}

function checkCollision() {
    for (var w = 0; w < tabx.length; w++) {
        if (x > tabx[w] - 25 && x < tabx[w] + 25 && y > taby[w] - 25 && y < taby[w] + 25 && tabdraw[w] == true) {
            score += tabtime[w];
            points();
            tabx.splice(w, 1)
            taby.splice(w, 1)
            tabdraw.splice(w, 1);
            tabtime.splice(w, 1);
            tabcolor.splice(w, 1);
        }
    }
}

function countDown() {
    for (var q = 0; q < tabtime.length; q++) {
        tabtime[q]--;
        if (tabtime[q] < -20) {
            tabdraw[q] = false;
        }
    }
}

function changeColor() {
    for (var q = 0; q < tabx.length; q++) {
        if (tabtime[q] < 0) {
            tabcolor[q] = 'black';
        }
    }
}

function addSquare() {
    randx = Math.floor(Math.random() * (maxx - minx + 1)) + minx;
    randy = Math.floor(Math.random() * (maxy - miny + 1)) + miny;
    tabx.push(randx);
    taby.push(randy)
    tabtime.push(20);
    tabcolor.push('green');
    tabdraw.push(true);
}

function drawSquares() {
    for (var k = 0; k < tabx.length; k++) {
        if (tabdraw[k]) {

            ctx.beginPath();
            ctx.arc(tabx[k], taby[k], 10, 0, Math.PI * 2);
            ctx.fillStyle = tabcolor[k];
            ctx.fill();
            ctx.closePath();
            ctx.font = "12px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(tabtime[k], tabx[k], taby[k] + 4);
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
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
    if (aSF >= addSquareFrequency) {
        addSquare();
        aSF = 0;
    } else {
        aSF++;
    }
    if (cDF >= countDownFrequency) {
        countDown();
        cDF = 0;
    } else {
        cDF++;
    }
    if (x >= 480 && rightPressed) {
        x = 0;
    }

    if (x <= 0 && leftPressed) {
        x = 480;
    }


    if (y <= 0 && upPressed) {
        y = 320;
    }

    if (y >= 320 && downPressed) {
        y = 0;
    }
    if (rightPressed && downPressed) {
        x += speed;
        y += speed;
    } else if (leftPressed && downPressed) {
        x -= speed;
        y += speed
    } else if (upPressed && leftPressed) {
        y -= speed;
        x -= speed;
    } else if (upPressed && rightPressed) {
        y -= speed;
        x += speed;
    } else if (rightPressed) {
        x += speed;
    } else if (leftPressed) {
        x -= speed;
    } else if (upPressed) {
        y -= speed;
    } else if (downPressed) {
        y += speed;
    }
    if ((performance.now() / 1000) - start > time / 3 && firstDouble == false) {
        countDownFrequency = Math.floor(countDownFrequency / 2);
        addSquareFrequency = Math.floor(addSquareFrequency / 2);
        speed = speed * 2;
        firstDouble = true;
        $("#phase").fadeIn(4000);
        $("#phase").fadeOut(6100);
        document.getElementById("phase").innerText = "Faza druga: Prędkość piłki, częstotliwość pojawiania się punktów, zmniejszanie liczby punktów x2"
    }
    if ((performance.now() / 1000) - start > time / 3 * 2 && secondDouble == false) {
        countDownFrequency = Math.floor(countDownFrequency / 2);
        addSquareFrequency = Math.floor(addSquareFrequency / 2);
        speed = speed * 2;
        secondDouble = true;
        $("#phase").fadeIn(4000);
        $("#phase").fadeOut(6100);
        document.getElementById("phase").innerText = "Faza trzecia: Prędkość piłki, częstotliwość pojawiania się punktów, zmniejszanie liczby punktów x4"
    }
    if ((performance.now() / 1000) - start > time) {
        topscore();
        $("#phase").fadeIn(4000);
        document.getElementById("phase").innerText = "Koniec gry!"
        done = true;
    }
    if (!done) {
        globalID = requestAnimationFrame(draw);
    } else {
        cancelAnimationFrame(draw);
        window.removeEventListener("scroll", scrollHandler, false)
    }
}


function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
        e.view.event.preventDefault();
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
        e.view.event.preventDefault();
    }

    if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
        e.view.event.preventDefault();
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
        e.view.event.preventDefault();
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
        e.view.event.preventDefault();
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
        e.view.event.preventDefault();
    }

    if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
        e.view.event.preventDefault();
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
        e.view.event.preventDefault();
    }
}


function touchStartHandler(e) {
    if (e.type == 'touchstart') {
        var evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
        var touch = evt.touches[0] || evt.changedTouches[0];
        xt = touch.pageX.toFixed(0);
        yt = touch.pageY.toFixed(0);
        if (xt >= 480 &&
            xt < 555 &&
            yt >= 50 &&
            yt <= 100) {
            leftPressed = true
        } else {
            if (xt >= 555 &&
                xt < 630 &&
                yt >= 50 &&
                yt <= 100) {
                rightPressed = true
            } else {
                if (xt >= 530 &&
                    xt < 580 &&
                    yt >= 0 &&
                    yt <= 75) {
                    upPressed = true
                } else {
                    if (xt >= 530 &&
                        xt < 580 &&
                        yt >= 75 &&
                        yt <= 150) {
                        downPressed = true
                    } else {
                        if (xt >= 480 &&
                            xt < 530 &&
                            yt >= 0 &&
                            yt <= 50) {
                            leftPressed = true
                            upPressed = true;
                        } else {
                            if (xt >= 480 &&
                                xt < 530 &&
                                yt >= 100 &&
                                yt <= 150) {
                                leftPressed = true
                                downPressed = true;
                            } else {
                                if (xt >= 580 &&
                                    xt < 630 &&
                                    yt >= 0 &&
                                    yt <= 50) {
                                    rightPressed = true
                                    upPressed = true;
                                } else {
                                    if (xt >= 580 &&
                                        xt < 630 &&
                                        yt >= 100 &&
                                        yt <= 150) {
                                        rightPressed = true
                                        downPressed = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
    }
}

function touchEndHandler(e) {
    if (e.type == 'touchend') {
        rightPressed = false;
        leftPressed = false;
        upPressed = false;
        downPressed = false;
    }
}


function touchMoveHandler(e) {
    if (e.type == 'touchmove') {
        var evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
        var touch = evt.touches[0] || evt.changedTouches[0];
        xt = touch.pageX.toFixed(0);
        yt = touch.pageY.toFixed(0);
        if (xt >= 480 &&
            xt < 555 &&
            yt >= 50 &&
            yt <= 100) {
            leftPressed = true
            rightPressed = false
            upPressed = false
            downPressed = false
        } else {
            if (xt >= 555 &&
                xt < 630 &&
                yt >= 50 &&
                yt <= 100) {
                rightPressed = true
                leftPressed = false
                upPressed = false
                downPressed = false
            } else {
                if (xt >= 530 &&
                    xt < 580 &&
                    yt >= 0 &&
                    yt <= 75) {
                    upPressed = true
                    leftPressed = false
                    rightPressed = false
                    downPressed = false
                } else {
                    if (xt >= 530 &&
                        xt < 580 &&
                        yt >= 75 &&
                        yt <= 150) {
                        downPressed = true
                        upPressed = false
                        leftPressed = false
                        rightPressed = false
                    } else {
                        if (xt >= 480 &&
                            xt < 530 &&
                            yt >= 0 &&
                            yt <= 50) {
                            leftPressed = true
                            upPressed = true;
                            downPressed = false;
                            rightPressed = false;
                        } else {
                            if (xt >= 480 &&
                                xt < 530 &&
                                yt >= 100 &&
                                yt <= 150) {
                                leftPressed = true
                                downPressed = true;
                                rightPressed = false;
                                upPressed = false;
                            } else {
                                if (xt >= 580 &&
                                    xt < 630 &&
                                    yt >= 0 &&
                                    yt <= 50) {
                                    rightPressed = true
                                    upPressed = true;
                                    downPressed = false;
                                    leftPressed = false;
                                } else {
                                    if (xt >= 580 &&
                                        xt < 630 &&
                                        yt >= 100 &&
                                        yt <= 150) {
                                        rightPressed = true
                                        downPressed = true;
                                        leftPressed = false;
                                        upPressed = false;
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
    }
}

function scrollHandler() {
    window.scrollTo(0, 0)
}
var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    isMobile = true;
}
if(!isMobile){
    document.getElementById("mobileControls").style.display="none"
}
console.log(isMobile)
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("touchstart", touchStartHandler, false);
document.addEventListener("touchend", touchEndHandler, false);
document.addEventListener("touchmove", touchMoveHandler, false);
