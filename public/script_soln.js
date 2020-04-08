// connect to socket server
const socket = io.connect('http://localhost:3000');

const board = document.querySelector(".board");
board.height = window.innerHeight;
board.width = window.innerWidth;
// canvasRenderingContext2d=> tool
const ctx = board.getContext("2d");
// ctx.fillRect(0, 0, window.innerWidth / 2, window.innerHeight / 2);
// ctx.fillStyle = "red";
// // initialX,initialY,finalX,finalY
// ctx.fillRect(0, 0, window.innerWidth / 2, window.innerHeight / 2);
// ctx.strokeStyle = "green";
// ctx.lineWidth = 10;
// ctx.strokeRect(0, 0, window.innerWidth / 2, window.innerHeight / 2);
ctx.strokeStyle="blue";
ctx.imageSmoothingEnabled=true
// ctx.lineWidth=2;

const input=document.querySelector("#pen-size");
ctx.lineWidth=input.value;
input.addEventListener("change",function(e){
    console.log(input.value);
    ctx.lineWidth=input.value;
})
function sizeChange(size) {
    ctx.lineWidth = size;
    socket.emit("sizechange", size);
  }
const eraserSize=document.querySelector("#eraser-size");
ctx.lineWidth=eraserSize.value;
eraserSize.addEventListener("change",function(e){
    console.log(input.value);
    ctx.lineWidth=eraserSize.value;
})


let ActiveTool="pencil";
const penciloptions=document.querySelector(".pencil");
const eraseroptions=document.querySelector(".eraser");

const pencil=document.getElementById("#pencil-img");
const eraser=document.getElementById("#eraser-img");



function handleToolChange(tool){
    if(tool=="pencil"){
        if(ActiveTool=="pencil"){
            penciloptions.classList.add("show");
            //show the options
        }else{
            ActiveTool="pencil";
            ctx.globalCompositeOperation ='source-over';
            eraseroptions.classList.remove("show");
            ctx.strokeStyle="blue";

            //remove other options 
        }
    }else if(tool=="eraser"){
        if(ActiveTool=="eraser"){
            eraseroptions.classList.add("show");
            //show the options
        }else{
            ActiveTool="eraser";
            ctx.globalCompositeOperation ='destination-out';
            penciloptions.classList.remove("show");
            ctx.strokeStyle="white";

            //remove other options 
        }

    }else if(tool=="sticky"){
        createSticky();
    }
}


function handleColorChange(color){
    ctx.strokeStyle=color;
    socket.emit("color",color);    
}


function eraseeverything(){
    ctx.strokeStyle="white";
    ctx.lineWidth=20;
}



// // 0,0
// ctx.beginPath();
// ctx.moveTo(50,150);
// ctx.lineTo(100,150);
// ctx.moveTo(160,200);
// ctx.lineTo(200,200);
// ctx.closePath();
// ctx.stroke();