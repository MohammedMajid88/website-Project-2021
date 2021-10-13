import {Users,UserItem} from './users.js';
import Statics from './statics.js';
import {Posts,PostItem} from './posts.js'

const posts=document.querySelector("#posts");
const panale=document.querySelector("#panale");
const home=document.querySelector("#home");
const usersList=document.querySelector("#usersList");

console.log(window.location.href)
window.Del= Del;
window.Edit=Edit;

/////Statics open dirctly
panale.innerHTML=Statics();

/////post that admin has published
posts.addEventListener("click" ,function(){

    panale.innerHTML=Posts();

    ///
    const postsItem=document.querySelector("#posts-items");


    fetch("http://localhost:3000/posts")
   .then(req => req.json())
   .then(res => {
      
    for(let i=res.length-1;i>-1;--i){
     
    postsItem.insertAdjacentHTML("beforeend",PostItem(res[i]));
     
    }

});
 

})

function Del(e){
    let btn = e.target.getAttribute("id");
    let postItem=document.querySelector(`#post-${btn}`);
     console.log(btn);
     
     fetch(`http://localhost:3000/delet/${+btn}`,{
        method: 'DELETE',
      })
 .then(respond=>respond.json())
 .then(result=>{
     console.log("remved")
    postItem.style. backgroundColor="#d49bb1";
    postItem.style.visibility="hidden";
    setTimeout(function () {

        postItem.remove();

    }, 2000)
 })
     
 }

////////////edit post event 
 function Edit(e){
    let btn = e.target.getAttribute("data-post");
    let postItem=document.querySelector(`#post-${btn}`);
     console.log(btn);
     console.log(postItem);
    //  window.location.href=`postedit/${btn}.html`;

    // window.location.href=`./updatePost.html`;

     fetch(`http://localhost:3000/editPost/post/${btn}`)
     .then(respond=>respond)
     .then(result=>{
console.log(result);
         window.location.href=`http://localhost:3000/editPost/post/${btn}`;
     })


//      fetch(`http://localhost:3000/delet/${+btn}`,{
//         method: 'DELETE',
//       })
//  .then(respond=>respond.json())
//  .then(result=>{
//      console.log("remved")
//     postItem.style. backgroundColor="#d49bb1";
//     postItem.style.visibility="hidden";
//     setTimeout(function () {

//         postItem.remove();

//     }, 2000)

//  })
}




/////home admin that has Statics
home.addEventListener("click", function(){

    panale.innerHTML=Statics();

})



/////list of users 
usersList.addEventListener("click",function(){

panale.innerHTML=Users();
const tableUsers=document.querySelector("#table-users")


fetch("http://localhost:3000/allUsers")
   .then(req => req.json())
   .then(res => {
      let n=0;
    for(let i=res.length-1;i>-1;--i){
     n++
        tableUsers.insertAdjacentHTML("beforeend",UserItem(res[i],n));
     
    }


})

})