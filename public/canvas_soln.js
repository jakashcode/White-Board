let isMouseDown = false;
let undoStack=[];
let redostack=[];
board.addEventListener("mousedown", function (e) {

    let rect = board.getBoundingClientRect();
    //console.log(rect.top, rect.right, rect.bottom, rect.left);
    ctx.beginPath();


    let x=e.clientX;
    let y=e.clientY-rect.y;
    let point={
        x:x,
        y:y,
        color:ctx.StrokeStyle,
        width:ctx.lineWidth,
        type:"start"
    }
    undoStack.push(point);
    socket.emit("mymousedown",point);

    ctx.moveTo(e.clientX, e.clientY-rect.y);
    isMouseDown = true
})

board.addEventListener("mousemove", function (e) {
    if (isMouseDown == true) {
        let rect = board.getBoundingClientRect();
       // console.log(ctx);
        ctx.lineTo(e.clientX, e.clientY-rect.y);
        let x=e.clientX;
        let y=e.clientY-rect.y;

    let point={
        x:x,
        y:y,
        color:ctx.StrokeStyle,
        width:ctx.lineWidth,
        type:"end"
    }
    undoStack.push(point);
    socket.emit("mymousemove",point);
        
        ctx.stroke();
    }

})
board.addEventListener("mouseup", function (e) {
    isMouseDown = false;
    socket.emit("mymousedown");
    ctx.closePath();
})


let undo=document.querySelector(".undo-tool");
let redo=document.querySelector(".redo-tool");


/* undo.addEventListener("click",function(e){
    console.log("hiiiiiii");
    undoStack.pop();
    ctx.clearRect(0,0,board.width,board.height);
    if(undoStack.length>1){
        console.log("byee");
        //drawAgain();
    }
    
}) */




undo.addEventListener("mousedown", function(e){
    let myfn= function(){
        let rpoint = undoStack.pop() //rpoin is the pop
        redoStack.push(rpoint)// pushing into redostack
        
        
        drawAgain();
    }
    interval=setInterval(function(){
        myfn();
    },50);
})

undo.addEventListener("mouseup",function(e){
    clearInterval(interval);
})


redo.addEventListener('mousedown',function(e){
    let myfunc=function(){
        ctx.clearRect(0, 0, board.width, board.height) //making it a function
        undoStack.push(redoStack.pop()) //rpoin is the pop
         drawagain();
        }
        interval = setInterval(function()
                                {myfunc();},50)
    
})

redo.addEventListener('mouseup',function(){
    clearInterval(interval);
})



function drawAgain(){
    ctx.clearRect(0, 0, board.width, board.height);
    for(i=0;i<undoStack.length;i++){
        let x=undoStack[i].x;
        let y=undoStack[i].y;
        let color=undoStack[i].color;
        let type=undoStack[i].type;
        let width=undoStack[i].width;

        if(type=='start'){
            ctx.beginPath();
            ctx.moveTo(x,y);
            ctx.lineWidth=width;
            ctx.strokeStyle=color;

        }else{
            ctx.lineTo(x,y);
            ctx.stroke();
            ctx.lineWidth=width;
            ctx.strokeStyle=color;

        }

    }
}

const zoomin=document.querySelector(".zoomin_tool");
const zoomout=document.querySelector(".zoomout_tool");

zoomin.addEventListener("click",function(){
    ctx.scale(2,2); 
    ctx.translate(-100,-100)
    //incresed width and height by chnaging the scale using scale
    drawAgain();

})

zoomout.addEventListener("click",function(){
    ctx.scale(0.95,0.95); 
    ctx.translate(40,20);
    //incresed width and height by chnaging the scale using scale
    drawAgain();
})



