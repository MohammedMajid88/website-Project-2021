
const editor=document.querySelector("#text-post-content");

editor.addEventListener("input",function(){
    const span=document.querySelector("#placeholder");
    if(editor.contains(span)){
        span.remove();

    }

    if(editor.textContent==""){
        editor.innerHTML=`<span placeholder="text" contenteditable="false" id="placeholder"></span>` 
// alert("empty text")

}

})



const inputImg=document.querySelector("#input-img");
const img=document.querySelector("#img-edit");
const title=document.querySelector("#title");
const contenteditable = document.querySelector('[contenteditable]');


// inputImg.addEventListener("input",function(){

//   imgValue  = inputImg.value;
//  img.src = imgValue; 

// })



const publish=document.querySelector("#publish");

let imgValue="";
let titleValue="";
let text="";

publish.addEventListener("click", function(e){
    e.preventDefault();
    titleValue=title.value;
 
 text=`${contenteditable.childNodes[0].textContent} \n`;
for(let i=0;contenteditable.childElementCount>i;i++){
  
     text+=`${contenteditable.children[i].textContent} \n`;
    
}
const fileInput = document.querySelector('#upload') ;
const pathi= fileInput.files.item(0).name;


 let dataPost={
    img: fileInput.files.item(0).name,
    title: titleValue,
     text:  text
}
 

console.log(dataPost)
let headers = new Headers();////
headers.append('Content-type', 'application/json');


let option = {
	method: 'POST',
	body: JSON.stringify(dataPost),
	headers
};

fetch("http://localhost:3000/posts",option)
.then(req => req.json())
  .then(res => {
    uploade();

    window.location.href = '../blog/bloge.html'

    console.log(res)


});



})


///////////test 
function uploade(){

        
    var form = document.getElementById("uploadf");
    form.submit()

            const fileInput = document.querySelector('#upload') ;
    
            const formData = new FormData(form);
    
            const path= fileInput.files.item(0).name
            // formData.append('images[]', files[0], files[0].name);
            // img.innerHTML=formData;
            console.log(fileInput.files.item(0).name) ;
            // Image.upload(formData);
            fetch('http://localhost:3000/upload', {
                method: 'post',
                body:formData
            })
            .then(respond=>respond.json())
            .then(result=>{
    console.log(result)
    
            
         
    
    })
     
    
} 



// const options = {
//   method: 'POST',
//   body: formData,
//   // If you add this, upload won't work
//   // headers: {
//   //   'Content-Type': 'multipart/form-data',
//   // }
// };

// fetch('your-upload-url', options);

