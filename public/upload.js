const imageupload = document.querySelector(".image-upload");

const imagePicker= document.getElementById("imagePicker");
console.log(imagePicker);
imagePicker.addEventListener("click",function(e){

    imageupload.click();

})

//listen to change event which has files uploaded when a file is uploaded
imageupload.addEventListener("change",function(e){
    var img = document.createElement("img");
//console.log(imageupload.files is filelist)

     console.log("I was here ");    
    const imgdata = imageupload.files[0];
   img.src = URL.createObjectURL(imgdata)
    //console.log(img.src)
    img.height=400;
    img.width=400;


    const body=document.querySelector("body");

    body.appendChild(img);

    img.onload=function(){
        URL.revokeObjectURL(img.src);
    }
    

})


const download=document.querySelector(".download_tool");
download.addEventListener("click",function(e){
    const url=board.toDataURL("image/png");
    //converting board to a url
    const anchor=document.createElement("a");
    anchor.href=url;
    anchor.download="fileName.png";
    anchor.click();
    //i.e will download image if click event called
    anchor.remove();

    
})
