/* 矩形
 context.strokeStyle = 'red'
//描边的颜色
context.strokeRect(10,10,100,100);
//描边的形状

context.fillStyle = 'yellow';
// 填充样式 红色 填充的颜色
context.fillRect(10,10,100,100);
//画一个矩形 填充矩形

 context.clearRect(50,50,10,10);
//擦掉矩形中的一点  */
/*  //三角形
context.beginPath();
//要开始画三角形啦
context.moveTo(240,240);
//把鼠标移动到顶点坐标
context-lineTo(300,240);
//x横着的坐标
context-lineTo(300,300);
//y竖着的坐标 会自动闭合 
context.fill();
//它会以最后一次设置的填充颜色自动填充   */

var yyy = document.getElementById("xxx")
//变量yyy通过id获取了canvas元素xxx（canvas的id）所以yyy=canvas

autoSetCanvasSize(yyy)
listenToMouse(yyy)
var context = yyy.getContext('2d');
/***********************/

var eraserEnabled = false //默认橡皮未使用
eraser.onclick = function(){
    eraserEnabled = true
    action.className = 'action x'
}
//当橡皮擦被按下时 橡皮启用  
brush.onclick = function(){
    eraserEnabled = false
    action.className = 'action'
}
//当画笔被按下时 橡皮不启用

/*******************************/
//画布大小
function autoSetCanvasSize(canvas){
    function setCanvasSize(){
        //获取页面宽度
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        
        //把页面宽度赋值给canvas
        canvas.width = pageWidth
        canvas.height = pageHeight 
        }
        
        setCanvasSize()
        
        window.onresize = function(){
            setCanvasSize()
        }
}
/***************************************/
//监听鼠标
function listenToMouse(yyy){
    //获取了yyy的上下文
    //默认false
    var using = false
    var lastPoint = {
        x:undefined,
        y:undefined
    }
    yyy.onmousedown = function(aaa){
        var x = aaa.clientX
        var y = aaa.clientY
        if(eraserEnabled){
            using = true
    context.clearRect(x-5,y-5,10,10)
        }else{
            using = true
            lastPoint = {
                'x':x ,
                'y':y
            }
        }
    }
    yyy.onmousemove = function(aaa){
        var x = aaa.clientX
        var y = aaa.clientY
        if(eraserEnabled){
            if(using){
                context.clearRect(x-5,y-5 ,10,10)
            }
        }
        else{
            if(using){
    
                var newPoint = {'x':x,'y':y}
         
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                lastPoint = newPoint
             }
        }
    }
    yyy.onmouseup = function(aaa){
        using = false
    }
    }
    
/********************************* */

//画圆
function drawCircle(x,y,radiu){
    context.beginPath();
    context.fillStyle = 'white  '
    context.arc(x,y,radiu,0,Math.PI*2);
    //XY为圆心 半径 开始角度 结束角度
    context.fill()
}

/***************************** */

//画线
function drawLine(x1,y1,x2,y2){
    context.beginPath();
    context.moveTo(x1,y1);//起点
    context.lineWidth = 5
    context.lineTo(x2,y2);//终点
    context.stroke()
}

