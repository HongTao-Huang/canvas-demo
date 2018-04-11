var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
window.onload = function () {
    autoSetCanvasSize(canvas);
    listenToUser(canvas);
}

function listenToUser(canvas){
    var painting = false;
    var lastPoint = [];
    if(document.body.ontouchstart !== undefined){
        canvas.ontouchstart = function(aa){
            var x = aa.touches[0].clientX;
            var y = aa.touches[0].clientY;
            painting = true;
            if(usingEraser){
                context.clearRect(x-5,y-5,10,10);
            } else {
                lastPoint[0] = x;
                lastPoint[1] = y;
                drawCircle(x , y , 1);
            }
        }

        canvas.ontouchmove = function(aa){
            var x = aa.touches[0].clientX;
            var y = aa.touches[0].clientY;
            if(!painting){return;}
            if(painting){
                if(usingEraser){
                    context.clearRect(x-5,y-5,10,10);
                } else {
                    drawLine(lastPoint[0], lastPoint[1], x , y);
                    lastPoint[0] = x;
                    lastPoint[1] = y;
                }
            }
        }

        canvas.ontouchend = function(){
            painting = false;
        }
    }else {
        canvas.onmousedown = function(aa){
            var x = aa.clientX;
            var y = aa.clientY;
            painting = true;
            if(usingEraser){
                context.clearRect(x-5,y-5,10,10);
            } else {
                lastPoint[0] = x;
                lastPoint[1] = y;
                drawCircle(x , y , 1);
            }
        }

        canvas.onmousemove = function(aa){
            var x = aa.clientX;
            var y = aa.clientY;
            if(!painting){return;}
            if(painting){
                if(usingEraser){
                    context.clearRect(x-5,y-5,10,10);
                } else {
                    drawLine(lastPoint[0], lastPoint[1], x , y);
                    lastPoint[0] = x;
                    lastPoint[1] = y;
                }
            }
        }

        canvas.onmouseup = function(){
            painting = false;
        }
    }
    // 橡皮擦

    var usingEraser = false;
    eraser.onclick = function(){
        usingEraser = true;
        actions.className = 'actions x'
    }
    brush.onclick = function(){
        usingEraser = false;
        actions.className = 'actions'
    }
}

/************/
function drawCircle(x,y,radius){
    context.beginPath();
    context.arc(x , y , radius , 0 , Math.PI * 2);
    context.fill();
}

function drawLine(x1, y1, x2, y2){
    context.beginPath();
    context.moveTo(x1 , y1);
    context.lineWidth = 5;
    context.lineTo(x2 , y2);
    context.stroke();
    context.closePath();
}

/******/
// 全屏画布 读取视口
function autoSetCanvasSize(canvas){
    fullPage();
    window.onresize = function() {
        fullPage();
    }
    function fullPage(){
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}
