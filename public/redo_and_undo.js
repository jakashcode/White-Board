var undobutton = document.getElementById('.undo-tool')
undobutton.addEventListener("mousedown",function(e){
    let myfunc=function(){
     //making it a function
    let rpoint = undoStack.pop() //rpoin is the pop
    redoStack.push(rpoint)// pushing into redostack
    drawagain();
    }
    interval = setInterval(function()
                            {myfunc();},50) //calling setinterval to run myfunc at interval of 50ms....and also naming it interval

    
})

undobutton.addEventListener("mouseup",function(){
    clearInterval(interval);
})


function drawagain(){
    ctx.clearRect(0, 0, board.width, board.height)
    for(let i =0;i<undoStack.length;i++)
    {
        if(undoStack[i].type=="start")
        {
            ctx.beginPath();
            ctx.moveTo(undoStack[i].x,undoStack[i].y)
            ctx.lineWidth=undoStack[i].width;
            ctx.strokeStyle=undoStack[i].color;
        }
        else if(undoStack[i].type=="end")
        {
            ctx.lineTo(undoStack[i].x,undoStack[i].y)
            ctx.stroke();
        }
        
    }
}
//Akaaaaash Bhaiiii!!!!!

var redobutton = document.getElementById(".redo-tool")
redobutton.addEventListener('mousedown',function(e){
    let myfunc=function(){
        ctx.clearRect(0, 0, board.width, board.height) //making it a function
        undoStack.push(redoStack.pop()) //rpoin is the pop
         drawagain();
        }
        interval = setInterval(function()
                                {myfunc();},50)
    
})

redobutton.addEventListener('mouseup',function(){
    clearInterval(interval);
})