socket.on("oncolorChange",function(color){
    ctx.strokeStyle=color;
})


let isemiitedMouse=false;
socket.on("mymousedown",function(point){
    isemiitedMouse=true;
    ctx.beginPath();

     x = point.x;
     y = point.y - board.getBoundingClientRect().y;
    ctx.moveTo(x, y);
   
   
})
socket.on("mymousemove",function(point){
    if (isemiitedMouse == true) {
        // console.log(ctx);
      let  x = point.x;
       let  y = point.y - board.getBoundingClientRect().y
        ctx.lineTo(x, y);

        ctx.stroke();
      
        // x,y,end

    }

})
socket.on("mymouseup",function(){
    isemiitedMouse = false;
})
// mymousemove
// mymouseup