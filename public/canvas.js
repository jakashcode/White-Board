let isMouseDown=false;
let undoStack=[];
board.addEventListener("mousedown",function(e){

    //console.log("mouse_down");
   // console.log(e.clientX);
    ctx.beginPath();
    let x=e.clientX;
    let y=e.clientY-board.getBoundingClientRect().y;
    let point={
        x:x,
        y:y,
        color:ctx.StrokeStyle,
        width:ctx.lineWidth,
        type:"start"
    }
    undoStack.push(point);

    ctx.moveTo(e.clientX,e.clientY);

    isMouseDown=true;
    
    //console.log(e.clientY);
    
    //x,y. start
    


})

board.addEventListener("mousemove",function(e){
    if(isMouseDown==true){
    ctx.lineTo(e.clientX,e.clientY);

    let x=e.clientX;
    let y=e.clientY-board.getBoundingClientRect().y;

    let point={
        x:x,
        y:y,
        color:ctx.StrokeStyle,
        width:ctx.lineWidth,
        type:"end"
    }
    undoStack.push(point);

    ctx.lineCap="round";
    ctx.lineJoin="round";
    //ctx.closePath();
    ctx.stroke();
   // console.log(e.clientX);
    //console.log(e.clientY);
    }
    
})

board.addEventListener("mouseup",function(e){
   // console.log("mouse_move");
   // console.log(e.clientX);
    //console.log(e.clientY);

    //ctx.moveTo(50,150); 
    //ctx.lineTo(e.clientX,e.clientY);
    isMouseDown=false;
    ctx.closePath();

})

let undo=document.querySelector("undo-tool");
console.log(undo);
undo.addEventListener("click",function(e){
    console.log("hiiiiiii");
    undoStack.pop();
    ctx.clearRect(0,0,board.width,board.height);
    if(undoStack.length>1){
        drawAgain();
    }
    
})

function drawAgain(){
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
//toolbar.addEventListener("mousemove",function(e){
//ctx.moveTo(e.clientX,e.clientY);



//})

//we get a event object haveing the property client_x whih tells the current position of mouse pointer