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
listenTouUser(yyy)
var context = yyy.getContext('2d');
var lineWidth = 5
/***********************/

var eraserEnabled = false //默认橡皮未使用
    pen.onclick = function(){
        eraserEnabled = false   
        pen.classList.add('active')
        eraser.classList.remove('active')
    }
    eraser.onclick = function(){
        eraserEnabled = true
        eraser.classList.add('active')
        pen.classList.remove('active')
    }

    red.onclick = function(){
        context.fillStyle = 'red'
        context.strokeStyle = 'red'
        red.classList.add('active')
        green.classList.remove('active')
        blue.classList.remove('active')
    }

    green.onclick = function(){
        context.fillStyle = 'green'
        context.strokeStyle = 'green'
        red.classList.remove('active')
        green.classList.add('active')
        blue.classList.remove('active')
    }

    blue.onclick = function(){
        context.fillStyle = 'blue'
        context.strokeStyle = 'blue'
        red.classList.remove('active')
        green.classList.remove('active')
        blue.classList.add('active')
    }

    thin.onclick = function(){
        lineWidth = 5
    }


    thick.onclick = function(){
        lineWidth = 10
    }

    clear.onclick = function(){
        context.clearRect(0, 0, yyy.width, yyy.height)
    }

    save.onclick = function(){
        var url = yyy.toDataURL("image/png")
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.href = url
        a.download = '我的画儿'
        a.target = '_blank'
        a.click()
    }


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
function listenTouUser(yyy){
    //获取了yyy的上下文
    //默认false
    var using = false
    var lastPoint = {
        x:undefined,
        y:undefined
    }
    //特性检测
    if(document.body.ontouchstart !== undefined){
        //不等于undefined就是文档里有这个属性 说明是触屏设备
        yyy.ontouchstart = function(aaa){
            console.log('开始摸我了')
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
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
        
        yyy.ontouchmove = function(aaa){
            console.log('边摸边动')
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
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
        
        yyy.ontouchend = function(){
            console.log('摸完了')
            using = false
        }
    }else{
        //非触屏设备
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
    }
    
    
/********************************* */

//画圆
function drawCircle(x,y,radiu){
    context.beginPath();
    context.arc(x,y,radiu,0,Math.PI*2);
    //XY为圆心 半径 开始角度 结束角度
    context.fill()
}

/***************************** */

//画线
function drawLine(x1,y1,x2,y2){
    context.beginPath();
    context.moveTo(x1,y1);//起点
    context.lineWidth = lineWidth
    context.lineTo(x2,y2);//终点
    context.stroke()
}

