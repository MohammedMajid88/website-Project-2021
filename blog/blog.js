
import {Post} from  './singlePost.js'
import {Comments} from './singlePost.js'
window.like= like;
window.submitForm= submitForm;
window.drop= drop;
const blog=document.querySelector("#content-blog");

/////get all posts by fetch
fetch("http://localhost:3000/posts")
.then(req => req.json())
  .then(res => {
      
    for(let i=res.length-1;i>-1;--i){
     
      blog.insertAdjacentHTML("beforeend",Post(res[i]));
     console.log(i);
   
    }
    userLike()
});

let token=localStorage.getItem('token');


function like(index) {
 let likeIndex= index.getAttribute("data");

 const like=document.querySelector(`#icon-${likeIndex}`)
 

 let dataLike={
  postId:likeIndex
 }




 console.log(token)
 const option = {
     method: "POST",
     headers: {
       'Content-Type': 'application/json',
       'Authorization':"Bearer "+token
   ,
     
   },
   body: JSON.stringify(dataLike),
 }

 function active(){
 }
fetch('http://localhost:3000/like',option)
.then(responde=>responde.json())
.then(result=>{
  like.classList.toggle('active-like');

  console.log(result)
  active()/////active after fetch

})



}





function submitForm(e){
e.preventDefault();
console.log(e.target.getAttribute("data-comment-post"));
let num=e.target.getAttribute("data-comment-post");
const input=document.querySelector(`#com${num}`);

 const text=document.querySelector(`#body-content-${num}`);

let inputText=input.value.toString();
// text.innerHTML=`<div class="comment-content" >
// <img src="../images/مروان.jpeg">
// <span id="text-comment">${input.value}</span>
// </div>` ;

let dataComment={
  postId:num,
  comment:input.value
}


let optionComment={
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
    'Authorization':"Bearer "+token
,
  
},
body: JSON.stringify(dataComment),

}



////fetch
fetch('http://localhost:3000/comment',optionComment)
.then(responde=>responde.json())
.then(result=>{

  console.log(result)


  text.insertAdjacentHTML('beforeend',`<div class="comment-content" >
  <img src="../images/f.png">
 <div id="text-comment">
 <span>${result[0].firstName}</span>
 <p id="text"></p>
 </div>
  
   </div>`)
   document.getElementById('text').textContent = input.value;

  input.value="";
  console.log(result);


})

}


//////////////event comment drop 


function drop(e){
  let numComment=e.target.getAttribute("data-btn-comment");
  console.log(numComment)

  const showComment=document.querySelector(`#display-comment-${numComment}`);
  const bodyContent=document.querySelector(`#body-content-${numComment}`);
  console.log(showComment);
  let count=0;
  if(showComment.style.display === 'none') {
    showComment.style.display="block";
   
    fetch(`http://localhost:3000/comments/${numComment}`)
      .then(responde=>responde.json())
      .then(resComments=>{
        for(let i=resComments.length-1;i>-1;--i){
     
          bodyContent.insertAdjacentHTML("afterBegin",Comments(resComments[i]));
         console.log(resComments[i]);
         let textComment= document.querySelector(`#text-${numComment}-${resComments[i].id}`);
         console.log(textComment)

         textComment.textContent = resComments[i].comment;

       
        }


      })
    } else {
      showComment.style.display="none";
      bodyContent.innerHTML="";
      }


      
}



////////fetch likes of user  //////
function userLike(){
const optionLike = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization':"Bearer "+token
  ,
    
  }
}


fetch(`http://localhost:3000/likes`,optionLike)
.then(res => res.json())
  .then(result => {
  for(let i=0;i<result.length;i++){
    console.log(result[i].postId);

    const like=document.querySelector(`#icon-${result[i].postId}`) ;
       like.classList.add('active-like');


  }
  })

}
////////fetch likes of user  //////