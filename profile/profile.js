const btnEdit=document.querySelector("#Edit");
const btnView=document.querySelector("#View");
const infoProfile=document.querySelector("#info-profile");
const a=document.querySelector("#a");
const b=document.querySelector("#b");

 const cancel=document.querySelector("#cancel");


btnEdit.addEventListener('click',function(){


    b.classList.add("display");
    a.classList.remove("display")
   
    


})




btnView.addEventListener("click",function(){
    a.classList.add("display");
    b.classList.remove("display")

})


cancel.addEventListener("click",function(){

window.location.href="../index.html"

})


console.log(window.location.pathname);



