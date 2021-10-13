

console.log(localStorage.getItem('token'));

let token=localStorage.getItem('token')



console.log(token)
const option = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization':"Bearer "+token
  ,
    
  }
}



const proflie=document.querySelector("#register");




if(token!=null){
  fetch("http://localhost:3000/user",option)
  .then(res => res.json())
  .then(result => {
    console.log(result);
  
  
 
  proflie.innerHTML=`<div id="info-user-nav" class="nav-user flex">
  
  <img  class="img-user "alt="mohammed" src="/Final-project/images/f.png">
  <span id="userName">${result[0].firstName}</span>
  
  </div>
  <div id="sub"class="subN">
  <ul>
  <li><a id="logOut" href="#">Log out</a></li>
  
  </ul>
  </div>
  
  `
  

})}

// {/* <li><a href="./profile/profile.html">view</a></li> */}



if(token==null){

    proflie.innerHTML=`
    
    <a class="login" href="./regesteration/logIn.html">Log in</a>
    <a class="login" href="./regesteration/regestration.html">Sign in</a>
    `
}






proflie.addEventListener("click", function (e) {


    console.log(e.target.tagName)
  const sub=document.querySelector("#sub")
  sub.classList.toggle("sub");
  
  document.body.addEventListener("click",function(eb){
    if(eb.target.tagName!="IMG" && eb.target.tagName!="SPAN"){
       sub.classList.remove("sub");
      console.log("out side img")

    }

  })

  const logOut=document.querySelector("#logOut");


logOut.addEventListener("click",function(){

  localStorage.clear();
  window.location.href = "../index.html"

})
  



})



// const navList=document.querySelector("#navList");

// navList.addEventListener("click",function(e){
// console.log(e.target.tagName)
// if(e.target.tagName=="A"){
// e.target.classList.toggle("active")
// }

// })


// export default 